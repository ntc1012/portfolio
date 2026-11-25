import { resolve } from 'node:path';
import { buildBlog } from './build-blog.mjs';
import { writeSiteConfig } from './site-config.mjs';
import { latestNotes } from './build-blog.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { buildResumePdfs } from './resume-pdf.mjs';

const root = resolve(import.meta.dirname, '..');
await writeSiteConfig(root);
await buildBlog(root);
const home = await readFile(resolve(root, 'index.html'), 'utf8');
await writeFile(resolve(root, 'index.html'), home.replace(/<!--notes:start-->[\s\S]*?<!--notes:end-->/, `<!--notes:start-->${await latestNotes()}<!--notes:end-->`));
if (process.argv.includes('--pdf')) await buildResumePdfs(root);
