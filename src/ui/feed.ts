import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { nextPage, type ApiResponse } from '../api/client';
import { asArray } from '../api/models';

export interface FeedState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  done: boolean;
  loadMore: () => void;
  reload: () => void;
}

/** Lista z doładowywaniem kolejnych stron (numer strony albo hash kursora). */
export function useFeed<T>(
  key: string,
  fetchPage: (page: string | number | undefined) => Promise<ApiResponse<unknown>>,
  map: (raw: unknown) => T,
  idOf: (item: T) => string,
): FeedState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const page = useRef<string | number | undefined>(undefined);
  const busy = useRef(false);
  const gen = useRef(0);
  const seen = useRef(new Set<string>());

  const load = useCallback(
    async (reset: boolean) => {
      if (busy.current && !reset) return;
      const my = reset ? ++gen.current : gen.current;
      if (reset) {
        page.current = undefined;
        seen.current = new Set();
        setItems([]);
        setDone(false);
      }
      busy.current = true;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPage(page.current);
        if (my !== gen.current) return;
        const raw = asArray(res.data);
        const mapped = raw.map(map).filter((it) => {
          const id = idOf(it);
          if (!id || seen.current.has(id)) return !id;
          seen.current.add(id);
          return true;
        });
        setItems((prev) => (reset ? mapped : [...prev, ...mapped]));
        const np = nextPage(page.current, res.pagination, raw.length);
        page.current = np ?? undefined;
        if (np === null) setDone(true);
      } catch (e) {
        if (my === gen.current) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (my === gen.current) {
          busy.current = false;
          setLoading(false);
        }
      }
    },
    [key],
  );

  useEffect(() => {
    load(true);
  }, [load]);

  return {
    items,
    loading,
    error,
    done,
    loadMore: () => {
      if (!done && !busy.current) load(false);
    },
    reload: () => load(true),
  };
}

/** Wywołuje onVisible, gdy element dojedzie do ekranu (przewijanie bez końca). */
export function useSentinel(onVisible: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onVisible);
  cb.current = onVisible;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && cb.current(), {
      rootMargin: '800px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function timeAgo(s?: string): string {
  if (!s) return '';
  const t = Date.parse(s.includes('T') ? s : s.replace(' ', 'T'));
  if (isNaN(t)) return s;
  const d = Math.max(0, (Date.now() - t) / 1000);
  if (d < 60) return 'teraz';
  if (d < 3600) return Math.floor(d / 60) + ' min';
  if (d < 86400) return Math.floor(d / 3600) + ' godz.';
  if (d < 86400 * 30) return Math.floor(d / 86400) + ' dn.';
  return new Date(t).toLocaleDateString('pl-PL');
}
