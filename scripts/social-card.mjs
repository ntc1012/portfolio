import sharp from 'sharp';
import { resolve } from 'node:path';

const assets = resolve(import.meta.dirname, '../assets');
await sharp(resolve(assets, 'social-card.svg')).png().toFile(resolve(assets, 'social-card.png'));
console.log('Social card generated: 1200 × 630 PNG');
