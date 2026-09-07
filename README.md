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

## Merk

Cache-bustingen av CSS og JavaScript er manuell: `styleVersion` og
`javascriptVersion` i `src/data.yml` må økes når de filene endres, ellers får
returnerende besøkende den gamle versjonen.
