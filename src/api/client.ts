// Klient API v3 Wykopu.
//
// Zasady:
// - Zapytania idą wyłącznie do tej samej domeny (https://wykop.pl/api/v3), zwykłym fetch.
// - Token czytamy z localStorage.token (tam trzyma go oficjalny frontend).
// - W wersji 0.x NIE odświeżamy tokena sami i NIC nie zapisujemy do localStorage Wykopu,
//   żeby nie zepsuć sesji oficjalnej strony. Gdy token wygaśnie, czekamy chwilę, aż
//   oryginalna aplikacja (działająca pod spodem) go odświeży, a potem próbujemy bez tokena.

export const API_BASE = '/api/v3';

export type Params = Record<string, string | number | boolean | null | undefined>;

export interface ApiResponse<T = unknown> {
  data: T;
  pagination?: Pagination;
  raw: unknown;
}

export interface Pagination {
  next?: string | null;
  prev?: string | null;
  per_page?: number;
  total?: number;
  [k: string]: unknown;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public path: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ClientDeps {
  fetch: typeof fetch;
  storage: Pick<Storage, 'getItem'>;
  sleep: (ms: number) => Promise<void>;
}

const defaultDeps = (): ClientDeps => ({
  fetch: (...args) => fetch(...args),
  storage: localStorage,
  sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
});

export function readToken(storage: Pick<Storage, 'getItem'>): string | null {
  try {
    const t = storage.getItem('token');
    if (!t) return null;
    // Na wszelki wypadek: gdyby token był zapisany jako JSON string.
    if (t.startsWith('"') && t.endsWith('"')) return JSON.parse(t) as string;
    return t;
  } catch {
    return null;
  }
}

export function buildUrl(path: string, params?: Params): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v === null || v === undefined || v === '') continue;
    qs.set(k, String(v));
  }
  const q = qs.toString();
  return API_BASE + path + (q ? '?' + q : '');
}

export interface RequestOptions {
  /** Wymuś zapytanie bez nagłówka Authorization (diagnostyka). */
  anonymous?: boolean;
  signal?: AbortSignal;
}

export function createClient(deps: ClientDeps = defaultDeps()) {
  async function once(url: string, token: string | null, signal?: AbortSignal) {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (token) headers.Authorization = 'Bearer ' + token;
    const res = await deps.fetch(url, { method: 'GET', headers, credentials: 'same-origin', signal });
    let body: unknown = null;
    const text = await res.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = text.slice(0, 500);
      }
    }
    return { status: res.status, body };
  }

  async function get<T = unknown>(path: string, params?: Params, opts: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = buildUrl(path, params);
    let token = opts.anonymous ? null : readToken(deps.storage);
    let r = await once(url, token, opts.signal);

    // 429: wycofanie się z rosnącym opóźnieniem.
    for (let i = 0, wait = 500; r.status === 429 && i < 3; i++, wait *= 2) {
      await deps.sleep(wait);
      r = await once(url, token, opts.signal);
    }

    // 401/403: daj oryginalnej aplikacji chwilę na odświeżenie tokena, potem bez tokena.
    if ((r.status === 401 || r.status === 403) && token) {
      await deps.sleep(1500);
      const fresh = readToken(deps.storage);
      if (fresh && fresh !== token) {
        token = fresh;
        r = await once(url, token, opts.signal);
      }
      if (r.status === 401 || r.status === 403) {
        r = await once(url, null, opts.signal);
      }
    }

    if (r.status < 200 || r.status >= 300) {
      throw new ApiError(errorMessage(r.status, r.body), r.status, path, r.body);
    }
    const body = (r.body ?? {}) as { data?: T; pagination?: Pagination };
    return { data: body.data as T, pagination: body.pagination, raw: r.body };
  }

  return { get };
}

function errorMessage(status: number, body: unknown): string {
  const err = (body as { error?: { message?: string } } | null)?.error;
  const msg = typeof err?.message === 'string' ? err.message : '';
  if (status === 401 || status === 403) return 'Brak dostępu (' + status + ')' + (msg ? ': ' + msg : '');
  if (status === 404) return 'Nie znaleziono';
  if (status === 429) return 'Za dużo zapytań, spróbuj za chwilę';
  return 'Błąd API ' + status + (msg ? ': ' + msg : '');
}

/** Wylicza wartość parametru `page` dla następnej strony albo null, gdy to koniec. */
export function nextPage(
  current: string | number | undefined,
  pagination: Pagination | undefined,
  itemsOnPage: number,
): string | number | null {
  if (itemsOnPage === 0) return null;
  if (pagination) {
    if (typeof pagination.next === 'string' && pagination.next) return pagination.next;
    if ('next' in pagination && !pagination.next && !('per_page' in pagination)) return null;
    if (typeof pagination.per_page === 'number' && typeof pagination.total === 'number') {
      const n = typeof current === 'number' ? current : 1;
      return n * pagination.per_page < pagination.total ? n + 1 : null;
    }
  }
  const n = typeof current === 'number' ? current : 1;
  return n < 50 ? n + 1 : null;
}

export const api = createClient();
