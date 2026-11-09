// Prosty router oparty na prawdziwych adresach Wykopu, żeby linki z zewnątrz
// (np. udostępniony /wpis/123) od razu otwierały nasz widok.

import { useEffect, useState } from 'preact/hooks';

export type Route =
  | { name: 'home'; type: 'homepage' | 'upcoming' }
  | { name: 'mikroblog'; sort: 'hot' | 'newest' | 'active' }
  | { name: 'entry'; id: string }
  | { name: 'link'; id: string }
  | { name: 'tag'; tag: string }
  | { name: 'diag' }
  | { name: 'unsupported'; path: string };

export function parseRoute(pathname: string, search = ''): Route {
  const q = new URLSearchParams(search);
  if (q.get('wl') === 'diag') return { name: 'diag' };
  const parts = pathname.split('/').filter(Boolean).map(decodeURIComponent);
  const [a, b] = parts;
  if (!a) return { name: 'home', type: 'homepage' };
  if (a === 'wykopalisko') return { name: 'home', type: 'upcoming' };
  if (a === 'mikroblog') {
    const sort = q.get('sort');
    if (sort === 'newest' || sort === 'active') return { name: 'mikroblog', sort };
    if (b === 'najnowsze') return { name: 'mikroblog', sort: 'newest' };
    if (b === 'aktywne') return { name: 'mikroblog', sort: 'active' };
    return { name: 'mikroblog', sort: 'hot' };
  }
  if (a === 'wpis' && b && /^\d+$/.test(b)) return { name: 'entry', id: b };
  if (a === 'link' && b && /^\d+$/.test(b)) return { name: 'link', id: b };
  if (a === 'tag' && b) return { name: 'tag', tag: b };
  return { name: 'unsupported', path: pathname + search };
}

const listeners = new Set<() => void>();
const scrollPositions = new Map<string, number>();

export function navigate(href: string, replace = false) {
  const key = location.pathname + location.search;
  scrollPositions.set(key, window.scrollY);
  if (replace) history.replaceState(history.state, '', href);
  else history.pushState({ wl: true }, '', href);
  listeners.forEach((l) => l());
  window.scrollTo(0, 0);
}

export function savedScroll(key: string): number | undefined {
  return scrollPositions.get(key);
}

export function useLocation(): string {
  const [loc, setLoc] = useState(location.pathname + location.search);
  useEffect(() => {
    const update = () => setLoc(location.pathname + location.search);
    listeners.add(update);
    window.addEventListener('popstate', update);
    return () => {
      listeners.delete(update);
      window.removeEventListener('popstate', update);
    };
  }, []);
  return loc;
}
