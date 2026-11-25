import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const root = resolve(import.meta.dirname, '..');
const source = await readFile(resolve(root, 'script.js'), 'utf8');
const html = await readFile(resolve(root, 'index.html'), 'utf8');

function page({ file = html, url = 'https://portfolio.example/', reducedMotion = false, stored = {} } = {}) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error));
  const dom = new JSDOM(file, { url, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole });
  dom.window.matchMedia = () => ({ matches: reducedMotion });
  dom.window.Element.prototype.animate = () => ({ finished: Promise.resolve() });
  for (const [key, value] of Object.entries(stored)) dom.window.localStorage.setItem(key, value);
  dom.window.eval(source);
  assert.deepEqual(errors, []);
  return dom;
}

test('English recruiter content is readable without JavaScript', () => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  assert.equal(doc.documentElement.lang, 'en');
  assert.match(doc.querySelector('h1').textContent, /Hi, I'm Cuong/);
  assert.equal(doc.querySelectorAll('[data-engineer]:not([hidden])').length, 0);
  assert.equal(doc.querySelectorAll('[data-view]').length, 2);
  assert.doesNotMatch(doc.body.textContent, /Collaborator/);
  dom.window.close();
});

test('Engineer perspective reveals all implementation notes and has a shareable URL', () => {
  const dom = page();
  const { document: doc } = dom.window;
  doc.querySelector('[data-view="engineer"]').click();
  assert.equal(dom.window.location.hash, '#engineer');
  assert.equal(doc.querySelectorAll('[data-engineer]:not([hidden])').length, 3);
  assert.equal(doc.querySelector('[data-view="engineer"]').getAttribute('aria-pressed'), 'true');
  assert.equal(doc.querySelector('[data-view="recruiter"]').getAttribute('aria-pressed'), 'false');
  assert.match(doc.getElementById('view-announcement').textContent, /Engineer/);
  doc.querySelector('[data-view="recruiter"]').click();
  assert.equal(doc.querySelectorAll('[data-engineer]:not([hidden])').length, 0);
  dom.window.close();
});

