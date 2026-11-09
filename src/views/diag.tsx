// Ekran diagnostyczny: zastępuje nagrywanie HAR. Sprawdza, jak odpowiada API,
// i tworzy raport do skopiowania. Raport NIE zawiera wartości tokenów.

import { useState } from 'preact/hooks';
import { api, ApiError, readToken } from '../api/client';
import { asArray } from '../api/models';

const SECRET = /token|secret|password|passwd|^key$|hash|email|phone/i;

export function describe(v: unknown, depth = 0, key = ''): unknown {
  if (SECRET.test(key) && v !== null && v !== undefined && typeof v !== 'boolean') return '[ukryte:' + typeof v + ']';
  if (v === null) return null;
  if (Array.isArray(v)) {
    if (depth > 5) return '[array ' + v.length + ']';
    return v.length ? ['len=' + v.length, describe(v[0], depth + 1)] : [];
  }
  if (typeof v === 'object') {
    if (depth > 5) return '{…}';
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) out[k] = describe(val, depth + 1, k);
    return out;
  }
  if (typeof v === 'string') return v.length > 60 ? v.slice(0, 60) + '…(' + v.length + ')' : v;
  return v;
}

function jwtInfo(t: string | null) {
  if (!t) return { present: false };
  const parts = t.split('.');
  if (parts.length !== 3) return { present: true, jwt: false, length: t.length };
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))) as Record<string, unknown>;
    const exp = typeof payload.exp === 'number' ? payload.exp : undefined;
    return {
      present: true,
      jwt: true,
      claims: Object.keys(payload),
      roles: payload.roles,
      expiresInMin: exp ? Math.round((exp * 1000 - Date.now()) / 60000) : undefined,
    };
  } catch {
    return { present: true, jwt: 'nieczytelny' };
  }
}

interface Probe {
  name: string;
  path: string;
  params?: Record<string, string | number>;
}

async function runProbe(p: Probe, anonymous: boolean) {
  const t0 = performance.now();
  try {
    const r = await api.get(p.path, p.params, { anonymous });
    const items = asArray(r.data);
    return {
      ok: true,
      ms: Math.round(performance.now() - t0),
      topKeys: Object.keys((r.raw as object) ?? {}),
      pagination: r.pagination ? describe(r.pagination) : undefined,
      count: Array.isArray(r.data) ? items.length : undefined,
      shape: describe(Array.isArray(r.data) ? r.data[0] : r.data),
      _first: Array.isArray(r.data) ? r.data[0] : r.data,
    };
  } catch (e) {
    const err = e as ApiError;
    return { ok: false, ms: Math.round(performance.now() - t0), status: err.status, error: err.message, body: describe(err.body) };
  }
}

export function Diag() {
  const [report, setReport] = useState<string>('');
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  async function run() {
    setRunning(true);
    setCopied(false);
    const results: Record<string, unknown> = {};
    const log = () =>
      setReport(JSON.stringify({ meta, results }, (k, v) => (k === '_first' ? undefined : v), 1));

    const meta = {
      version: __WL_VERSION__,
      ua: navigator.userAgent,
      url: location.href,
      time: new Date().toISOString(),
      localStorageKeys: Object.keys(localStorage).sort(),
      token: jwtInfo(readToken(localStorage)),
      userKeep: { present: !!localStorage.getItem('userKeep') },
    };
    log();

    const probes: Probe[] = [
      { name: 'links_homepage', path: '/links', params: { type: 'homepage' } },
      { name: 'links_upcoming', path: '/links', params: { type: 'upcoming' } },
      { name: 'entries_hot', path: '/entries', params: { sort: 'hot', last_update: 12 } },
      { name: 'entries_newest', path: '/entries', params: { sort: 'newest' } },
      { name: 'tag_stream', path: '/tags/heheszki/stream', params: { sort: 'all', type: 'all' } },
      { name: 'profile_short', path: '/profile/short' },
      { name: 'notifications_status', path: '/notifications/status' },
    ];
    let firstEntry: string | undefined;
    let firstLink: string | undefined;
    for (const p of probes) {
      const withToken = await runProbe(p, false);
      const r: Record<string, unknown> = { path: p.path, params: p.params, withToken };
      if (!withToken.ok) r.anonymous = await runProbe(p, true);
      const first = (withToken.ok ? withToken : (r.anonymous as typeof withToken))?._first as { id?: unknown } | undefined;
      if (p.name === 'entries_hot' && first?.id) firstEntry = String(first.id);
      if (p.name === 'links_homepage' && first?.id) firstLink = String(first.id);
      results[p.name] = r;
      log();
    }
    const detail: Probe[] = [];
    if (firstEntry) detail.push({ name: 'entry', path: '/entries/' + firstEntry }, { name: 'entry_comments', path: '/entries/' + firstEntry + '/comments' });
    if (firstLink) detail.push({ name: 'link', path: '/links/' + firstLink }, { name: 'link_comments', path: '/links/' + firstLink + '/comments', params: { sort: 'best' } });
    for (const p of detail) {
      results[p.name] = { path: p.path, params: p.params, withToken: await runProbe(p, false) };
      log();
    }
    setRunning(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
    } catch {
      const ta = document.querySelector('wykop-ai')?.shadowRoot?.querySelector('textarea');
      ta?.select();
    }
  }

  return (
    <div class="diag">
      <h1 class="page-title">Diagnostyka</h1>
      <p class="small">
        Sprawdza kilka zapytań do API i zapisuje ich strukturę. Raport nie zawiera tokenów. Skopiuj go i wklej w rozmowie z Claude.
      </p>
      <div class="row">
        <button onClick={run} disabled={running}>
          {running ? 'Sprawdzam…' : 'Uruchom test'}
        </button>
        <button onClick={copy} disabled={!report || running}>
          {copied ? 'Skopiowano ✓' : 'Kopiuj raport'}
        </button>
      </div>
      {report && <textarea readOnly value={report} rows={20} />}
    </div>
  );
}
