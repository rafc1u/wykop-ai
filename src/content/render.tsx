// Renderer treści Wykopu (format zbliżony do Markdown) do elementów Preact.
// Nigdy nie używa innerHTML: każdy fragment tekstu trafia do DOM jako węzeł tekstowy,
// a linki przechodzą przez safeUrl (tylko http/https).

import type { ComponentChildren, VNode } from 'preact';
import { safeUrl } from '../api/models';
import { Link } from '../ui/Link';

export type Inline =
  | { t: 'text'; v: string }
  | { t: 'bold'; c: Inline[] }
  | { t: 'italic'; c: Inline[] }
  | { t: 'code'; v: string }
  | { t: 'link'; href: string; c: Inline[] }
  | { t: 'tag'; v: string }
  | { t: 'user'; v: string }
  | { t: 'br' };

export type Block =
  | { t: 'p'; c: Inline[] }
  | { t: 'quote'; c: Block[] }
  | { t: 'spoiler'; c: Block[] }
  | { t: 'pre'; v: string };

const INLINE =
  /`([^`\n]+)`|\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*\n]+?)\*\*|(?<![\p{L}\p{N}_])_([^_\n]+?)_(?![\p{L}\p{N}_])|(https?:\/\/[^\s<>"]+[^\s<>".,;:!?)\]'])|(?<![\p{L}\p{N}_&/#])#([\p{L}\p{N}_]+)|(?<![\p{L}\p{N}_/@.])@([A-Za-z0-9_-]+)/gu;

export function parseInline(s: string, depth = 0): Inline[] {
  const out: Inline[] = [];
  const pushText = (v: string) => {
    if (!v) return;
    const parts = v.split('\n');
    parts.forEach((p, i) => {
      if (i > 0) out.push({ t: 'br' });
      if (p) out.push({ t: 'text', v: p });
    });
  };
  if (depth > 3) {
    pushText(s);
    return out;
  }
  let last = 0;
  INLINE.lastIndex = 0;
  const re = new RegExp(INLINE.source, INLINE.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    pushText(s.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1] !== undefined) out.push({ t: 'code', v: m[1] });
    else if (m[2] !== undefined) out.push({ t: 'link', href: m[3], c: parseInline(m[2], depth + 1) });
    else if (m[4] !== undefined) out.push({ t: 'bold', c: parseInline(m[4], depth + 1) });
    else if (m[5] !== undefined) out.push({ t: 'italic', c: parseInline(m[5], depth + 1) });
    else if (m[6] !== undefined) out.push({ t: 'link', href: m[6], c: [{ t: 'text', v: shortUrl(m[6]) }] });
    else if (m[7] !== undefined) out.push({ t: 'tag', v: m[7] });
    else if (m[8] !== undefined) out.push({ t: 'user', v: m[8] });
  }
  pushText(s.slice(last));
  return out;
}

function shortUrl(u: string): string {
  const s = u.replace(/^https?:\/\/(www\.)?/, '');
  return s.length > 48 ? s.slice(0, 45) + '…' : s;
}

export function parseBlocks(src: string, depth = 0): Block[] {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  let para: string[] = [];
  const flush = () => {
    const text = para.join('\n').trim();
    if (text) blocks.push({ t: 'p', c: parseInline(text) });
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      flush();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) buf.push(lines[i++]);
      blocks.push({ t: 'pre', v: buf.join('\n') });
      continue;
    }
    const q = /^\s*>\s?(.*)$/.exec(line);
    const sp = /^\s*!\s?(.*)$/.exec(line);
    if ((q || sp) && depth < 3) {
      flush();
      const kind = q ? 'quote' : 'spoiler';
      const rx = q ? /^\s*>\s?(.*)$/ : /^\s*!\s?(.*)$/;
      const buf: string[] = [];
      while (i < lines.length) {
        const mm = rx.exec(lines[i]);
        if (!mm) break;
        buf.push(mm[1]);
        i++;
      }
      i--;
      blocks.push({ t: kind, c: parseBlocks(buf.join('\n'), depth + 1) });
      continue;
    }
    if (!line.trim()) flush();
    else para.push(line);
  }
  flush();
  return blocks;
}

function renderInline(nodes: Inline[]): ComponentChildren[] {
  return nodes.map((n, i): ComponentChildren => {
    switch (n.t) {
      case 'text':
        return n.v;
      case 'br':
        return <br key={i} />;
      case 'bold':
        return <strong key={i}>{renderInline(n.c)}</strong>;
      case 'italic':
        return <em key={i}>{renderInline(n.c)}</em>;
      case 'code':
        return <code key={i}>{n.v}</code>;
      case 'tag':
        return (
          <Link key={i} href={'/tag/' + encodeURIComponent(n.v)} class="tag">
            #{n.v}
          </Link>
        );
      case 'user':
        return (
          <Link key={i} href={'/ludzie/' + encodeURIComponent(n.v)} class="user">
            @{n.v}
          </Link>
        );
      case 'link': {
        const href = safeUrl(n.href);
        if (!href) return renderInline(n.c);
        const internal = /^https?:\/\/(www\.)?wykop\.pl\//.test(href);
        if (internal) {
          return (
            <Link key={i} href={new URL(href).pathname}>
              {renderInline(n.c)}
            </Link>
          );
        }
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer nofollow">
            {renderInline(n.c)}
          </a>
        );
      }
    }
  });
}

function renderBlocks(blocks: Block[]): VNode[] {
  return blocks.map((b, i) => {
    switch (b.t) {
      case 'p':
        return <p key={i}>{renderInline(b.c)}</p>;
      case 'pre':
        return (
          <pre key={i}>
            <code>{b.v}</code>
          </pre>
        );
      case 'quote':
        return <blockquote key={i}>{renderBlocks(b.c)}</blockquote>;
      case 'spoiler':
        return (
          <details key={i} class="spoiler">
            <summary>pokaż spoiler</summary>
            {renderBlocks(b.c)}
          </details>
        );
    }
  });
}

export function Content({ text }: { text: string }) {
  if (!text) return null;
  return <div class="content">{renderBlocks(parseBlocks(text))}</div>;
}
