import { describe, expect, it } from 'vitest';
import { render } from 'preact';
import { buildUrl, createClient, nextPage } from '../src/api/client';
import { toEntry, toItem, toLink, safeUrl } from '../src/api/models';
import { Content, parseBlocks, parseInline } from '../src/content/render';
import { parseRoute } from '../src/router';
import { describe as shape } from '../src/views/diag';

describe('parseInline', () => {
  it('rozpoznaje tagi, użytkowników, linki i formatowanie', () => {
    const r = parseInline('**mocne** i _kursywa_ #heheszki @wykop https://example.com/a. [tu](https://x.pl)');
    expect(r.map((n) => n.t)).toEqual(['bold', 'text', 'italic', 'text', 'tag', 'text', 'user', 'text', 'link', 'text', 'link']);
  });
  it('nie traktuje maila ani kotwicy jako tagu/użytkownika', () => {
    const r = parseInline('a@b.pl http://x.pl/#tag');
    expect(r.some((n) => n.t === 'user' || n.t === 'tag')).toBe(false);
  });
  it('obsługuje polskie znaki w tagach', () => {
    expect(parseInline('#żółć')).toEqual([{ t: 'tag', v: 'żółć' }]);
  });
});

describe('parseBlocks', () => {
  it('cytaty, spoilery, kod', () => {
    const b = parseBlocks('akapit\n\n> cytat\n> dalej\n! spoiler\n```\nkod\n```');
    expect(b.map((x) => x.t)).toEqual(['p', 'quote', 'spoiler', 'pre']);
  });
});

describe('Content (bezpieczeństwo)', () => {
  it('nie wstrzykuje HTML ani javascript: URL', () => {
    const el = document.createElement('div');
    render(<Content text={'<img src=x onerror=alert(1)> [klik](javascript:alert(1)) <script>x</script>'} />, el);
    expect(el.querySelector('img,script')).toBeNull();
    expect(el.innerHTML).not.toContain('href="javascript');
    expect(el.textContent).toContain('<img src=x onerror=alert(1)>');
  });
  it('linki zewnętrzne mają noopener', () => {
    const el = document.createElement('div');
    render(<Content text="https://example.com" />, el);
    expect(el.querySelector('a')?.getAttribute('rel')).toContain('noopener');
  });
});

describe('models', () => {
  it('toEntry jest odporny na brak pól', () => {
    const e = toEntry({ id: 5 });
    expect(e).toMatchObject({ id: '5', content: '', comments: [], tags: [] });
  });
  it('toEntry czyta typowe pola', () => {
    const e = toEntry({ id: 1, author: { username: 'a', avatar: 'https://x/a.jpg' }, content: 'hej', votes: { up: 3 }, comments: { count: 2, items: [{ id: 9, content: 'k' }] }, media: { photo: { url: 'https://x/p.jpg' } }, tags: ['t'] });
    expect(e.author?.username).toBe('a');
    expect(e.votes).toBe(3);
    expect(e.commentsCount).toBe(2);
    expect(e.comments[0].content).toBe('k');
    expect(e.media.photo).toBe('https://x/p.jpg');
  });
  it('toItem rozpoznaje typ', () => {
    expect(toItem({ resource: 'link', id: 1, title: 't' }).kind).toBe('link');
    expect(toItem({ resource: 'entry', id: 1, content: 'c' }).kind).toBe('entry');
    expect(toLink({ id: 2, source: { url: 'https://a.pl/x' } }).sourceUrl).toBe('https://a.pl/x');
  });
  it('safeUrl odrzuca javascript:', () => {
    expect(safeUrl('javascript:alert(1)')).toBeUndefined();
    expect(safeUrl('https://a.pl')).toBe('https://a.pl/');
  });
});

describe('nextPage', () => {
  it('hash kursora', () => expect(nextPage(undefined, { next: 'abc', prev: null }, 10)).toBe('abc'));
  it('koniec przy pustym next', () => expect(nextPage('abc', { next: null, prev: 'x' }, 10)).toBeNull());
  it('numeryczna', () => {
    expect(nextPage(undefined, { per_page: 25, total: 60 }, 25)).toBe(2);
    expect(nextPage(3, { per_page: 25, total: 60 }, 10)).toBeNull();
  });
  it('pusta strona kończy', () => expect(nextPage(2, undefined, 0)).toBeNull());
});

describe('router', () => {
  it('mapuje adresy Wykopu', () => {
    expect(parseRoute('/')).toEqual({ name: 'home', type: 'homepage' });
    expect(parseRoute('/wykopalisko')).toEqual({ name: 'home', type: 'upcoming' });
    expect(parseRoute('/wpis/123/jakis-slug')).toEqual({ name: 'entry', id: '123' });
    expect(parseRoute('/link/77/tytul')).toEqual({ name: 'link', id: '77' });
    expect(parseRoute('/tag/heheszki')).toEqual({ name: 'tag', tag: 'heheszki' });
    expect(parseRoute('/mikroblog', '?sort=newest')).toEqual({ name: 'mikroblog', sort: 'newest' });
    expect(parseRoute('/cokolwiek', '?wl=diag')).toEqual({ name: 'diag' });
    expect(parseRoute('/ludzie/x').name).toBe('unsupported');
  });
});

describe('client', () => {
  const resp = (status: number, body: unknown) => new Response(JSON.stringify(body), { status });
  it('buduje URL bez pustych parametrów', () => {
    expect(buildUrl('/entries', { sort: 'hot', page: undefined, x: '' })).toBe('/api/v3/entries?sort=hot');
  });
  it('wysyła token i czyta data/pagination', async () => {
    const calls: RequestInit[] = [];
    const c = createClient({
      fetch: async (_u, init) => (calls.push(init!), resp(200, { data: [1], pagination: { next: 'n' } })),
      storage: { getItem: (k) => (k === 'token' ? 'T' : null) },
      sleep: async () => {},
    });
    const r = await c.get('/entries');
    expect((calls[0].headers as Record<string, string>).Authorization).toBe('Bearer T');
    expect(r.data).toEqual([1]);
    expect(r.pagination?.next).toBe('n');
  });
  it('po 401 próbuje bez tokena i nic nie zapisuje', async () => {
    const auth: (string | undefined)[] = [];
    const c = createClient({
      fetch: async (_u, init) => {
        const a = (init!.headers as Record<string, string>).Authorization;
        auth.push(a);
        return a ? resp(401, { error: {} }) : resp(200, { data: [] });
      },
      storage: { getItem: () => 'T' },
      sleep: async () => {},
    });
    await c.get('/links');
    expect(auth).toEqual(['Bearer T', undefined]);
  });
  it('ponawia po 429', async () => {
    let n = 0;
    const c = createClient({ fetch: async () => (++n < 3 ? resp(429, {}) : resp(200, { data: [] })), storage: { getItem: () => null }, sleep: async () => {} });
    await c.get('/x');
    expect(n).toBe(3);
  });
});

describe('diag describe', () => {
  it('ukrywa tokeny', () => {
    expect(shape({ token: 'abc', refresh_token: 'x', a: 1 })).toEqual({ token: '[ukryte:string]', refresh_token: '[ukryte:string]', a: 1 });
  });
});
