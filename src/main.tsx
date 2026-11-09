// Punkt wejścia userscriptu. Uruchamia się na document-start na wykop.pl.

import { render } from 'preact';
import { App, OFF_KEY } from './App';
import { CSS } from './styles';

// Ścieżki, które zostawiamy oryginalnej stronie (logowanie, rejestracja, Wykop Connect itp.).
const PASSTHROUGH = /^\/(logowanie|rejestracja|connect|zaloguj|wyloguj|api|ustawienia|reset-hasla)(\/|$)/;

function isOff(): boolean {
  const q = new URLSearchParams(location.search);
  try {
    if (q.get('oryginal') === '1') sessionStorage.setItem(OFF_KEY, '1');
    if (q.get('oryginal') === '0') sessionStorage.removeItem(OFF_KEY);
    return sessionStorage.getItem(OFF_KEY) === '1';
  } catch {
    return q.get('oryginal') === '1';
  }
}

function onReady(fn: () => void) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
  else fn();
}

/** Mały przycisk powrotu do naszego UI, gdy użytkownik wybrał oryginalną stronę. */
function backButton() {
  onReady(() => {
    const b = document.createElement('button');
    b.textContent = 'wykop-ai';
    b.setAttribute('aria-label', 'Wróć do wykop-ai');
    Object.assign(b.style, {
      position: 'fixed', right: '12px', bottom: 'calc(12px + env(safe-area-inset-bottom))', zIndex: '2147483647',
      padding: '8px 12px', borderRadius: '18px', border: '0', background: '#1f6f5c', color: '#fff',
      font: '600 13px -apple-system, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,.25)', opacity: '0.85',
    });
    b.onclick = () => {
      try {
        sessionStorage.removeItem(OFF_KEY);
      } catch {
        /* ignore */
      }
      location.reload();
    };
    document.body.appendChild(b);
  });
}

function start() {
  if (window.top !== window.self) return;
  if (PASSTHROUGH.test(location.pathname)) return;
  if (isOff()) {
    backButton();
    return;
  }

  // Od razu chowamy oryginalną stronę, żeby nie mignęła.
  const hide = document.createElement('style');
  hide.textContent =
    'html > body { display: none !important; } html { overflow: auto !important; height: auto !important; background: #f4f5f7; }' +
    '@media (prefers-color-scheme: dark) { html { background: #0f1115; } }';
  if (document.documentElement) document.documentElement.appendChild(hide);
  else onReady(() => document.documentElement.appendChild(hide));

  onReady(() => {
    const host = document.createElement('wykop-ai');
    const root = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    const mount = document.createElement('div');
    root.append(style, mount);
    document.documentElement.appendChild(host);
    render(<App />, mount);

    // Gdyby oryginalna aplikacja usunęła nasze elementy, dokładamy je z powrotem.
    new MutationObserver(() => {
      if (!host.isConnected) document.documentElement.appendChild(host);
      if (!hide.isConnected) document.documentElement.appendChild(hide);
    }).observe(document.documentElement, { childList: true });
  });
}

start();
