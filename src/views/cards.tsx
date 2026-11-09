import { useState } from 'preact/hooks';
import type { Author, Comment, Entry, Link as LinkModel, Media } from '../api/models';
import { safeUrl, sourceHost } from '../api/models';
import { Content } from '../content/render';
import { Link } from '../ui/Link';
import { timeAgo } from '../ui/feed';

export function AuthorLine({ author, createdAt, href }: { author?: Author; createdAt?: string; href?: string }) {
  const avatar = safeUrl(author?.avatar);
  return (
    <div class="author">
      {avatar ? <img class="avatar" src={avatar} alt="" loading="lazy" /> : <span class="avatar ph" />}
      {author ? (
        <Link href={'/ludzie/' + encodeURIComponent(author.username)} class="nick">
          {author.username}
        </Link>
      ) : (
        <span class="nick">?</span>
      )}
      {createdAt &&
        (href ? (
          <Link href={href} class="muted">
            {' · ' + timeAgo(createdAt)}
          </Link>
        ) : (
          <span class="muted"> · {timeAgo(createdAt)}</span>
        ))}
    </div>
  );
}

export function MediaView({ media, adult }: { media: Media; adult?: boolean }) {
  const [shown, setShown] = useState(!adult);
  const photo = safeUrl(media.photo);
  const embed = safeUrl(media.embedUrl);
  const thumb = safeUrl(media.embedThumb);
  if (!photo && !embed) return null;
  if (!shown) {
    return (
      <button class="adult" onClick={() => setShown(true)}>
        Treść 18+ · pokaż
      </button>
    );
  }
  return (
    <div class="media">
      {photo && (
        <a href={photo} target="_blank" rel="noopener noreferrer">
          <img src={photo} alt="" loading="lazy" />
        </a>
      )}
      {!photo && embed && (
        <a class="embed" href={embed} target="_blank" rel="noopener noreferrer nofollow">
          {thumb && <img src={thumb} alt="" loading="lazy" />}
          <span>▶ {sourceHost(embed) ?? 'otwórz'}</span>
        </a>
      )}
    </div>
  );
}

const fmt = (n?: number) => (n === undefined ? '' : n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + ' tys.' : String(n));

export function EntryCard({ entry, full }: { entry: Entry; full?: boolean }) {
  const [open, setOpen] = useState(full ?? false);
  const long = !full && entry.content.length > 700;
  return (
    <article class="card">
      <AuthorLine author={entry.author} createdAt={entry.createdAt} href={full ? undefined : '/wpis/' + entry.id} />
      <div class={'body' + (long && !open ? ' clamp' : '')}>
        <Content text={entry.content} />
      </div>
      {long && !open && (
        <button class="more" onClick={() => setOpen(true)}>
          rozwiń
        </button>
      )}
      <MediaView media={entry.media} adult={entry.adult} />
      <footer>
        <span class="votes">+{fmt(entry.votes ?? 0)}</span>
        {!full && (
          <Link href={'/wpis/' + entry.id} class="comments">
            💬 {fmt(entry.commentsCount ?? entry.comments.length)}
          </Link>
        )}
      </footer>
    </article>
  );
}

export function LinkCard({ link }: { link: LinkModel }) {
  const photo = safeUrl(link.media.photo);
  const host = link.sourceLabel ?? sourceHost(link.sourceUrl);
  return (
    <article class="card link">
      <Link href={'/link/' + link.id + (link.slug ? '/' + link.slug : '')} class="link-main">
        {photo && !link.adult && <img class="thumb" src={photo} alt="" loading="lazy" />}
        <div>
          <h2>{link.title}</h2>
          <div class="muted small">
            {host}
            {link.createdAt && ' · ' + timeAgo(link.createdAt)}
          </div>
        </div>
      </Link>
      <footer>
        <span class="votes">▲ {fmt(link.votes ?? 0)}</span>
        <span class="comments">💬 {fmt(link.commentsCount ?? 0)}</span>
      </footer>
    </article>
  );
}

export function CommentView({ c, depth = 0 }: { c: Comment; depth?: number }) {
  return (
    <div class={'comment' + (depth ? ' reply' : '')}>
      <AuthorLine author={c.author} createdAt={c.createdAt} />
      <Content text={c.content} />
      <MediaView media={c.media} adult={c.media.adult} />
      <div class="muted small">+{fmt(c.votes ?? 0)}</div>
      {c.replies.map((r) => (
        <CommentView key={r.id} c={r} depth={depth + 1} />
      ))}
    </div>
  );
}

export function Status({ loading, error, done, onRetry, empty }: { loading: boolean; error: string | null; done: boolean; onRetry: () => void; empty?: boolean }) {
  if (error)
    return (
      <div class="status error">
        <p>{error}</p>
        <button onClick={onRetry}>Spróbuj ponownie</button>
        <p class="small">
          Nie działa? Otwórz <Link href="?wl=diag">diagnostykę</Link>.
        </p>
      </div>
    );
  if (loading) return <div class="status muted">Ładowanie…</div>;
  if (done && empty) return <div class="status muted">Nic tu nie ma.</div>;
  if (done) return <div class="status muted">To już wszystko.</div>;
  return null;
}
