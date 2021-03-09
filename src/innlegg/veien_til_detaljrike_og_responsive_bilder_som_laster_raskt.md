---
title: Veien til detaljrike og responsive bilder som laster raskt
date: 2021-02-22
---

La oss si at vi har et fotografi som inngår i en artikkel som publiseres på nett. Da er det er viktig at fotografiet ser eksemplarisk ut, uavhengig av hvilken enhet brukerne benytter til å lese artikkelen.

I denne artikkelen går jeg gjennom hvilken HTML- og CSS-kode du må skrive for å oppnå både _detaljrike_ og _responsive bilder_, som i tillegg _laster raskt_. Artikkelen er delt inn i følgende steg: 

- [Legg inn bildet](#legg-inn-bildet), og unngå at layouten hopper når bildet lastes.
- [Gjør bildet responsivt](#gjør-bildet-responsivt), så det tilpasses ulike skjermstørrelser.
- [Legg til en versjon med høy oppløsning](#legg-til-en-versjon-med-høy-oppløsning), så bildet ser ekstra skarpt ut på gode skjermer.
- [Lever ulike bilder til ulike oppløsninger](#lever-ulike-bilder-til-ulike-oppløsninger), for å frem detaljene selv på små skjermer.
- [Reduser bildets filstørrelse](#reduser-bildets-filstørrelse), så det laster raskt.
- [Vær trygg på nettleserstøtte](#vær-trygg-på-nettleserstøtte), for å unngå ubehagelige overraskelser.

Du kan også hoppe rett til [oppsummeringen](#oppsummering), for å få en kortfattet oversikt.

Det er laget en egen <a href="/eksempler/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt.html" target="_blank" rel="noopener">side med eksempler</a> som du kan følge mens du leser artikkelen.



***




## Legg inn bildet

I denne artikkelen vil vi bruke et fotografi tatt av [Timur Romanov](https://unsplash.com/@timromanov), hentet fra [Unsplash](https://unsplash.com/).


<figure>

<img src="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/horse_540.jpg" srcset="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/horse_1080.jpg 2x" alt="Et bilde av en hest som spiser gress" width="540" height="360">
<figcaption>Dette bildet vil vi bruke som et eksempel gjennom hele artikkelen.</figcaption>

</figure>


Første steg er å sette inn bildet ved å bruke [`<img>`](https://developer.mozilla.org/en-us/docs/Web/HTML/Element/img)-elementet. For å gjøre eksempelet enklere, sier vi at dette bildet er dekorativt, og setter den alternative teksten til en tom streng.

Siden vi kommer til å jobbe med det samme bildet i flere størrelser, legger jeg til bildebredden i piksler (1080) som en del av filnavnet.


```
<img src="horse_1080.jpg" alt="">
```

<a href="/eksempler/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt.html#eksempel-1" class="blocklink" target="_blank" rel="noopener">Eksempel 1</a>


Kodesnutten ovenfor er enkel, og antageligvis velkjent, men den har en svakhet. Når bildet lastes ned, vil du oppleve at [nettsidens layout hopper](https://web.dev/optimize-cls/).

<figure>

<img src="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/layout-hopp.svg" width="240" height="240" alt="En animasjon som visualiserer at nettsidens layout hopper når bildet lastes.">

<figcaption>Layouten hopper når bildet lastes.</figcaption>

</figure>


Nettleseren kjenner til bildets dimensjoner først _etter at det er lastet ned_. og vil frem til da ikke kunne reservere plass til det. 

For å unngå dette, kan du angi bildets dimensjoner ved å legge til attributtene `width` og `height`. Da vet nettleseren på forhånd hvor stort bildet er, og reserverer nødvendig plass.


```
<img src="horse_1080.jpg" width="1080" height="720" alt="">
```

<a href="/eksempler/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt.html#eksempel-2" class="blocklink" class="blocklink" target="_blank" rel="noopener">Eksempel 2</a>




***




## Gjør bildet responsivt


Akkurat nå har bildet en fast bredde. Vi ønsker at bildet skal være responsivt, og krympe dersom nettleserbredden er _smalere_ enn den opprinnelige bildestørrelsen. 

Vi løser dette ved å legge til CSS-deklarasjonen `max-width: 100%;`, som forteller at bildet ikke skal ta opp mer horisontal plass enn det som til enhver tid er tilgjengelig.

Vi må også legge til `height: auto;`, for at bildet skal bevare sine proporsjoner når bredden reduseres. Dette gjør vi for å _overstyre_ den høyden vi satte i sted ved hjelp av `height`-attributtet. 


```
img {
  max-width: 100%; 
  height: auto;
}
```

Denne kodesnutten med CSS sørger for at bildet blir responsivt, men introduserer samtidig det problemet vi hadde tidligere: Layouten hopper når bildet lastes, fordi `height: auto;` overstyrer `height="720"` når nettleserbredden er smalere enn bildets opprinnelige bredde. 

<p class="p-info">
Les artikkelen <a href="https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/">Setting Height And Width On Images Is Important Again</a> for å få en mer utfyllende forklaring på hva som skjer her. 
</p>


For å unngå at layouten hopper i disse tilfellene, kan vi benytte den [relativt ferske](https://web.dev/aspect-ratio/) CSS-egenskapen [`aspect-ratio`](https://developer.mozilla.org/en-us/docs/Web/CSS/aspect-ratio) for å angi _størrelsesforholdet_ mellom bildets bredde og høyde. Da klarer nettleseren å beregne hvor stor vertikal plass bildet kommer til å oppta, selv før bildefilen er lastet.  


```
img {
  max-width: 100%; 
  height: auto;
  aspect-ratio: 3 / 2; 
}
```

<a href="/eksempler/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt.html#eksempel-3" class="blocklink" target="_blank" rel="noopener">Eksempel 3</a>


<p class="p-info">
<a href="https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping">Moderne nettlesere kalkulerer aspect-ratio automatisk</a>, dersom attributtene height og width er satt.
</p>



***




## Legg til en versjon med høy oppløsning

CSS-pikselen (`px`) er en [absolutt enhet](https://www.w3.org/TR/css-values-3/#absolute-lengths) som er forankret i en fysisk størrelse. Om du leser en skjerm på en armlengdes avstand, er `1px` definert til å være omtrent 0,26 millimeter (1/96 tomme).

Høyoppløselige skjermer består av fysiske piksler som er vesentlig mindre enn dette. En mobiltelefon har gjerne en oppløsning bestående av `1440x2560` fysiske piksler, som tilsvarer `360x640` CSS-piksler. Skjermen viser altså 16 (`4x4`) piksler for hver CSS-piksel du forholder deg til i nettleseren. 

<p class="p-info">
  Les mer om <a href="https://hacks.mozilla.org/2013/09/css-length-explained/">CSS-piksler, pikseltetthet og fysiske størrelser</a>.
</p>

<figure>

<img src="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/retina.jpg" width="540" height="360" alt="Illustrasjon som visualiserer forskjellen mellom ordinære og høyoppløselige bilder.">

<figcaption>Bildet til høyre ser vesentlig skapere ut enn det til venstre.</figcaption>

</figure>

Vi ønsker å utnytte hver eneste fysiske skjermpiksel til høyoppløselige skjermer, slik at bildene fremstår som _ekstra skarpe_. 

HTML-attributten [`srcset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset), som legges til `<img>`-elementet, lar deg angi _alternative bildefiler_. Du angir adressen til en bildefil og et (frivillig) kriterium som gir et hint om når denne bildefilen skal brukes. Det er mulig å angi flere bildefiler i samme `srcset`-attributt, separert av komma.

I vårt tilfelle legger vi til `srcset="horse_2160.jpg 2x"`, som forteller at `horse_2160.jpg` har dobbel så høy pikseltetthet som det opprinnelige bildet. Nettleseren vil da automatisk velge å benytte den bildefilen som samsvarer best med skjermens fysiske oppløsning.


```
<img src="horse_1080.jpg" srcset="horse_2160.jpg 2x" 
  width="1080" height="720" alt="">
```

<a href="/eksempler/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt.html#eksempel-4" class="blocklink" target="_blank" rel="noopener">Eksempel 4</a>



<p class="p-info">
  Det er støtte for andre kriterier enn pikseltetthet (x) i srcset. Bredde (w) kan også brukes, gjerne i tospann med <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes">sizes-attributtet</a>.
</p>



***




## Lever ulike bilder til ulike oppløsninger

Vi har tidligere valgt at bildet skal være responsivt og tilpasses etter nettleserbredden. Dette fører naturlig nok til at bildet blir temmelig lite på små skjermer. 

<figure>

<img src="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/horse_270.jpg" srcset="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/horse_540.jpg 2x" alt="En liten versjon av bildet av en hest som spiser gress" width="270" height="180">
<figcaption>Når bildet forminskes, forminskes også hesten.</figcaption>

</figure>

Bildet blir faktisk så lite at hovedmotivet vårt, _hesten_, forsvinner litt. I dette tilfellet kan det passe bedre å kun vise et utsnitt av det opprinnelige motivet, slik at vi ser mer hest, og mindre skog og eng.

<figure>

<img src="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/horse_small_270.jpg" srcset="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/horse_small_540.jpg 2x" alt="Et zoomet inn bilde av en hest som spiser gress" width="270" height="180">
<figcaption>Dersom vi endrer utsnittet, blir hesten tydeligere.</figcaption>

</figure>

Dette kan vi oppnå ved innføre to HTML-elementer:

- [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source) for å angi alternative bildefiler.
- [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) for å gruppere `<img>`- og `<source>`-elementer som hører sammen. 

Ved første øyekast, minner dette litt om å bruke `<img>` kombinert med `srcset`. Grunnen til at vi heller bruker `<picture>` og `<source>`, er at `<source>`-elementet har støtte for [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries), slik at vi kan levere ulike bilder til ulike oppløsninger.

Bruk `srcset` for å angi én eller flere bildefiler, og `media` for å legge til et media query. I eksempelet nedenfor vil `horse_small.jpg` brukes dersom nettleserbredden er `540px` eller mindre. Hvis dette kriteriet ikke er sant, vil standardvalget `horse.jpg` brukes.

```
<picture>
  <source srcset="horse_small_540.jpg, horse_small_1080.jpg 2x" 
    media="(max-width: 540px)">
  <img src="horse_1080.jpg" srcset="horse_2160.jpg 2x" 
    width="1080" height="720" alt="">
</picture>
```

<a href="/eksempler/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt.html#eksempel-5" class="blocklink" target="_blank" rel="noopener">Eksempel 5</a>

 Det er et krav om at `<picture>` skal inneholde _nøyaktig ett_  `<img>`-element. Vær også oppmerksom på at attributtene `width`, `height`, `alt` og `src` kun skal angis på `<img>`-elementet, og ikke på noen av `<source>`-elementene.



***




## Reduser bildets filstørrelse

Ytelse er en sentral del av brukeropplevelsen. Vi vil at det skal gå _kortest mulig tid_ fra en nettside åpnes, til den er ferdiglastet og klar for interaksjon fra brukeren. Dette er i utgangspunktet et primitivt regnestykke: Hver kilobyte som må lastes ned, behandles og tegnes av nettleseren, påvirker ytelsen negativt. 

Bilder utgjør en vesentlig del av _nettsiders tyngde_, og vi bør gjøre det vi kan for å redusere filstørrelsen på dem. I følge HTTP Archive sin [rapport om nettsidetyngde](https://httparchive.org/reports/page-weight), veier en gjennomsnittlig nettside `2038,4 kB`, der `948,1 kB` av dem er bilder.


[JPEG](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#jpeg) er det mest brukte filformatet for å vise fotografier på web. En høykvalitets JPEG-fil tar mye diskplass, men heldigvis kan du vanligvis redusere kvaliteten flere hakk, uten at det går utover brukeropplevelsen. 

Under skrivingen av denne artikkelen brukte jeg webapplikasjonen [Squoosh](https://squoosh.app/) til redusere filstørrelsen til alle bilder. Fotografiet som er inkludert i [første kapittel](#legg-inn-bildet) hadde i utgangspunktet en filstørrelse på `1 300 kB`. Etter å ha brukt Squoosh, uten å justere standardinnstillingene, ble filstørrelsen redusert med **89 %** til `148 kB`. 


<figure>

<img src="/img/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt/squoosh-logo.svg"  alt="" width="80" height="80">
<figcaption>Komprimer bilder med <a href="https://squoosh.app/">Squoosh</a>.</figcaption>

</figure>

Filstørrelsen kan reduseres ytterligere, om vi bruker filformater med mer effektive komprimeringsalgoritmer. [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp_image) og [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image) er de mest aktuelle alternativene til JPEG for bruk i fotografier. 

Jake Archibald har gjort en grundig sammenligning av [bildekvalitet og filstørrelse for JPEG, WebP og AVIF](https://jakearchibald.com/2020/avif-has-landed/) . Som en tommelfingerregel kan vi si at en AVIF-fil er _halvparten så stor_ som en JPEG-fil med tilsvarende bildekvalitet. Størrelsen på en WebP-fil ligger omtrent midt mellom AVIF og JPEG. 

Ved å bruke `<picture>` og `<source>` kan vi levere alternative bildeformater til nettleserne som støtter dem, ved å bruke et `type`-attributt. Dersom vi vil tilby bilder på AVIF-format i tillegg til JPEG-format, legger vi til ekstra `<source>`-elementer med `type="image/avif"`, i tillegg til de attributtene vi lærte om tidligere.

Vi har også et annet triks på lur, &laquo;[lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)&raquo;, som vil si at et bilde ikke lastes ned før det er nødvendig. Dette gjøres ved å legge til et [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)-attributt med verdien `"lazy"` på `<img>`-elementet.


```
<picture>
  <source srcset="horse_small_540.avif, horse_small_1080.avif 2x" 
    type="image/avif" media="(max-width: 540px)">
  <source srcset="horse_1080.avif, horse_2160.avif 2x" 
    type="image/avif">
  <source srcset="horse_small_540.jpg, horse_small_1080.jpg 2x" 
    media="(max-width: 540px)">
  <img src="horse_1080.jpg" srcset="horse_2160.jpg 2x" 
    width="1080" height="720" loading="lazy" alt="">
</picture>
```

<a href="/eksempler/veien_til_detaljrike_og_responsive_bilder_som_laster_raskt.html#eksempel-6" class="blocklink" target="_blank" rel="noopener">Eksempel 6</a>


***




## Vær trygg på nettleserstøtte

Flere av de teknikkene som brukes i denne artikkelen er relativt nye. Bildeformatet AVIF ble for eksempel implementert i Google Chrome i august 2020, mens støtte for `aspect-ratio` kom først i januar 2021.

Det du imidlertid kan være trygg på, er at det vil vises et bilde av en hest i alle grafiske nettlesere. Kodeeksempelet vi har bygd opp stein for stein så langt, følger prinsippet &laquo;[progressive enhancement](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)&raquo;. Vi gir alle brukere en god opplevelse i bunn, og tilbyr noe ekstra til de nettlesere som har støtte for det.

Dersom du bruker en eldre nettleser uten AVIF-støtte, vil du for eksempel få servert en JPEG-fil. Dette bildet tar litt lenger tid å laste ned, men brukeropplevelsen er fortsatt god.

Nedenfor følger en liste med lenker til nettstedet [caniuse.com](https://caniuse.com/), hvor du kan se hvor god nettleserstøtte det er for de teknikkene som er brukt i denne artikkelen: 

- [CSS property: aspect-ratio](https://caniuse.com/mdn-css_properties_aspect-ratio)
- [Aspect ratio computed from width and height attributes](https://caniuse.com/mdn-html_elements_img_aspect_ratio_computed_from_attributes)
- [Picture element](https://caniuse.com/picture)
- [Lazy loading via attribute for images & iframes](https://caniuse.com/loading-lazy-attr)
- [AVIF image format](https://caniuse.com/avif)
- [WebP image format](https://caniuse.com/webp)




***




## Oppsummering

Om dere ønsker et detaljrikt og responsivt bilde som laster raskt, kan dere følge denne oppskriften:

- Legg inn bildet ved hjelp av  `<img src="..." alt="...">`. 
- Legg til attributtene `width` og `height`, så nettleseren vet nøyaktig hvor mye plass som skal reserveres. 
- Legg til CSS-deklarasjonene `max-width: 100%;` og `height: auto;`, for å gjøre bildet responsivt.
- Legg til CSS-egenskapen `aspect-ratio`, så nettleseren på forhånd vet bildets høyde når det skaleres.
- Bruk `srcset`-attrbutten til å levere høyoppløselige varianter av bildet til høyoppløselige skjermer.
- Bruk `<picture>` og `<source>` til å levere ulike bilder, avhengig av brukerens skjermstørrelse.
- Reduser bildets filstørrelse ved å bruke [Squoosh](https://squoosh.app/).
- Bruk `<source>` med et `media`-attributt for å tilby bildeformater med enda lavere filstørrelser.
- Legg til `loading="lazy"` så bildet ikke lastes før det er nødvendig.



[&uarr; Hopp til starten av artikkelen](#top)


