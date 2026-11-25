import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { Marked } from 'marked';

const root = resolve(import.meta.dirname, '..');
const escape = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const markdown = new Marked({
  renderer: { html: ({ text }) => escape(text) },
  walkTokens(token) { if (['link', 'image'].includes(token.type) && /^\s*(javascript|data|vbscript):/i.test(token.href)) throw new Error('Unsafe Markdown URL'); }
});

export async function readPosts() {
  const posts = new Map();
  for (const filename of (await readdir(resolve(root, 'content/posts'))).sort()) {
    const match = filename.match(/^([a-z0-9-]+)\.(en|vi)\.md$/);
    if (!match) continue;
    const source = await readFile(resolve(root, 'content/posts', filename), 'utf8');
    const content = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!content) throw new Error(`Missing JSON frontmatter in ${filename}`);
    const meta = JSON.parse(content[1]);
    if (meta.slug !== match[1] || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug)
      || !meta.title || !meta.description || !/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || !Array.isArray(meta.tags)) throw new Error(`Invalid post metadata: ${filename}`);
    const entry = posts.get(meta.slug) || {};
    entry[match[2]] = { ...meta, html: markdown.parse(content[2]) };
    posts.set(meta.slug, entry);
  }
  for (const [slug, post] of posts) if (!post.en || !post.vi) throw new Error(`Both languages required: ${slug}`);
  return [...posts.values()].sort((a, b) => b.en.date.localeCompare(a.en.date) || a.en.slug.localeCompare(b.en.slug));
}

function card(post, prefix) {
  return `<article class="note-card"><small>${escape(post.en.date)} · ${escape(post.en.tags.join(' / '))}</small><h3><span data-blog-language="en">${escape(post.en.title)}</span><span data-blog-language="vi" hidden>${escape(post.vi.title)}</span></h3><p><span data-blog-language="en">${escape(post.en.description)}</span><span data-blog-language="vi" hidden>${escape(post.vi.description)}</span></p><a class="text-link" href="${prefix}${post.en.slug}/"><span data-blog-language="en">Read the note</span><span data-blog-language="vi" hidden>Đọc ghi chép</span></a></article>`;
}

export async function latestNotes() { return (await readPosts()).slice(0, 3).map(post => card(post, 'blog/')).join('\n'); }

export async function buildBlog(output = root) {
  const posts = await readPosts();
  const source = new JSDOM(await readFile(resolve(root, 'index.html'), 'utf8'));
  const fontLinks = [...source.window.document.querySelectorAll('link')].filter(el => /fonts\.(googleapis|gstatic)\.com/.test(el.href)).map(el => el.outerHTML).join('');
  function header(prefix) {
    const node = source.window.document.querySelector('.site-header').cloneNode(true);
    node.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      a.setAttribute('href', href === '#top' ? prefix : href.startsWith('#') ? prefix + href : prefix + href);
    });
    return node.outerHTML;
  }
  function shell({ title, viTitle, description, viDescription, prefix, main }) {
    return `<!doctype html><html lang="en" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark light"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta property="og:type" content="article"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:image" content="/assets/social-card.png"><link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">${fontLinks}<link rel="stylesheet" href="${prefix}styles.css"><link rel="stylesheet" href="${prefix}features.css"><link rel="stylesheet" href="${prefix}blog.css"><script src="${prefix}site-config.js" defer></script><script src="${prefix}analytics.js" defer></script><script src="${prefix}script.js" defer></script></head><body class="blog-page" data-title-vi="${escape(viTitle)}" data-description-vi="${escape(viDescription)}"><a class="skip-link" href="#main" data-i18n="skip">Skip to content</a>${header(prefix)}<main class="wrap blog-main" id="main">${main}</main><footer class="site-footer wrap"><a class="monogram" href="${prefix}">ntc<span>.</span></a><p>© <span id="year">2026</span> Nguyen Tien Cuong</p><button type="button" class="analytics-toggle" data-analytics-toggle hidden></button></footer></body></html>`;
  }
  const listing = `<p class="eyebrow" data-i18n="notesEyebrow">Technical notes</p><h1 data-i18n="notesTitle">Notes from the work.</h1><p class="blog-intro" data-i18n="notesIntro">Short reflections on identity systems, APIs and evidence-driven development.</p><div class="notes-grid">${posts.map(post => card(post, '')).join('')}</div>`;
  await mkdir(resolve(output, 'blog'), { recursive: true });
  await writeFile(resolve(output, 'blog/index.html'), shell({ title: 'Technical Notes — Nguyen Tien Cuong', viTitle: 'Ghi chép kỹ thuật — Nguyễn Tiến Cường', description: 'Notes on IAM, APIs and AI-assisted development.', viDescription: 'Ghi chép về IAM, API và phát triển phần mềm có AI hỗ trợ.', prefix: '../', main: listing }));
  for (const post of posts) {
    const main = `<nav class="blog-breadcrumb"><a href="../" data-i18n="backNotes">All notes</a></nav><header class="blog-heading"><p class="eyebrow">${escape(post.en.date)} · Nguyen Tien Cuong</p><h1><span data-blog-language="en">${escape(post.en.title)}</span><span data-blog-language="vi" hidden>${escape(post.vi.title)}</span></h1><p class="blog-intro"><span data-blog-language="en">${escape(post.en.description)}</span><span data-blog-language="vi" hidden>${escape(post.vi.description)}</span></p></header><article class="blog-prose"><div data-blog-language="en">${post.en.html}</div><div data-blog-language="vi" hidden>${post.vi.html}</div></article><a class="text-link" href="../" data-i18n="backNotes">All notes</a>`;
    await mkdir(resolve(output, 'blog', post.en.slug), { recursive: true });
    await writeFile(resolve(output, 'blog', post.en.slug, 'index.html'), shell({ title: `${post.en.title} — Nguyen Tien Cuong`, viTitle: `${post.vi.title} — Nguyễn Tiến Cường`, description: post.en.description, viDescription: post.vi.description, prefix: '../../', main }));
  }
  source.window.close();
  console.log(`Built ${posts.length} bilingual technical notes`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildBlog(resolve(process.argv[2] || root));
