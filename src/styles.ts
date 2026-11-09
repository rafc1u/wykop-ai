// Style trzymamy jako tekst i wstrzykujemy do shadow DOM, żeby nie mieszały się ze stylami Wykopu.
export const CSS = `
:host { all: initial; display: block; }
* { box-sizing: border-box; }
.app {
  --bg: #f4f5f7; --card: #fff; --ink: #16181d; --muted: #6b7280; --line: #e5e7eb;
  --accent: #1f6f5c; --accent-ink: #fff; --tag: #1d5fa8;
  font: 16px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--ink); background: var(--bg); min-height: 100vh;
  -webkit-text-size-adjust: 100%;
  padding-bottom: env(safe-area-inset-bottom);
}
@media (prefers-color-scheme: dark) {
  .app { --bg: #0f1115; --card: #181b21; --ink: #e8eaed; --muted: #9aa0a6; --line: #2a2e36; --accent: #3fa58a; --tag: #7cb3f0; }
}
a { color: inherit; text-decoration: none; }
button, select { font: inherit; color: inherit; }
button {
  background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 8px 14px; cursor: pointer;
}
button:disabled { opacity: .5; }
.top {
  position: sticky; top: 0; z-index: 10; display: flex; align-items: center;
  background: var(--card); border-bottom: 1px solid var(--line);
  padding: env(safe-area-inset-top) 4px 0 4px;
}
.tabs { display: flex; flex: 1; overflow-x: auto; }
.tabs a, .subnav a { padding: 12px 12px; color: var(--muted); font-weight: 600; white-space: nowrap; }
.tabs a.on, .subnav a.on { color: var(--accent); box-shadow: inset 0 -2px 0 var(--accent); }
.menu-btn { border: 0; background: none; font-size: 22px; padding: 6px 12px; }
.menu {
  position: fixed; right: 8px; top: calc(52px + env(safe-area-inset-top)); z-index: 20;
  background: var(--card); border: 1px solid var(--line); border-radius: 12px; overflow: hidden;
  display: flex; flex-direction: column; min-width: 240px; box-shadow: 0 8px 24px rgba(0,0,0,.18);
}
.menu a, .menu button { padding: 14px 16px; border: 0; border-radius: 0; text-align: left; background: none; border-bottom: 1px solid var(--line); }
.subnav { display: flex; gap: 4px; padding: 0 8px; background: var(--card); border-bottom: 1px solid var(--line); }
main { max-width: 720px; margin: 0 auto; padding: 8px 0; }
.card { background: var(--card); margin: 8px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); }
.card footer { display: flex; gap: 16px; align-items: center; margin-top: 10px; color: var(--muted); font-size: 14px; }
.votes { color: var(--accent); font-weight: 700; }
.author { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 14px; }
.avatar { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; flex: none; background: var(--line); }
.nick { font-weight: 700; }
.muted { color: var(--muted); }
.small { font-size: 13px; }
.content p { margin: 0 0 8px; overflow-wrap: anywhere; }
.content p:last-child { margin-bottom: 0; }
.content a { color: var(--tag); }
.content .user { font-weight: 600; }
.content blockquote { margin: 6px 0; padding: 4px 10px; border-left: 3px solid var(--line); color: var(--muted); }
.content code { font: 14px ui-monospace, Menlo, monospace; background: var(--bg); padding: 1px 4px; border-radius: 4px; }
.content pre { overflow-x: auto; background: var(--bg); padding: 8px; border-radius: 8px; }
.spoiler summary { color: var(--muted); cursor: pointer; }
.body.clamp { max-height: 14em; overflow: hidden; -webkit-mask-image: linear-gradient(#000 70%, transparent); }
.more { margin-top: 4px; padding: 4px 10px; font-size: 14px; }
.media { margin-top: 8px; }
.media img { display: block; max-width: 100%; max-height: 70vh; border-radius: 10px; }
.embed { display: block; position: relative; }
.embed span { display: inline-block; margin-top: 6px; color: var(--tag); }
.adult { margin-top: 8px; }
.link .link-main { display: flex; gap: 12px; align-items: flex-start; }
.thumb { width: 96px; height: 72px; object-fit: cover; border-radius: 10px; flex: none; background: var(--line); }
.link h2 { font-size: 16px; line-height: 1.3; margin: 0 0 4px; }
.link-title { font-size: 20px; line-height: 1.25; margin: 10px 0 4px; }
.button { display: inline-block; margin-top: 10px; padding: 8px 14px; border-radius: 10px; background: var(--accent); color: var(--accent-ink); font-weight: 600; }
.section { display: flex; justify-content: space-between; align-items: center; margin: 16px 14px 4px; font-size: 15px; }
.section select { font-size: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 4px; }
.comments-list { margin: 0 8px; }
.comment { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; margin: 8px 0; }
.comment.reply { border: 0; border-left: 2px solid var(--line); border-radius: 0; padding: 6px 0 6px 10px; margin: 8px 0 0 4px; }
.status { text-align: center; padding: 24px 16px; }
.status.error p { color: #c0392b; }
.page-title { font-size: 20px; margin: 12px 14px 4px; }
.sentinel { height: 1px; }
.foot { text-align: center; padding: 16px; }
.diag { padding: 0 14px; }
.diag .row { display: flex; gap: 8px; margin: 12px 0; }
.diag textarea { width: 100%; font: 12px ui-monospace, Menlo, monospace; background: var(--card); color: var(--ink); border: 1px solid var(--line); border-radius: 8px; }
`;
