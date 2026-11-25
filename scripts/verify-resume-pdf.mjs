import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas';
import { resumeDocument } from './resume-document.mjs';

globalThis.DOMMatrix ??= DOMMatrix;
globalThis.ImageData ??= ImageData;
globalThis.Path2D ??= Path2D;
const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
const normalize = value => value.replace(/\s/gu, '').normalize('NFC').replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
const output = resolve(process.argv[2] || 'dist');
await mkdir('tmp/resume-qa', { recursive: true });
for (const language of ['en', 'vi']) {
  const pdf = await getDocument({ data: new Uint8Array(await readFile(resolve(output, `assets/resume-${language}.pdf`))), useSystemFonts: false }).promise;
  if (pdf.numPages !== 1) throw new Error(`${language}: expected one page, found ${pdf.numPages}`);
  const page = await pdf.getPage(1);
  const text = (await page.getTextContent()).items.map(item => item.str).join(' ');
  const { expected } = await resumeDocument(language);
  for (const paragraph of expected) {
    if (!normalize(text).includes(normalize(paragraph))) throw new Error(`${language}: PDF text differs from resume.html: ${paragraph.slice(0, 70)}`);
  }
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  await writeFile(`tmp/resume-qa/${language}.png`, canvas.toBuffer('image/png'));
  console.log(`${language}: one page, all résumé paragraphs present, PNG rendered`);
  await pdf.destroy();
}
