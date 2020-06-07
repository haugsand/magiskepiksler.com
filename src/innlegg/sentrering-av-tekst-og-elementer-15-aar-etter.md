---
title: Sentrering av tekst og elementer –&nbsp;15 år etter
date: 2019-02-23
---

På starten av 2000-tallet var «Hvordan midtstiller jeg x» et [gjentagende spørsmål](https://www.diskusjon.no/search/?&q=midtstilling&type=forums_topic&nodes=532&search_and_or=or&updated_after=1041379200&updated_before=1075593600&sortby=newest) på forumet som i dag heter diskusjon.no. Det var tilsynelatende mange ulike løsninger, som bare tidvis fungerte etter hensikten. Jeg skrev derfor artikkelen [sentrering av tekst og elementer](https://web.archive.org/web/20041019145806/http://decalibration.net/artikler/sentrering/) som forklarte hvordan dette burde løses. Hvor gyldig er artikkelens innhold i dag?


## Løsning ved hjelp av CSS i 2004

I den opprinnelige artikkelen står følgende:

- Bruk `text-align: center;` for å midtstille tekst og inline-elementer.
- Bruk `margin: 0 auto;` for å midtstille blokkelementer.

Dette må sies å være gyldige og anbefalte metoder også i dag, 15 år etterpå. CSS-standarden har imidlertid blitt utvidet siden den gang, og fått nye layout-verktøy. Det gir ofte mening å bruke flexbox eller grid til å styre både horisontal og vertikal justering, for eksempel ved hjelp av `justify-content: center;`.

Etter innføringen av flexbox og grid har det dessuten blitt mer rett frem å midtstille elementer vertikalt.  


## Andre observasjoner

Livet til en frontendutvikler er mye bedre i dag, enn for 15 år siden.

- HTML 5 har bare én doctype.
- Dagens nettlesere har god CSS-støtte, og oppdateres automatisk.
- IE5, IE6 og quirkmodus er forlengst historie.
