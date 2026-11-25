import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { GlobalFonts, convertSVGTextToPath } from '@napi-rs/canvas';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const directory = resolve(root, 'assets/brand');
await mkdir(directory, { recursive: true });
GlobalFonts.registerFromPath(resolve(root, 'assets/fonts/NotoSans.ttf'), 'NTCBrand');
const config = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
const esc = text => text.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]);
const avatarSource = await readFile(resolve(root, 'assets/avatar.svg'), 'utf8');
const avatar = avatarSource
  .replace(/<svg\b[^>]*>/, '<svg x="900" y="140" width="300" height="300" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" fill="none">');
const text = (x, y, size, value, fill = '#E3E0D6', weight = 400) => `<text x="${x}" y="${y}" font-family="NTCBrand" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(value)}</text>`;
const mark = (x, y, size, fill = '#E3E0D6') => text(x, y, size, 'ntc.', fill, 800).replace(' fill=', ` stroke="${fill}" stroke-width="${size * .025}" stroke-linejoin="round" fill=`);
async function save(name, svg, width, height) {
  const vector = convertSVGTextToPath(svg);
  await writeFile(resolve(directory, `${name}.svg`), vector);
  await sharp(vector).resize(width, height).png().toFile(resolve(directory, `${name}.png`));
}
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640"><rect width="1280" height="640" fill="#191B19"/>${mark(70, 110, 70)}${text(70, 270, 48, config.brand.name, '#E3E0D6', 600)}${text(70, 335, 28, 'Backend Developer', '#A9ABA8')}${text(70, 440, 28, config.brand.tagline.en)}${text(70, 520, 20, 'Python / Node.js / Identity & Automation', '#A9ABA8')}${avatar}</svg>`;
await save('github-social', social, 1280, 640);
const bannerAvatar = avatar.replace('x="900" y="140" width="300" height="300"', 'x="1190" y="36" width="300" height="300"');
await save('linkedin-banner', `<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396"><rect width="1584" height="396" fill="#191B19"/>${mark(70, 110, 65)}${text(350, 140, 45, config.brand.name, '#E3E0D6', 600)}${text(350, 195, 25, 'Backend Developer', '#A9ABA8')}${text(350, 260, 24, config.brand.tagline.en)}${bannerAvatar}</svg>`, 1584, 396);
await save('monogram-dark', `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="72" fill="#191B19"/>${mark(57, 325, 188)}</svg>`, 512, 512);
await save('monogram-light', `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="72" fill="#E3E0D6"/>${mark(57, 325, 188, '#191B19')}</svg>`, 512, 512);
await sharp(resolve(root, 'assets/avatar.svg')).resize(512, 512).png().toFile(resolve(directory, 'avatar.png'));
await writeFile(resolve(directory, 'identity.json'), JSON.stringify({ name: config.brand.name, monogram: 'ntc.', tagline: config.brand.tagline, colors: { carbon: '#191B19', navy: '#293846', olive: '#4D583C', moss: '#78816A', silver: '#A9ABA8', ivory: '#E3E0D6' } }, null, 2));
await writeFile(resolve(root, 'assets/social-card.svg'), convertSVGTextToPath(social));
await sharp(convertSVGTextToPath(social)).png().toFile(resolve(root, 'assets/social-card.png'));
console.log('Brand kit generated: avatar, monograms, LinkedIn banner and GitHub social preview');
