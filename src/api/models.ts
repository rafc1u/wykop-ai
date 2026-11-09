// Odporne mapowanie odpowiedzi API na nasze modele.
// Nazwy pól pochodzą z klientów społeczności i nie są w 100% potwierdzone,
// dlatego każde pole czytamy z kilku możliwych miejsc i nigdy nie zakładamy, że istnieje.

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown): string | undefined => (typeof v === 'string' && v ? v : typeof v === 'number' ? String(v) : undefined);
const num = (v: unknown): number | undefined => (typeof v === 'number' && Number.isFinite(v) ? v : typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v)) ? Number(v) : undefined);
const get = (o: unknown, path: string): unknown => {
  let cur: unknown = o;
  for (const k of path.split('.')) {
    if (!isObj(cur)) return undefined;
    cur = cur[k];
  }
  return cur;
};
const first = <T>(o: unknown, paths: string[], f: (v: unknown) => T | undefined): T | undefined => {
  for (const p of paths) {
    const v = f(get(o, p));
    if (v !== undefined) return v;
  }
  return undefined;
};

export interface Author {
  username: string;
  avatar?: string;
  color?: string;
}

export interface Media {
  photo?: string;
  embedUrl?: string;
  embedThumb?: string;
  adult?: boolean;
}

export interface Entry {
  kind: 'entry';
  id: string;
  author?: Author;
  content: string;
  createdAt?: string;
  votes?: number;
  commentsCount?: number;
  comments: Comment[];
  media: Media;
  tags: string[];
  adult: boolean;
}

export interface Comment {
  kind: 'comment';
  id: string;
  author?: Author;
  content: string;
  createdAt?: string;
  votes?: number;
  media: Media;
  replies: Comment[];
  repliesCount?: number;
}

export interface Link {
  kind: 'link';
  id: string;
  title: string;
  description: string;
  slug?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  author?: Author;
  createdAt?: string;
  votes?: number;
  commentsCount?: number;
  media: Media;
  tags: string[];
  adult: boolean;
  hot?: boolean;
}

export interface Unknown {
  kind: 'unknown';
  id: string;
  resource?: string;
}

export type Item = Entry | Link | Unknown;

export function toAuthor(v: unknown): Author | undefined {
  if (!isObj(v)) return undefined;
  const username = first(v, ['username', 'login', 'name'], str);
  if (!username) return undefined;
  return {
    username,
    avatar: first(v, ['avatar', 'avatar.url', 'photo'], str),
    color: first(v, ['color', 'color.hex'], str),
  };
}

export function toMedia(o: unknown): Media {
  return {
    photo: first(o, ['media.photo.url', 'media.photo.src', 'media.photo', 'photo.url'], str),
    embedUrl: first(o, ['media.embed.url', 'media.embed.source'], str),
    embedThumb: first(o, ['media.embed.thumbnail', 'media.embed.thumb', 'media.embed.preview'], str),
    adult: get(o, 'adult') === true,
  };
}

const tagsOf = (o: unknown): string[] => {
  const t = get(o, 'tags');
  if (!Array.isArray(t)) return [];
  return t.map((x) => (typeof x === 'string' ? x : str(get(x, 'name')))).filter((x): x is string => !!x);
};

const content = (o: unknown) => first(o, ['content', 'body', 'text'], (v) => (typeof v === 'string' ? v : undefined)) ?? '';
const votes = (o: unknown) => first(o, ['votes.up', 'votes.count', 'votes'], num);
const created = (o: unknown) => first(o, ['created_at', 'createdAt', 'date'], str);
const idOf = (o: unknown) => first(o, ['id'], str) ?? '';

export function toComment(o: unknown): Comment {
  const items = get(o, 'comments.items');
  return {
    kind: 'comment',
    id: idOf(o),
    author: toAuthor(get(o, 'author')),
    content: content(o),
    createdAt: created(o),
    votes: votes(o),
    media: toMedia(o),
    replies: Array.isArray(items) ? items.map(toComment) : [],
    repliesCount: first(o, ['comments.count'], num),
  };
}

export function toEntry(o: unknown): Entry {
  const items = get(o, 'comments.items');
  return {
    kind: 'entry',
    id: idOf(o),
    author: toAuthor(get(o, 'author')),
    content: content(o),
    createdAt: created(o),
    votes: votes(o),
    commentsCount: first(o, ['comments.count'], num),
    comments: Array.isArray(items) ? items.map(toComment) : [],
    media: toMedia(o),
    tags: tagsOf(o),
    adult: get(o, 'adult') === true,
  };
}

export function toLink(o: unknown): Link {
  return {
    kind: 'link',
    id: idOf(o),
    title: first(o, ['title'], str) ?? '(bez tytułu)',
    description: first(o, ['description'], (v) => (typeof v === 'string' ? v : undefined)) ?? '',
    slug: first(o, ['slug'], str),
    sourceUrl: first(o, ['source.url', 'url'], str),
    sourceLabel: first(o, ['source.label', 'source.domain', 'domain'], str),
    author: toAuthor(get(o, 'author')),
    createdAt: first(o, ['published_at', 'created_at'], str),
    votes: votes(o),
    commentsCount: first(o, ['comments.count'], num),
    media: toMedia(o),
    tags: tagsOf(o),
    adult: get(o, 'adult') === true,
    hot: get(o, 'hot') === true,
  };
}

/** Element listy mieszanej (np. strumień tagu), rozpoznany po polu `resource` albo kształcie. */
export function toItem(o: unknown): Item {
  const resource = str(get(o, 'resource'));
  if (resource === 'link' || (!resource && str(get(o, 'title')))) return toLink(o);
  if (resource === 'entry' || (!resource && get(o, 'content') !== undefined)) return toEntry(o);
  return { kind: 'unknown', id: idOf(o), resource };
}

export function asArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (isObj(data) && Array.isArray(data.items)) return data.items;
  return [];
}

export function sourceHost(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}

/** Bezpieczny URL do <img>/<a>: tylko http(s). */
export function safeUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url, 'https://wykop.pl');
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : undefined;
  } catch {
    return undefined;
  }
}
