---
title: UU - Focus
date: 2020-12-31
---

Test





## Fokus-stil


Og apropos tastaturnavigasjon og fokus: Ikke fjern `:focus`-stilen på lenker og knapper fullstending, for da er det faktisk ikke mulig å se hvilket element som er i fokus. Eksperimenter heller med andre visuelle virkemidler, dersom du synes at standardstilen ikke harmonerer med resten av designet.

<figure>

<img src="/img/footer-focus.svg" alt="En liste med lenker hvor den ene er i fokus" width="296" height="56">
<figcaption>Det er lett å se at &laquo;Sidekart&raquo; har tastaturfokus.</figcaption>

</figure>


### Dårlig praksis: `:focus`-stil skjules

```
*:focus {
  outline: none;
}
```

> TODO: Beskrivelse

