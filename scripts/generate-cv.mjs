/**
 * Generates a minimal placeholder PDF at public/cv/Sarah-Williams-CV.pdf.
 *
 * Why: the Navbar's "Download CV" link should work on the very first run.
 * Replace this file with your real CV at public/cv/Sarah-Williams-CV.pdf
 * (or point profile.cvUrl in src/data/profile.ts at your own file) — and
 * then you can delete this script and the `assets:generate` npm script.
 *
 * Run manually with: npm run assets:generate
 * (prebuild also runs it automatically when the CV is missing)
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'public', 'cv');
const outFile = join(outDir, 'Sarah-Williams-CV.pdf');

if (existsSync(outFile)) {
  console.log('CV already exists — skipping placeholder generation.');
  process.exit(0);
}

// A tiny but valid one-page PDF, hand-assembled (no dependency needed).
const lines = [
  'Sarah Williams - Registered Nurse (Portfolio Demo)',
  'Critical Care & Emergency Nursing - Melbourne, Australia',
  'This is a placeholder CV for the demo portfolio.',
  'Replace public/cv/Sarah-Williams-CV.pdf with your real CV.',
];

const textLines = lines
  .map((line, index) => `BT /F1 12 Tf 50 ${760 - index * 20} Td (${line}) Tj ET`)
  .join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  `<< /Length ${textLines.length} >>\nstream\n${textLines}\nendstream`,
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, index) => {
  offsets.push(pdf.length);
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((offset) => {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, pdf, 'binary');
console.log('Placeholder CV written to public/cv/Sarah-Williams-CV.pdf');
