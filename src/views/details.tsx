import { useEffect, useState } from 'preact/hooks';
import { api } from '../api/client';
import { safeUrl, sourceHost, toComment, toEntry, toLink, type Comment, type Entry, type Link as LinkModel } from '../api/models';
import { Content } from '../content/render';
import { useFeed, useSentinel, timeAgo } from '../ui/feed';
import { CommentView, EntryCard, MediaView, Status } from './cards';

function useOne<T>(key: string, load: () => Promise<T>) {
  const [state, setState] = useState<{ data?: T; error?: string; loading: boolean }>({ loading: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    let alive = true;
    setState({ loading: true });
    load().then(
      (data) => alive && setState({ data, loading: false }),
      (e) => alive && setState({ error: e instanceof Error ? e.message : String(e), loading: false }),
    );
    return () => {
      alive = false;
    };
  }, [key, n]);
  return { ...state, retry: () => setN((x) => x + 1) };
}

function Comments({ path, sort }: { path: string; sort?: string }) {
  const feed = useFeed<Comment>(path + (sort ?? ''), (page) => api.get(path, { page, sort }), toComment, (c) => c.id);
  const ref = useSentinel(feed.loadMore);
  return (
    <section class="comments-list">
      {feed.items.map((c) => (
        <CommentView key={c.id} c={c} />
      ))}
      <Status {...feed} onRetry={feed.reload} empty={!feed.items.length} />
      {!feed.done && !feed.error && <div ref={ref} class="sentinel" />}
    </section>
  );
}

export function EntryView({ id }: { id: string }) {
  const one = useOne<Entry>('entry:' + id, () => api.get('/entries/' + id).then((r) => toEntry(r.data)));
  if (!one.data) return <Status loading={one.loading} error={one.error ?? null} done={false} onRetry={one.retry} />;
  return (
    <div>
      <EntryCard entry={one.data} full />
      <h3 class="section">Komentarze {one.data.commentsCount ? '(' + one.data.commentsCount + ')' : ''}</h3>
      <Comments path={'/entries/' + id + '/comments'} />
    </div>
  );
}

export function LinkView({ id }: { id: string }) {
  const one = useOne<LinkModel>('link:' + id, () => api.get('/links/' + id).then((r) => toLink(r.data)));
  const [sort, setSort] = useState<'best' | 'newest' | 'oldest'>('best');
  if (!one.data) return <Status loading={one.loading} error={one.error ?? null} done={false} onRetry={one.retry} />;
  const l = one.data;
  const src = safeUrl(l.sourceUrl);
  return (
    <div>
      <article class="card">
        <MediaView media={l.media} adult={l.adult} />
        <h1 class="link-title">{l.title}</h1>
        <div class="muted small">
          {l.sourceLabel ?? sourceHost(l.sourceUrl)}
          {l.author && ' · dodał ' + l.author.username}
          {l.createdAt && ' · ' + timeAgo(l.createdAt)}
        </div>
        <Content text={l.description} />
        {src && (
          <a class="button" href={src} target="_blank" rel="noopener noreferrer nofollow">
            Otwórz źródło ↗
          </a>
        )}
        <footer>
          <span class="votes">▲ {l.votes ?? 0}</span>
          <span class="muted">{l.tags.map((t) => '#' + t).join(' ')}</span>
        </footer>
      </article>
      <h3 class="section">
        Komentarze {l.commentsCount ? '(' + l.commentsCount + ')' : ''}
        <select value={sort} onChange={(e) => setSort((e.target as HTMLSelectElement).value as typeof sort)}>
          <option value="best">najlepsze</option>
          <option value="newest">najnowsze</option>
          <option value="oldest">najstarsze</option>
        </select>
      </h3>
      <Comments path={'/links/' + id + '/comments'} sort={sort} />
    </div>
  );
}
