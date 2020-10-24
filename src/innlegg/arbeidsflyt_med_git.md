---
title: Arbeidsflyt med Git
date: 2020-10-20
---

Dette nettstedet er tenkt å være min egen lille sandkasse. Her skal være lav terskel for å skrive nytt innhold, og det må samtidig være raskt og enkelt å rulle ut endringer og publisere nye innlegg. Nedenfor følger en kort beskrivelse over hvordan jeg har oppnådd dette ved aktiv bruk av Git og Github.


## Behov og prinsipper

Siden det skal være lav terskel for å skrive nytt innhold, må siste versjon av alt innhold være tilgjengelig fra alle enheter, til enhver tid. Det betyr i praksis at alle endringer commites og pushes til Git.

Jeg vil gjerne jobbe med flere ideer til fremtidige innlegg samtidig, uten at dette medfører ekstra bokholderi. Alle upubliserte innlegg er derfor samlet i en felles Git-branch, og jeg forholder meg til ulike to brancher:


- En master-branch med produksjonsklart innhold som publiseres til magiskepiksler.com.
- En dev-branch med ideer og utkast som er tilgjengelig på et subdomene.

Endringer i design og tidligere publiserte innlegg gjøres direkte på master-branchen.



## Arbeid med utkast til innlegg


Jeg starter med å bytte til dev-branchen.

    git checkout dev


Eventuelle endringer i design eller innhold hentes fra master-branchen, og merges inn.

    git merge master


Jeg oppretter et nytt innlegg, og starter å skrive.

    touch src/innlegg/arbeidsflyt_med_git.md


Om jeg ikke fullfører innlegget på en gang, commiter jeg endringene, og pusher til Github.

    git commit -am "Arbeidsflyt med Git, førsteutkast"
    git push


På dev-branchen redigerer jeg utelukkende filer som ikke finnes på master-branchen. Da slipper jeg konflikter ved merging.


## Publisere nytt innlegg

Når et innlegg er klar for publisering, bytter jeg til master-branchen.

    git checkout master


Jeg velger deretter hvilken fil som skal publiseres, [ved å hente en spesifikk fil fra dev-branchen](https://jasonrudolph.com/blog/2009/02/25/git-tip-how-to-merge-specific-files-from-another-branch/).

    git checkout dev src/innlegg/arbeidsflyt_med_git.md


Jeg commiter og pusher, og etter noen få minutter er innlegget tilgjengelig på magiskepiksler.com

    git commit -am "Arbeidsflyt med Git, publisert"
    git push


