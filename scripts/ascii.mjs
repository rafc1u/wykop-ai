// Po buildzie: zamienia znaki spoza ASCII w kodzie na sekwencje \uXXXX.
// Dzięki temu polskie znaki działają nawet wtedy, gdy menedżer userscriptów
// albo serwer poda plik z błędnym kodowaniem. Nagłówek ==UserScript== zostaje w UTF-8.
import { readFileSync, writeFileSync } from 'node:fs';

const file = process.argv[2] ?? 'dist/wykop-ai.user.js';
const src = readFileSync(file, 'utf8');
const marker = '// ==/UserScript==';
const at = src.indexOf(marker);
const head = at >= 0 ? src.slice(0, at + marker.length) : '';
const body = at >= 0 ? src.slice(at + marker.length) : src;
const escaped = body.replace(/[^\x00-\x7f]/gu, (ch) =>
  Array.from({ length: ch.length }, (_, i) => '\\u' + ch.charCodeAt(i).toString(16).padStart(4, '0')).join(''),
);
writeFileSync(file, head + escaped);
console.log(`ascii: ${file} (${body.length - escaped.length === 0 ? 'bez zmian' : 'zamieniono znaki spoza ASCII'})`);
