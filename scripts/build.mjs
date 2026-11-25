import { copyFile, mkdir, cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildBlog } from './build-blog.mjs';
import { latestNotes } from './build-blog.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { writeSiteConfig } from './site-config.mjs';
import { buildResumePdfs } from './resume-pdf.mjs';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
await mkdir(resolve(output, 'assets'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'resume.html', 'resume.css', 'project.css', 'features.css', 'blog.css', 'analytics.js', 'sandbox.js']) {
  await copyFile(resolve(root, file), resolve(output, file));
}
await cp(resolve(root, 'projects'), resolve(output, 'projects'), { recursive: true });
await cp(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });
await mkdir(resolve(output, 'lib/iam-policy/src'), { recursive: true });
await copyFile(resolve(root, 'lib/iam-policy/src/index.mjs'), resolve(output, 'lib/iam-policy/src/index.mjs'));
await writeSiteConfig(output);
await buildBlog(output);
const home = await readFile(resolve(output, 'index.html'), 'utf8');
await writeFile(resolve(output, 'index.html'), home.replace(/<!--notes:start-->[\s\S]*?<!--notes:end-->/, `<!--notes:start-->${await latestNotes()}<!--notes:end-->`));
await buildResumePdfs(output);
for (const language of ['en', 'vi']) await copyFile(resolve(output, `assets/resume-${language}.pdf`), resolve(root, `assets/resume-${language}.pdf`));
console.log('Static site ready in dist/');
