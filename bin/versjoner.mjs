// Legger en innholdshash på CSS- og JS-adressene i den ferdig bygde HTML-en.
// Erstatter styleVersion og javascriptVersion, som måtte økes for hånd og
// derfor ble glemt — blant annet i commit 122cf04, der en endring i _mp.css
// ble liggende bak en uendret versjon.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';

const hash = (fil) =>
  createHash('sha256').update(readFileSync(join(dist, fil))).digest('hex').slice(0, 8);

const eiendeler = [
  { sti: '/css/index.css', fil: 'css/index.css' },
  { sti: '/js/script.js', fil: 'js/script.js' },
];

const filer = [];
(function samle(kat) {
  for (const navn of readdirSync(kat)) {
    const full = join(kat, navn);
    if (statSync(full).isDirectory()) samle(full);
    else if (full.endsWith('.html')) filer.push(full);
  }
})(dist);

let totalt = 0;
for (const { sti, fil } of eiendeler) {
  const v = hash(fil);
  for (const html of filer) {
    const før = readFileSync(html, 'utf8');
    const etter = før.split(`"${sti}"`).join(`"${sti}?v=${v}"`);
    if (etter !== før) {
      writeFileSync(html, etter);
      totalt++;
    }
  }
}

// Uten hash ville _headers gitt filene et års immutable caching på en
// adresse som aldri endrer seg. Da er det bedre å stoppe bygget.
if (totalt === 0) {
  console.error('versjoner: fant ingen adresser å versjonere — stopper.');
  process.exit(1);
}
console.log(`versjoner: ${totalt} referanser oppdatert`);
