import { useState } from 'preact/hooks';
import { parseRoute, useLocation, type Route } from './router';
import { Link } from './ui/Link';
import { EntryView, LinkView } from './views/details';
import { Diag } from './views/diag';
import { LinksList, Mikroblog, TagView } from './views/lists';

export const OFF_KEY = 'wl:off';

export function openOriginal() {
  try {
    sessionStorage.setItem(OFF_KEY, '1');
  } catch {
    /* tryb prywatny itp. */
  }
  location.reload();
}

function View({ route }: { route: Route }) {
  switch (route.name) {
    case 'home':
      return <LinksList key={route.type} type={route.type} />;
    case 'mikroblog':
      return <Mikroblog key={route.sort} sort={route.sort} />;
    case 'entry':
      return <EntryView key={route.id} id={route.id} />;
    case 'link':
      return <LinkView key={route.id} id={route.id} />;
    case 'tag':
      return <TagView key={route.tag} tag={route.tag} />;
    case 'diag':
      return <Diag />;
    case 'unsupported':
      return (
        <div class="status">
          <p>Ten widok nie jest jeszcze obsługiwany.</p>
          <button onClick={openOriginal}>Pokaż w oryginalnym Wykopie</button>
        </div>
      );
  }
}

export function App() {
  const loc = useLocation();
  const url = new URL(loc, location.origin);
  const route = parseRoute(url.pathname, url.search);
  const [menu, setMenu] = useState(false);
  const tab = route.name === 'home' ? route.type : route.name;
  return (
    <div class="app">
      <header class="top">
        <nav class="tabs">
          <Link href="/" class={tab === 'homepage' ? 'on' : ''}>
            Główna
          </Link>
          <Link href="/wykopalisko" class={tab === 'upcoming' ? 'on' : ''}>
            Wykopalisko
          </Link>
          <Link href="/mikroblog" class={tab === 'mikroblog' ? 'on' : ''}>
            Mikroblog
          </Link>
        </nav>
        <button class="menu-btn" aria-label="Menu" onClick={() => setMenu(!menu)}>
          ⋯
        </button>
      </header>
      {menu && (
        <div class="menu" onClick={() => setMenu(false)}>
          <Link href="?wl=diag">Diagnostyka</Link>
          <button onClick={openOriginal}>Oryginalny Wykop (ta karta)</button>
          <a href="https://github.com/rafc1u/wykop-ai" target="_blank" rel="noopener noreferrer">
            O projekcie · v{__WL_VERSION__}
          </a>
        </div>
      )}
      <main>
        <View route={route} />
      </main>
      <footer class="foot small muted">Nieoficjalny klient. Niepowiązany z Wykop sp. z o.o.</footer>
    </div>
  );
}