test('Vietnamese and English switches preserve the perspective and update résumé links', () => {
  const dom = page({ url: 'https://portfolio.example/#engineer' });
  const { document: doc } = dom.window;
  const originalCopy = new Map([...doc.querySelectorAll('[data-i18n]')].map(el => [el.dataset.i18n, el.textContent]));
  doc.querySelector('[data-language="vi"]').click();
  assert.equal(doc.documentElement.lang, 'vi');
  assert.equal(dom.window.location.search, '?lang=vi');
  assert.equal(dom.window.location.hash, '#engineer');
  assert.match(doc.querySelector('h1').textContent, /Chào bạn, mình là Cường/);
  assert.equal(doc.documentElement.dataset.view, 'engineer');
  assert.equal(doc.querySelectorAll('[data-engineer]:not([hidden])').length, 3);
  const resumeUrl = new URL(doc.querySelector('a[href^="resume.html"]').href);
  assert.equal(resumeUrl.searchParams.get('lang'), 'vi');
  assert.equal(resumeUrl.searchParams.get('view'), 'engineer');
  for (const el of doc.querySelectorAll('[data-i18n]')) {
    assert.notEqual(el.textContent, el.dataset.i18n, `Missing Vietnamese copy: ${el.dataset.i18n}`);
    if (!['nodeBackend', 'metadata'].includes(el.dataset.i18n)) {
      assert.notEqual(el.textContent, originalCopy.get(el.dataset.i18n), `Untranslated copy: ${el.dataset.i18n}`);
    }
  }
  doc.querySelector('[data-language="en"]').click();
  assert.equal(dom.window.location.search, '');
  assert.match(doc.querySelector('h1').textContent, /Hi, I'm Cuong/);
  assert.equal(dom.window.location.hash, '#engineer');
  dom.window.close();
});

test('Direct links and history restore language and perspective together', async () => {
  const dom = page({ url: 'https://portfolio.example/?lang=vi#engineer' });
  const doc = dom.window.document;
  assert.equal(doc.documentElement.lang, 'vi');
  assert.equal(doc.documentElement.dataset.view, 'engineer');
  doc.querySelector('[data-view="recruiter"]').click();
  const restored = new Promise(resolve => dom.window.addEventListener('popstate', resolve, { once: true }));
  dom.window.history.back();
  await restored;
  assert.equal(doc.documentElement.dataset.view, 'engineer');
  assert.equal(doc.documentElement.lang, 'vi');
  dom.window.close();
});

test('Theme labels follow language and stored preferences', () => {
  const dom = page({ stored: { 'ntc-theme': 'light' } });
  const doc = dom.window.document;
  assert.equal(doc.documentElement.dataset.theme, 'light');
  assert.equal(doc.querySelector('.theme-toggle').getAttribute('aria-label'), 'Switch to dark theme');
  doc.querySelector('[data-language="vi"]').click();
  assert.equal(doc.querySelector('.theme-toggle').getAttribute('aria-label'), 'Chuyển sang giao diện tối');
  doc.querySelector('.theme-toggle').click();
  assert.equal(doc.documentElement.dataset.theme, 'dark');
  assert.equal(dom.window.localStorage.getItem('ntc-theme'), 'dark');
  dom.window.close();
});

test('Reduced motion does not start the flow animation', () => {
  const dom = page({ reducedMotion: true });
  dom.window.document.querySelector('[data-avatar]').click();
  assert.equal(dom.window.document.querySelector('.identity-system').classList.contains('flow-playing'), false);
  dom.window.close();
});

test('Public résumé supports Vietnamese and printing without exposing private CV fields', async () => {
  const resume = await readFile(resolve(root, 'resume.html'), 'utf8');
  const dom = page({ file: resume, url: 'https://portfolio.example/resume.html?lang=vi' });
  const doc = dom.window.document;
  assert.equal(doc.documentElement.lang, 'vi');
  assert.match(doc.querySelector('h1').textContent, /Nguyễn Tiến Cường/);
  assert.equal(doc.querySelector('[data-home-link]').getAttribute('href'), './?lang=vi');
  let printed = false;
  dom.window.print = () => { printed = true; };
  doc.querySelector('[data-print]').click();
  assert.equal(printed, true);
  assert.doesNotMatch(doc.body.textContent, /DATE OF BIRTH|PHONE|ADDRESS/);
  assert.equal(doc.querySelectorAll('a[href^="tel:"]').length, 0);
  dom.window.close();
});

test('Local page resources and internal anchors exist', async () => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const ids = [...doc.querySelectorAll('[id]')].map(el => el.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const el of doc.querySelectorAll('[href],script[src],meta[property="og:image"]')) {
    const value = el.getAttribute('href') || el.getAttribute('src') || el.getAttribute('content');
    if (value.startsWith('#')) assert.ok(doc.getElementById(value.slice(1)), `Missing anchor ${value}`);
    else if (!/^(https?:|mailto:)/.test(value)) await access(resolve(root, value.replace(/^\//, '').split('?')[0]));
  }
  dom.window.close();
});

test('YouTube is attributed to RedOne Media while the other projects remain personal', async () => {
  const dom = page();
  const doc = dom.window.document;
  const labels = () => [...doc.querySelectorAll('.project-overline span:first-child')].map(el => el.textContent);
  assert.deepEqual(labels(), ['Personal project', 'RedOne Media project', 'Personal project']);
  assert.match(doc.querySelector('#youtube').textContent, /RedOne Media/);
  doc.querySelector('[data-language="vi"]').click();
  assert.deepEqual(labels(), ['Dự án cá nhân', 'Dự án tại RedOne Media', 'Dự án cá nhân']);
  dom.window.close();
  const resume = new JSDOM(await readFile(resolve(root, 'resume.html'), 'utf8'));
  assert.match(resume.window.document.querySelector('.resume-item').textContent, /YouTube Automation|FastAPI/);
  assert.equal(resume.window.document.querySelector('[data-i18n="resumeProjects"]').parentElement.querySelector('[data-i18n="resumeYoutube"]'), null);
  assert.match(resume.window.document.querySelector('[data-i18n="resumeProjects"]').textContent, /Personal projects/);
  resume.window.close();
});

for (const project of ['iam', 'youtube-automation']) {
  test(`${project} has its own metadata, Vietnamese content and context-preserving links`, async () => {
    const file = await readFile(resolve(root, 'projects', project, 'index.html'), 'utf8');
    const dom = page({ file, url: `https://portfolio.example/projects/${project}/?lang=vi&view=engineer` });
    const doc = dom.window.document;
    assert.equal(doc.documentElement.lang, 'vi');
    assert.equal(doc.documentElement.dataset.view, 'engineer');
    assert.match(doc.title, project === 'iam' ? /Dự án cá nhân/ : /RedOne Media/);
    assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
    assert.equal(doc.querySelector('meta[name="description"]').content, doc.body.dataset.descriptionVi);
    for (const el of doc.querySelectorAll('[data-i18n]')) {
      assert.notEqual(el.textContent, el.dataset.i18n, `Missing translation: ${el.dataset.i18n}`);
    }
    const homeUrl = new URL(doc.querySelector('.case-breadcrumb a').href);
    assert.equal(homeUrl.pathname, '/');
    assert.equal(homeUrl.hash, '#work');
    assert.equal(homeUrl.searchParams.get('lang'), 'vi');
    assert.equal(homeUrl.searchParams.get('view'), 'engineer');
    doc.querySelector('[data-language="en"]').click();
    assert.match(doc.title, project === 'iam' ? /Personal Project/ : /RedOne Media/);
    assert.equal(new URL(doc.querySelector('.case-breadcrumb a').href).searchParams.has('lang'), false);
    assert.notEqual(doc.title, 'Nguyen Tien Cuong — Backend Developer');
    dom.window.close();
  });
}

test('All published pages have working local resources and cross-page anchors', async () => {
  const files = ['index.html', 'resume.html', 'projects/iam/index.html', 'projects/youtube-automation/index.html'];
  for (const file of files) {
    const dom = new JSDOM(await readFile(resolve(root, file), 'utf8'), { url: `https://portfolio.example/${file}` });
    for (const el of dom.window.document.querySelectorAll('a[href],link[href],script[src],img[src],meta[property="og:image"]')) {
      const raw = el.getAttribute('href') || el.getAttribute('src') || el.getAttribute('content');
      const url = new URL(raw, dom.window.location.href);
      if (url.origin !== 'https://portfolio.example') continue;
      const target = resolve(root, (url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname).slice(1));
      await access(target);
      if (url.hash && target.endsWith('.html')) {
        const destination = new JSDOM(await readFile(target, 'utf8'));
        assert.ok(destination.window.document.getElementById(url.hash.slice(1)), `${file}: missing ${raw}`);
        destination.window.close();
      }
    }
    dom.window.close();
  }
});

test('Avatar interaction respects reduced motion', () => {
  const dom = page({ reducedMotion: true });
  let animations = 0;
  dom.window.Element.prototype.animate = () => { animations++; };
  const avatar = dom.window.document.querySelector('[data-avatar]');
  assert.equal(avatar.hidden, false);
  avatar.click();
  assert.equal(animations, 0);
  dom.window.close();
});
