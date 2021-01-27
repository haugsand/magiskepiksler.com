---
title: En praktisk guide til mer tilgjengelige nettsider
date: 2021-01-26
---

Universell utforming er viktig og gir store gevinster. Dette er godt beskrevet hos [Tilsynet for universell utforming og IKT](https://www.uutilsynet.no/veiledning/kvifor-universell-utforming-av-ikt/240), så denne artikkelen fokuserer heller på å være en praktisk guide til hvordan dette kan oppnås.

Informasjonsnettsteder og enkle webapplikasjoner er i utgangspunktet tilgjengelige for alle, så lenge du skriver semantisk HTML. Det er riktignok mye som kan gå galt, men samtidig kan mange alvorlige feil avdekkes ved å utføre en enkel kondeinspeksjon i nettleseren. 

Artikkelen inneholder eksempler på feil som er lett å oppdage og lett å rette opp, og er gruppert i følgende tema:

* [Tekststørrelse](#tekststørrelse)
* [Alternativ tekst for bilder](#alternativ-tekst-for-bilder)
* [Lenker og knapper](#lenker-og-knapper)
* [Label og input](#label-og-input)

Hvis du har dårlig tid, kan du hoppe rett til [oppsummeringen](#oppsummering).




***




## Tekststørrelse

I nettlesere finnes det egne innstillinger for tilgjengelighet, som blant annet gjør det mulig å oppskalere tekststørrelsen til nettsteder. Dette er en essensiell innstilling for de brukerne som synes at tekst med ordinær størrelse er vanskelig å lese. 


<figure>

<img src="/img/tekstskalering.svg" alt="Tekstskalering: 120 %" width="360" height="288">
<figcaption>Eksempel på en tilgjengelighetsinnstilling i Google Chrome for Android.</figcaption>

</figure>


I CSS kan størrelser angis med [absolutte eller relative enheter](https://developer.mozilla.org/en-US/docs/Web/CSS/length). En absolutt enhet er relatert til en fysisk størrelse, mens verdier angitt med relative enheter er relaterte til andre bestemte størrelser. 

Et element med den relative størrelsen `font-size: 150%;` skal for eksempel ha 50 prosent større tekst i forhold til elementet det står innenfor. 

Om du angir nettsidens tekststørrelse med en relativ enhet (`html { font-size: 150% }`), vil størrelsen være relatert til nettleserens standardstørrelse, og dermed også ta hensyn til brukerens innstillinger for tilgjengelighet.

Siden en absolutt enhet er relatert til en fysisk størrelse, vil den ikke skalere i henhold til brukerens innstillinger nevnt ovenfor. `16px` forblir `16px`, selv om brukeren ønsker at teksten skal skalere 125 % til 20px. 

Bruk derfor relative enheter ved angivelse av `font-size`. Både `em`, `rem` og `%` er trygge valg.

Andre dimensjoner er ofte proporsjonale til tekststørrelsen, og bør derfor angis med en enheten som er relatert til tekststørrelsen. Noen eksempler

- Et avsnitt bør ha en maksbredde (`max-width`) som begrenser antall ord på hver linje, for å forhindre at teksten blir vanskelig å lese. 
- Et avsnitt er lettest å lese når den samtidig har en linjehøyde (`line-height`) som harmonerer med tekststørrelsen.
- Den vertikale avstanden (`margin`)  mellom to avsnitt er gjerne den samme som avsnittenes linjehøyde, for å bidra til at designet får en [vertikal rytme](https://zellwk.com/blog/why-vertical-rhythms/). 

Bruk relative enheter til de aller fleste dimensjoner, inkludert [media queries](https://zellwk.com/blog/media-query-units/).


### Dårlig praksis: `font-size` angis med en absolutt enhet

```
p {
  font-size: 16px;  /* absolutt enhet */
}
```

I dette tilfellet vil det ikke tas hensyn til brukerens innstillinger for tilgjengelighet.  



### Dårlig praksis: Absolutte og relative enheter brukes om hverandre


```
body {
  font-size: 16px;  /* absolutt enhet */
}

p {
  font-size: 1em;  /* relativ enhet */
}
```

Avsnittets tekststørrelse er angitt med en relativ enhet, men er avhengig av tekststørrelsen til `body`, som igjen er angitt med en absolutt enhet. Heller ikke her vil tekststørrelsen skalere.



### God praksis: `font-size` med en relativ enhet


```
p {
  font-size: 1rem;  /* relativ enhet */
}
```



### God praksis: Relative enheter brukes til både `font-size` og andre dimensjoner

```
p {
  font-size: 1rem; 
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
  max-width: 45rem;
}

@media (min-width: 48em) {
  html {
    font-size: 120%;
  }
}
```

Her er alle dimensjoner angitt med relative enheter, noe som gjør at hele designet skalerer godt.


***




## Alternativ tekst for bilder

For å sette ting på spissen, så kan bilder på nettsider deles inn i to kategorier:

- Bilder som er dekorative, og gjør et nettsted mer visuelt attraktivt. Dette gjelder blant annet ikoner som supplererer en tekst, bakgrunnsmønster og kantlinjer. 
- Bilder som bærer informasjon eller har en funksjon, og er en viktig del av nettsidens innhold. Dette gjelder blant annet figurer, logoer og annen grafikk med tekst. 

Her omtales kun bilder som legges inn ved hjelp av [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)-elementet, og ikke [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) eller [bakgrunnsbilder](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image).

Det er ikke alle brukere som har mulighet til å oppfatte grafikk og illustrasjoner. Blinde og svaksynte bruker ofte en skjermleser, som tolker informasjonen et nettsted består av, og presenterer innholdet på en leselist eller ved syntetisk tale. 

<figure>

<img src="/img/w3c_icon.svg" width="210" height="142" alt="W3C">
<figcaption>Logoen til World Wide Web Consortium inneholder teksten &laquo;W3C&raquo;.</figcaption>

</figure>

Alle bilder skal ha [`alt`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt)-attributtet, med en alternativ tekst som vises dersom bildet ikke er tilgjengelig.

Dekorative bilder skal ha en tom tekststreng (`alt=""`) som alternativ tekst. Dette er et hint til skjermlesere om at bildet kan ignoreres. Dersom et bilde mangler `alt`-attributtet, vil skjermlesere i stedet kommunisere &laquo;her er det et bilde uten alternativ tekst&raquo;, noe som bare oppleves som støy for brukerne.

Andre bilder skal ha en alternativ tekst som fungerer som en erstatning for bildet, uten at nettsidens betydning blir endret. For å finne en passende tekst, kan det være nyttig å tenke over følgende: 

> Hvordan ville jeg ha lest opp nettsidens innhold til en venn over telefonen, uten å nevne at det finnes et bilde på siden?

Det er en kunst å lage gode alternative tekster, og det nøyaktig samme bildet kan ha to ulike alternative tekster om det står i to forskjellige kontekster. WebAIM har en utmerket [gjennomgang av alternative tekster](https://webaim.org/techniques/alttext/), med mer detaljerte eksempler og råd.



<figure>

<img src="/img/stockphoto.jpg" srcset="/img/stockphoto_2x.jpg 2x" alt="" width="400" height="264">
<figcaption>Denne generiske illustrasjonen tilfører ikke verdi til artikkelen, og fortjener ingen alternativ tekst.</figcaption>

</figure>




### Dårlig praksis: `alt`-attributtet mangler


```
<img src="w3c-logo.png">
```

Brukere av skjermlesere vil ikke være istand til å oppfatte innholdet dette bildet er ment å representere.



### Dårlig praksis: Den alternative teksten inneholder overflødige ord


```
<img src="w3c-logo.png" alt="W3C logo">
```

Dersom det er en logo med teksten &laquo;W3C&raquo;, er det tilstrekkelig å ha &laquo;W3C&raquo; som alternativ tekst. Det er ikke nødvendig å presisere at det er en logo.



### Dårlig praksis: Et dekorativt bilde har overflødig alternativ tekst


```
<a href="/next">
  Neste side <img src="arrow.svg" alt="Bilde av pil til høyre">
</a>
```

Ikonet er et rent dekorativt supplement til teksten, og en beskrivelse av ikonet oppleves derfor som støy.




### God praksis: Det tekstlige innholdet i et bilde gjengis presist


```
<img src="w3c-logo.png" alt="W3C">
```




### God praksis: Et dekorativt bilde har tom alternativ tekst

```
<a href="/next">
  Neste side <img src="arrow.svg" alt="">
</a>
```


***




## Lenker og knapper

I nettsider og webapplikasjoner med mye interaktivitet, kan det være krevende å skille mellom bruk av lenker og knapper. Du kommer langt ved å følge disse retningslinjene:

- Bruk lenker ([`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)) for å navigere til en ny [URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL).
- Bruk knapper ([`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)) til alt annet.

Retningslinjene ovenfor leder derimot til en ny problemstilling: Når er det ønskelig å navigere til en ny URL? Det kan være hjelpsomt å stille seg spørsmålene nedenfor: 

- Gir det mening å høyreklikke på elementet, og velge &laquo;Åpne i ny fane&raquo;? 
- Gir det mening å bokmerke den nye visningen?
- Gir det mening å bruke tilbake-knappen i nettleseren for å navigere til forrige visning?

Om du svarer &laquo;ja&raquo; på ett eller flere av spørsmålene, er det en sterk indikasjon på at du bør bruke en lenke.

<figure>

<img src="/img/lenke-knapp.svg" alt="Visning av en lenke og en knapp med standardutseende" width="296" height="56">
<figcaption>Lenker og knapper har ulik funksjon, og bør også se ulike ut.</figcaption>

</figure>


En knapp har et standardutseende som er avhengig av hvilken nettleser som benyttes, og det kreves derfor litt CSS-håndverk for å få en knapp til å se ut nøyaktig slik som du vil ha den. På grunn av dette, er det ikke uvanlig å se at andre elementer enn `<button>` i praksis brukes som knapper. Et [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)-element er vesentlig lettere å style, og kan gjøres interaktivt ved å legge til en [`onclick`-event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick).

En `<div>` med `onclick`-event er imidlertid ikke en fullgod erstatning for `<button>`, på grunn av følgende:

- En `<button>` kan nås når brukeren navigerer på et nettsted ved å bruke tastaturet.
- En `<button>` kan aktiveres ved å trykke på &laquo;space&raquo;-tasten.
- En `<button>` markeres med en egen stil når elementet har fokus
- En `<button>` har en implisitt semantikk som forteller at det er en knapp.

Alle de tre egenskapene ovenfor må være på plass for at nettsiden skal være tilgjengelig. Dersom det benyttes andre HTML-elementer enn `<button>`, må denne oppførselen derfor gjenskapes med supplerende kode.

Se også til at knapper og lenker inneholder korte og presise tekster, så det er tydelig for brukeren hva en knapp gjør, og hvor en lenke leder.




### Dårlig praksis: Knapp består av andre elementer enn `<button>`

```
<div onClick="() => slettBruker();">Slett bruker</div>
```

I dette tilfellet er `<div>` benyttet i stedet for `<button>`, og elementet har derfor ingen semantikk, det er ikke tilgjengelig via tastaturet, og det mangler en fokusstil.

Vær oppmerksom på at `onclick` og andre eventer som regel angis i separate javascript-filer, og er derfor ikke like enkle å avdekke via en kodeinspeksjon.



### Dårlig praksis: Lenke med lite beskrivende innhold

```
Klikk <a href="https://www.w3.org/">her</a> for å lære mer om HTML

```

Teksten &laquo;her&raquo; er lite beskrivende for hvor lenken ender.



### God praksis: Knapp er implementert med `<button>`

```
<button type="button">Slett bruker</button>
```



### God praksis: Lenke med en god lenketekst

```
<a href="https://www.w3.org/">Besøk W3C</a> for å lære mer om HTML
```


***




## Label og input


Alle interaktive kontroller i et skjema, som [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) og [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea), skal ha en tilhørende tekst som opplyser brukeren om hvilke data som skal legges inn. 

Det er ikke tilstrekkelig at teksten er visuelt i nærheten av kontrollen. Teksten må også være koblet til kontrollen programmatisk, for at blant annet skjermleser-brukere skal kunne oppfatte at de hører sammen. Dette gjøres ved hjelp av elementet [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).


<figure>

<img src="/img/etternavn-label-input.svg" alt="En tekstlie labelen Etternavn står rett ovenfor et input-felt " width="256" height="64">
<figcaption>Eksempel på en label ved siden av input-felt.</figcaption>

</figure>


Et `<label>`-element kan enten plasseres rundt en kontroll, eller referere til en kontrolls `id` ved å bruke `for`-attributtet. De to metodene er likeverdige.

Attributtet `placeholder` angir om det skal vises en tekst inne i en kontroll mens kontrollen ikke har noen verdi. Dette er ikke et alternativ til å bruke `<label>`. `placeholder`-attributtet kan faktisk by på så store utfordringer for brukere at det [alltid bør unngås](https://www.nngroup.com/articles/form-design-placeholders/).


<figure>

<img src="/img/etternavn-placeholder-input.svg" alt="Et input-felt har Etternavn som placeholder" width="256" height="32">
<figcaption>Eksempel på et input-felt med en placeholder. Når du begynner å skrive noe, forsvinner den.</figcaption>

</figure>



### Dårlig praksis: `<label>` mangler

```
<p>
  Etternavn 
  <input type="text">
</p>
```

&laquo;Etternavn&raquo; vises ved siden av input-feltet, men det er ingen programmatisk kobling mellom dem. 


### Dårlig praksis: `placeholder` brukes i stedet for `<label>`

```
<p>
  <input type="text" placeholder="Etternavn">
</p>
```

&laquo;Etternavn&raquo; er angitt ved hjelp av placeholder-attributtet, noe som ikke veier opp for at `<label>` mangler.


### God praksis: `<label>` plasseres rundt `<input>` og tekst

```
<p>
  <label>
    Etternavn 
    <input type="text">
  </label>
</p>
```

`<label>`-elementet plasseres rundt &laquo;Etternavn&raquo; og `<input>` for å assosiere dem til hverandre. 


### God praksis: `<label>` refererer til et `<input`-element 

```
<p>
  <label for="etternavn">Etternavn</label>
  <input type="text" id="etternavn">
</p>
```

Innholdet i `<label>` assosieres til input-feltet ved å bruke `for`-attributtet.




***





## Oppsummering

- Angi tekststørrelse og andre dimensjoner med relative enheter som `em`, `rem` og `%`.
- Legg til `alt`-attributter på alle bilder (`<img>`), og sørg for at bilder som ikke er dekorative har en god alternativ tekst.
- Bruk lenker `<a>` for å navigere til en ny URL, og knapper `<button>` til alt annet.
- Bruk `<label>`-elementer for å beskrive hver kontroll (`<input>`, `<select>`, `<textarea>`) i et skjema.

[&uarr; Hopp til starten av artikkelen](#top)
