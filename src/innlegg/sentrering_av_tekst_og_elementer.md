---
title: Sentrering av tekst og elementer
date: 2004-02-23
---

Denne artikkelen ble opprinnelig skrevet i 2004. Det har skjedd en rivende utvikling innenfor standardisering og nettlesere siden den gang, så innholdet nedenfor er ikke like relevant i dag. Artikkelen gjøres likevel tilgjengelig her av historiske og nostalgiske årsaker. Det er gjort noen få justeringer i ettertid, for å øke lesbarheten.



## Bakgrunn

Elementet `center` er [utdatert](http://www.w3.org/TR/html401/conform.html#deprecated), og har for lenge siden blitt erstattet med nyere begrep. Et utdatert element støttes fremdeles i nettleserne, men bare for bakoverkompatibilitet. Sjansene er store for at slike element senere [utgår](http://www.w3.org/TR/html401/conform.html#didx-obsolete), uten noen form for definisjon i spesifikasjonene eller nettleserstøtte. I denne artikkelen vil de nyere metodene for sentrering bli gjennomgått. 

En måte som ofte er brukt, er tilsettelse av `align="center"` i `p` eller i andre element som inneholder tekst eller bilder. Dette er også en delvis utdatert metode, som har blitt erstattet av  CSS-egenskapen `text-align`.

Men, her er det også noen unntak ute og går. Det finnes nemlig flere versjoner av HTML, såkalte [DOCTYPE-deklarasjoner](http://www.w3.org/TR/REC-html40/struct/global.html#h-7.2), som forteller hvordan nettleseren skal tolke dokumentet. «Strict» er den doctypen som anbefales av [W3C](http://www.w3c.org/), og inneholder færre HTML-attributer enn «Transitional». Noen opplever Strict som en strengere og vanskeligere doctype enn Transitional, siden det er nødvendig å bruke CSS på steder man tidligere skrev attributer rett inn i HTML-taggene. Dette bør dog ikke by på noen problemer, hvis man er innstilt på å få en ryddig kode med all CSS adskilt i et eget dokument. `align` er blant attributtene som valideres i Transitional, men ikke i Strict.

## Sentrering av tekst

For å sentrere tekst, bilder eller annet [inline](https://www.w3.org/TR/CSS2/visuren.html#inline-boxes)-innhold, legges `text-align: center;` til det elementet som innholdet står innenfor. I eksemplet nedenfor vil tekst innenfor et avsnitt bli sentrert.

```
p {
  text-align: center;
}
```

```
<p>
  Denne teksten står midt inne i avsnittet.<br>
  Det gjør også denne!
</p>
```

## Sentrering av blokker

Siden `text-align` bare gjelder for inline-innhold, brukes det en annen metode for å få [blokkelement](https://www.w3.org/TR/CSS2/visuren.html#block-boxes) stående midt på siden. Blokkelement tar vanligvis opp all tilgjengelig plass i bredden, så det må angis `width` for å få noe resultat. For å få elementet til å ha lik margin til høyre og venstre side, bruker vi CSS-egenskapen `margin` med verdien `auto`.

```
p {
  width: 300px;
  margin: 0 auto;
}
```

```
<p>
  Denne teksten står inne i en boks som står midt på siden.<br>
  Og er venstrejustert inne i boksen!
</p>
```

Når det er oppgitt 2 verdier etter `margin`, gjelder den første verdien for de _begge_ vertikale sidene, og den andre verdien for de _begge_ horisontale.

Denne metoden kan brukes til å sentrere et bilde også, ved å angi at bildet skal oppføre seg som et blokkelement ved hjelp av CSS-egenskapen `display`.

```
img {
  display: block;
  margin: 0 auto;
}
```

```
<img src="..." alt="...">
```

Flere har problemer med å få denne metoden til å funke i Internet Explorer 6, på grunn av en feil DOCTYPE-deklarasjon. For at den skal aktiveres i Internet Explorer, må den plasseres helt øverst i dokumentet, uten tegn eller mellomrom over seg. For noen DOCTYPE-deklarasjoner kreves det i tillegg en URI, for at nettleseren ikke skal gå i «quirk-mode». En oversikt over [hvordan DOCTYPE-deklarasjonene skal se ut](https://web.archive.org/web/20050205052504/http://www.hut.fi/u/hsivonen/doctype.html) er alltid nyttig å ha.

## Nettleserstøtte

Internet Explorer 5 for Windows klarer ikke svare på denne metoden, og boksen/bildet vil ikke bli sentrert likevel. En svakhet til nettleseren, men ikke til metoden.

Det finnes en omvei, som kan tas for å få den til å virke i eldre nettlesere også. `text-align: center;` vil nemlig i tillegg til å sentrere tekst, også sentrere blokkelement i den gjeldende nettleseren; men her er det også en bakdel. Alle element innenfor elementet med den angitte verdien, arver den samme egenskapen og vil sentrere tekst som vi i utgangspunktet ikke vil ha sentrert. Dette fører til at det må legges til `text-align: left;` i de elementene vi _ikke_ vil ha sentrert tekst.

```
body {
  text-align: center;
}

p {
  width: 300px;
  margin: 0 auto;
  text-align: left;
}
```

```
<p>
  Denne teksten står inne i en boks som står midt på siden.<br>
  Og er venstrejustert inne i boksen!
</p>
```

## Relaterte dokumenter & kilder

- [A List Apart: Fix Your Site With the Right DOCTYPE!](http://www.alistapart.com/articles/doctype/)
- [W3C:  Centering things](http://www.w3.org/Style/Examples/007/center.html)
- [Methods for centring elements using Cascading Style Sheets](http://dorward.me.uk/www/centre/)
