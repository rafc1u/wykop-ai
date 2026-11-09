import { api } from '../api/client';
import { toEntry, toItem, toLink, type Entry, type Item, type Link as LinkModel } from '../api/models';
import { useFeed, useSentinel } from '../ui/feed';
import { Link } from '../ui/Link';
import { EntryCard, LinkCard, Status } from './cards';

function Sentinel({ onVisible }: { onVisible: () => void }) {
  const ref = useSentinel(onVisible);
  return <div ref={ref} class="sentinel" />;
}

export function LinksList({ type }: { type: 'homepage' | 'upcoming' }) {
  const feed = useFeed<LinkModel>(
    'links:' + type,
    (page) => api.get('/links', { type, page }),
    toLink,
    (l) => l.id,
  );
  return (
    <div>
      {feed.items.map((l) => (
        <LinkCard key={l.id} link={l} />
      ))}
      <Status {...feed} onRetry={feed.reload} empty={!feed.items.length} />
      {!feed.done && !feed.error && <Sentinel onVisible={feed.loadMore} />}
    </div>
  );
}

const SORTS = [
  ['hot', 'Gorące'],
  ['newest', 'Najnowsze'],
  ['active', 'Aktywne'],
] as const;

export function Mikroblog({ sort }: { sort: 'hot' | 'newest' | 'active' }) {
  const feed = useFeed<Entry>(
    'entries:' + sort,
    (page) => api.get('/entries', { sort, page, last_update: sort === 'hot' ? 12 : undefined }),
    toEntry,
    (e) => e.id,
  );
  return (
    <div>
      <nav class="subnav">
        {SORTS.map(([s, label]) => (
          <Link key={s} href={s === 'hot' ? '/mikroblog' : '/mikroblog?sort=' + s} class={s === sort ? 'on' : ''}>
            {label}
          </Link>
        ))}
      </nav>
      {feed.items.map((e) => (
        <EntryCard key={e.id} entry={e} />
      ))}
      <Status {...feed} onRetry={feed.reload} empty={!feed.items.length} />
      {!feed.done && !feed.error && <Sentinel onVisible={feed.loadMore} />}
    </div>
  );
}

export function TagView({ tag }: { tag: string }) {
  const feed = useFeed<Item>(
    'tag:' + tag,
    (page) => api.get('/tags/' + encodeURIComponent(tag) + '/stream', { page, sort: 'all', type: 'all' }),
    toItem,
    (i) => i.kind + i.id,
  );
  return (
    <div>
      <h1 class="page-title">#{tag}</h1>
      {feed.items.map((i) =>
        i.kind === 'link' ? <LinkCard key={'l' + i.id} link={i} /> : i.kind === 'entry' ? <EntryCard key={'e' + i.id} entry={i} /> : null,
      )}
      <Status {...feed} onRetry={feed.reload} empty={!feed.items.length} />
      {!feed.done && !feed.error && <Sentinel onVisible={feed.loadMore} />}
    </div>
  );
}
