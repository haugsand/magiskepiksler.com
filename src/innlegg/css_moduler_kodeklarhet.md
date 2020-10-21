---
title: CSS-moduler og kodeklarhet (DRAFT)
date: 2019-07-27
---
Manglende local scope i CSS blir ofte sett på som problematisk. Alle CSS-regler du skriver kan potensielt berøre flere DOM-elementer enn det du tenkte i utgangspunktet. Og motsatt, du har ikke kontroll på hvilken eksisterende CSS som påvirker DOM-elementet du jobber med.

Kan bruk av CSS-moduler gjøre jobben til utviklere enklere? I denne artikkelen ser jeg på hvordan CSS-moduler kan brukes sammen med React, og hvilke fordeler og ulemper dette fører med seg. 

## CSS-moduler

Kort om prinsippet bak CSS-moduler.

-  CSS skrives på vanlig måte i en CSS-fil. (Eksempel)
-  Filen importeres på en spesiell måte i React-komponenten. (Eksempel)
-  Klassenavnet får en styles-prefiks i JSX-koden. (Eksempek)
-  Når applikasjonen bygges genereres det prefiks og appendiks på klassenavnet. 

CSS-moduler er ikke en del av CSS-standarden, men er noe som diskuteres. (Finn kilde)

## Effekter

Det obskøne klassenavnet gjør det mindre sannsynlig at stilreglene skal påvirke andre DOM-elementer enn den spesifikke komponenten du jobber med. 

Komponenten arver derimot stil fra det omkransende DOM-elementet, for eksempel informasjon om farge, størrelse og font-face. Elementet vil ikke være isolert fra resten av HTML-dokumentet.

Dette er en bra ting. De fleste komponenter skal være sømløst integrert i resten av nettstedet, og se likedan ut. 

## Lokal scope

For de tilfellene hvor det er nødvendig å ha full kontroll på utseendet. Sosiale widgets, som Tweets, Instagram-innlegg og kommentarfelt?

Iframe har lenge vært en løsning, Nå holder webcomponents også på å modnes. I disse tilfellene er DOMen uavhengig av dokumentet komponenten er inkludert i. 

## Kodeklarhet

CSS modules løser ikke alle problemer, men er det noen ulemper med å ta det i bruk?

Kodeeksempel, vanlig: DOM, JSX, CSS.

Kodeeksempel, med CSS modules. DOM, JSX, CSS.

I det første eksempelet brukes det samme navn tre steder. I det siste eksempelet brukes tre forskjellige skrivemåter.

Under utvikling er nok ikke dette et stort problem, men ved eventuell debugging og videreutvikling trengs det ekstra mental kapasitet for å oversette mellom tre ulike notasjoner. Spesiell om en ny utvikler skal overta kodebasen. 

CSS modules er i tillegg et ekstra abstraksjonsnivå. 


## Avslutningsvis

Ved å bruke CSS-moduler er det mindre sannsynlig at CSS-reglene dine skal påvirke andre DOM-elementer, men hvor stort problem er dette i utgangspunktet?

CSS-moduler fjerner ikke behovet for å skrive strukturert CSS, og kodekonvensjoner som BEM bidrar til å minimere dette problemet. 

Lettlest og klar kode er viktigere enn den lille gevinsten du får ved å bruke CSS modules.