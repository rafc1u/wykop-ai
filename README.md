# wykop-ai

Lekki, mobilny interfejs dla wykop.pl w formie userscriptu. Projektowany pod iPhone'a i Safari.

> **Nieoficjalny projekt.** Nie jest powiązany z Wykop sp. z o.o. ani przez nią popierany.
> Skrypt rozmawia wyłącznie z API wykop.pl, używając sesji Twojej przeglądarki.
> Nie wysyła żadnych danych nigdzie indziej i nie zawiera analityki.

## Instalacja na iPhonie

1. Zainstaluj darmową aplikację [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887) z App Store.
2. Ustawienia → Aplikacje → Safari → Rozszerzenia → **Userscripts**: włącz i zezwól na dostęp do `wykop.pl`.
3. Otwórz w Safari ten adres i zatwierdź instalację w okienku rozszerzenia (ikona „puzzla” w pasku adresu):
   **https://raw.githubusercontent.com/rafc1u/wykop-ai/build/wykop-ai.user.js**
4. Wejdź na https://wykop.pl.

Skrót na ekranie głównym: przy „Dodaj do ekranu początkowego” **wyłącz** „Otwórz jako aplikację webową”. W trybie aplikacji webowej rozszerzenia Safari nie działają.

## Co działa (v0.1)

- Główna, Wykopalisko, Mikroblog (gorące, najnowsze, aktywne)
- Wpis i znalezisko z komentarzami, strumień tagu
- Przewijanie bez końca, tryb ciemny, linki `wykop.pl/wpis/…`, `/link/…`, `/tag/…`
- **Diagnostyka**: menu ⋯ → Diagnostyka → „Uruchom test” → „Kopiuj raport”. Raport nie zawiera tokenów.
- **Oryginalny Wykop**: menu ⋯ → „Oryginalny Wykop (ta karta)”. Przycisk w rogu wraca do wykop-ai. Działa też `?oryginal=1` / `?oryginal=0`.

Logowanie, rejestracja i ustawienia konta zostają na oryginalnej stronie.

## Jak to działa

Skrypt uruchamia się na wykop.pl, chowa oryginalną stronę i montuje własny UI (Preact) w shadow DOM.
Dane pobiera z `https://wykop.pl/api/v3` zwykłym `fetch` z tej samej domeny. Jeśli jesteś zalogowany,
używa tokena, który oficjalna strona trzyma w `localStorage.token`. Skrypt nigdy go nie zapisuje ani nie odświeża.

## Rozwój

```sh
npm ci
npm test
npm run build   # dist/wykop-ai.user.js + dist/wykop-ai.meta.js
```

Push na `main` uruchamia GitHub Actions: testy, build i commit gotowego pliku na gałąź `build`.
Tag `vX.Y.Z` dodatkowo tworzy wydanie. Wersję zmieniasz w `package.json`.

## Licencja

MIT
