# magiskepiksler.com

Kildekoden til [magiskepiksler.com](https://www.magiskepiksler.com). Statiske
sider bygget av [tinyjam](https://github.com/mourner/tinyjam) fra EJS-templates
og Markdown i `src/`, publisert på Cloudflare Workers.

## Lokal utvikling

    npm ci
    npm start

`npm start` bygger til `dist/` og starter Cloudflares egen kjøretid via
`wrangler dev`. Det er samme oppførsel som i produksjon, inkludert redirects,
cache-headere og 404-siden — en vanlig statisk filserver viser ikke det samme.

Kun bygge:

    npm run build

## Publisering

Nettstedet deployes av **Workers Builds**, Cloudflares Git-integrasjon. Den er
satt opp i dashbordet, ikke i dette repoet, så innstillingene er notert her:

| Innstilling | Verdi |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Production branch | `master` |
| Non-production branch builds | På |

Resten leses fra `wrangler.jsonc`.

- Push til `master` publiserer til magiskepiksler.com.
- Push til enhver annen branch gir en stabil preview-URL for den branchen,
  som alltid peker på siste commit. Det erstatter det tidligere
  dev.magiskepiksler.com.

## Filer Cloudflare tolker

Katalogen `cloudflare/` kopieres inn i `dist/` under bygging:

- `_redirects` — permanente redirects, blant annet fra gamle `.html`-adresser.
- `_headers` — cache-headere.
- `.assetsignore` — filer som ikke skal publiseres, som `img/drafts/`.

## Fonter

Fontene ligger i `src/fonts/` og serveres fra samme domene som resten, ikke fra
Google Fonts. Alle tre er under SIL Open Font License, og lisenstekstene ligger
ved siden av filene — de publiseres ikke, men skal bli liggende i repoet.

Kun `latin`-subsettet er tatt med, siden alle tegn nettstedet bruker ligger
under U+00FF. Skriver du innhold med tegn utenfor `unicode-range` i
`src/css/_fonts.css`, faller nettleseren tilbake til systemfonten for de
tegnene. Da må subsettet utvides.

Assistant er en variabel font og dekker vektene 300, 400 og 500 i én fil.
Inconsolata og Playfair Display er statiske, i henholdsvis vekt 300 og 500 —
trenger du en annen vekt av dem, må en ny fil hentes.

## Cache-busting

`bin/versjoner.mjs` kjører etter tinyjam og legger en innholdshash på
adressene til `index.css` og `script.js`. Endres en av dem, endres adressen,
og `_headers` kan derfor cache dem permanent. Ingenting må økes for hånd.

Skriptet stopper bygget hvis det ikke finner noen adresser å versjonere —
ellers ville filene fått et års caching på en adresse som aldri endrer seg.
