import { copyFile, mkdir, readdir, cp } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
await mkdir(resolve(output, 'assets'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'resume.html', 'resume.css', 'project.css']) {
  await copyFile(resolve(root, file), resolve(output, file));
}
await cp(resolve(root, 'projects'), resolve(output, 'projects'), { recursive: true });
for (const file of await readdir(resolve(root, 'assets'))) {
  await copyFile(resolve(root, 'assets', file), resolve(output, 'assets', file));
}
console.log('Static site ready in dist/');
