import type { ComponentChildren } from 'preact';
import { navigate } from '../router';

/** Link wewnętrzny: zmienia adres przez history API zamiast przeładowywać stronę. */
export function Link(props: { href: string; class?: string; children?: ComponentChildren }) {
  return (
    <a
      href={props.href}
      class={props.class}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(props.href);
      }}
    >
      {props.children}
    </a>
  );
}
