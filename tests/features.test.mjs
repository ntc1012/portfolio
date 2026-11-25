import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { mountSandbox } from '../sandbox.js';
import { readPosts } from '../scripts/build-blog.mjs';
import { resumeDocument } from '../scripts/resume-document.mjs';

const root = resolve(import.meta.dirname, '..');
const script = await readFile(resolve(root, 'script.js'), 'utf8');
function domFor(html, url = 'https://portfolio.example/') {
  const dom = new JSDOM(html, { url, runScripts: 'outside-only', pretendToBeVisual: true });
  dom.window.matchMedia = () => ({ matches: true });
  return dom;
}

test('sandbox changes actual decisions, records attempts, localizes and resets independently', async () => {
  const dom = domFor(await readFile(resolve(root, 'projects/iam/index.html'), 'utf8'));
  const doc = dom.window.document;
  const sandbox = doc.querySelector('[data-iam-sandbox]');
  mountSandbox(sandbox, doc);
  const allowed = () => sandbox.querySelectorAll('.permission-allowed').length;
  assert.equal(allowed(), 1);
  sandbox.querySelector('[data-sandbox-attempt]').click();
  assert.match(sandbox.querySelector('[data-sandbox-log]').textContent, /Denied/);
  sandbox.querySelector('[data-sandbox-role="manager"]').click();
  assert.equal(allowed(), 3);
  sandbox.querySelector('[data-sandbox-role="admin"]').click();
  assert.equal(allowed(), 6);
  sandbox.querySelector('[data-sandbox-attempt]').click();
  assert.match(sandbox.querySelector('[data-sandbox-log] li').textContent, /Allowed/);
  doc.documentElement.lang = 'vi';
  doc.dispatchEvent(new dom.window.CustomEvent('ntc:language'));
  assert.match(sandbox.querySelector('[data-sandbox-count]').textContent, /Cho phép 6/);
  assert.equal(sandbox.querySelector('.sandbox-roles').getAttribute('aria-label'), 'Vai trò sandbox');
  sandbox.querySelector('[data-sandbox-reset]').click();
  assert.equal(allowed(), 1);
  assert.match(sandbox.querySelector('[data-sandbox-log]').textContent, /Chưa thử/);
  assert.equal(doc.querySelectorAll('[data-view]').length, 0);
  dom.window.close();
});

test('confirmed remote availability is bilingual and hours remain by arrangement', async () => {
  const dom = domFor(await readFile(resolve(root, 'index.html'), 'utf8'));
  dom.window.NTC_SITE = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
  dom.window.eval(script);
  const doc = dom.window.document;
  assert.match(doc.querySelector('[data-availability]').textContent, /Open to remote backend roles/);
  assert.match(doc.querySelector('[data-availability]').textContent, /UTC\+7.*arrangement/);
  doc.querySelector('[data-language="vi"]').click();
  assert.match(doc.querySelector('[data-availability]').textContent, /Giờ làm việc sẽ trao đổi/);
  assert.doesNotMatch(doc.querySelector('[data-availability]').textContent, /9:00|17:00/);
  dom.window.close();
});

test('PDF language and content come from the actual résumé DOM', async () => {
  for (const language of ['en', 'vi']) {
    const rendered = await resumeDocument(language);
    const dom = new JSDOM(rendered.html);
    assert.equal(dom.window.document.documentElement.lang, language);
    assert.equal(dom.window.document.querySelector('.resume-toolbar'), null);
    assert.equal(dom.window.document.querySelectorAll('script,link').length, 0);
    assert.ok(rendered.expected.length > 15);
    assert.match(dom.window.document.querySelector('style').textContent, /data:font\/ttf;base64/);
    assert.ok(rendered.expected.some(text => /quota/.test(text)));
    dom.window.close();
  }
});

test('generated notes have both languages, project links and distinct metadata', async () => {
  const posts = await readPosts();
  assert.equal(posts.length, 3);
  for (const post of posts) {
    const html = await readFile(resolve(root, 'blog', post.en.slug, 'index.html'), 'utf8');
    const dom = domFor(html, `https://portfolio.example/blog/${post.en.slug}/?lang=vi`);
    dom.window.eval(script);
    const doc = dom.window.document;
    assert.equal(doc.title, `${post.vi.title} — Nguyễn Tiến Cường`);
    assert.equal(doc.querySelector('.blog-prose [data-blog-language="en"]').hidden, true);
    assert.equal(doc.querySelector('.blog-prose [data-blog-language="vi"]').hidden, false);
    assert.ok(doc.querySelector('.blog-prose a[href*="/projects/"]'));
    assert.match(doc.querySelector('.blog-prose').textContent, /LDAP|quota|TOTP/);
    dom.window.close();
  }
});

test('Umami can be disabled, honors privacy signals and only sends explicit safe fields', async () => {
  const analytics = await readFile(resolve(root, 'analytics.js'), 'utf8');
  const config = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
  const disabled = domFor('<button data-analytics-toggle hidden></button>');
  disabled.window.NTC_SITE = { ...config, analytics: { ...config.analytics, enabled: false } };
  disabled.window.eval(analytics);
  assert.equal(disabled.window.document.querySelector('script'), null);
  disabled.window.close();
  const enabled = { analytics: { enabled: true, provider: 'umami', websiteId: '00000000-0000-4000-8000-000000000001', scriptUrl: 'https://stats.example/script.js', domains: ['portfolio.example'] } };
  for (const signal of ['doNotTrack', 'globalPrivacyControl']) {
    const dom = domFor('<button data-analytics-toggle hidden></button>');
    dom.window.NTC_SITE = enabled;
    Object.defineProperty(dom.window.navigator, signal, { value: signal === 'doNotTrack' ? '1' : true });
    dom.window.eval(analytics);
    assert.equal(dom.window.document.querySelector('script'), null);
    dom.window.close();
  }
  const preview = domFor('<button data-analytics-toggle hidden></button>', 'https://preview.example/');
  preview.window.NTC_SITE = enabled;
  preview.window.eval(analytics);
  assert.equal(preview.window.document.querySelector('script'), null);
  preview.window.close();
  const dom = domFor('<button data-analytics-toggle hidden></button>', 'https://portfolio.example/projects/iam/?email=private@example.test#secret');
  dom.window.NTC_SITE = enabled;
  const events = [];
  dom.window.umami = { track: payload => events.push(payload) };
  dom.window.eval(analytics);
  const tag = dom.window.document.querySelector('script');
  assert.equal(tag.dataset.autoTrack, 'false');
  tag.dispatchEvent(new dom.window.Event('load'));
  dom.window.document.dispatchEvent(new dom.window.CustomEvent('ntc:analytics', { detail: { name: 'sandbox_role_selected', data: { role: 'admin', email: 'private@example.test', token: 'never-send' } } }));
  assert.equal(events.length, 2);
  assert.equal(events[0].url, '/projects/iam/');
  assert.deepEqual(Object.keys(events[1].data), ['role']);
  assert.doesNotMatch(JSON.stringify(events), /private@example|secret|never-send|referrer|screen/);
  dom.window.document.querySelector('[data-analytics-toggle]').click();
  dom.window.document.dispatchEvent(new dom.window.CustomEvent('ntc:analytics', { detail: { name: 'sandbox_role_selected', data: { role: 'manager' } } }));
  assert.equal(events.length, 2);
  dom.window.close();
});
