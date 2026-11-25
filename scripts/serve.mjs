import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png' };
const publicFiles = new Set(['index.html', 'styles.css', 'script.js', 'resume.html', 'resume.css', 'project.css', 'projects/iam/index.html', 'projects/youtube-automation/index.html']);
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = pathname.endsWith('/') ? pathname.slice(1) + 'index.html' : pathname.slice(1);
    const file = resolve(root, relative);
    const isAsset = relative.startsWith('assets/') && file.startsWith(resolve(root, 'assets') + sep);
    if (!file.startsWith(root + sep) || (!publicFiles.has(relative) && !isAsset)) throw new Error('Not found');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
