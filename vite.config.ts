/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import pkg from './package.json' with { type: 'json' };

const RAW = 'https://raw.githubusercontent.com/rafc1u/wykop-ai/build';
const FILE = 'wykop-ai.user.js';

// Własna ikona (nie logo Wykopu): prosty kwadrat z literami "wa".
const ICON =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1f6f5c"/><text x="32" y="42" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">wa</text></svg>',
  ).toString('base64');

export default defineConfig({
  define: {
    __WL_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    minify: false, // Greasy Fork wymaga czytelnego kodu
    target: 'safari15',
  },
  plugins: [
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: 'wykop-ai - nieoficjalny klient wykop.pl',
        namespace: 'https://github.com/rafc1u/wykop-ai',
        description:
          'Lekki, mobilny interfejs dla wykop.pl. Nieoficjalny, niepowiązany z Wykop sp. z o.o. Rozmawia wyłącznie z API wykop.pl, używając sesji przeglądarki.',
        license: 'MIT',
        icon: ICON,
        homepageURL: 'https://github.com/rafc1u/wykop-ai',
        supportURL: 'https://github.com/rafc1u/wykop-ai/issues',
        match: ['https://wykop.pl/*', 'https://www.wykop.pl/*'],
        'run-at': 'document-start',
        noframes: true,
        grant: 'none',
        updateURL: `${RAW}/wykop-ai.meta.js`,
        downloadURL: `${RAW}/${FILE}`,
      },
      build: {
        fileName: FILE,
        metaFileName: true,
      },
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
});
