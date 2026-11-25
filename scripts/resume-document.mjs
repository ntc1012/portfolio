import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

export async function resumeDocument(language, root = resolve(import.meta.dirname, '..')) {
  const html = await readFile(resolve(root, 'resume.html'), 'utf8');
  const script = await readFile(resolve(root, 'script.js'), 'utf8');
  const dom = new JSDOM(html, {
    url: `https://resume.invalid/resume.html${language === 'vi' ? '?lang=vi' : ''}`,
    runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: new VirtualConsole()
  });
  dom.window.matchMedia = () => ({ matches: true });
  dom.window.NTC_SITE = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
  dom.window.eval(script);
  const document = dom.window.document;
  document.documentElement.dataset.theme = 'light';
  const expected = [...document.querySelectorAll('.resume-sheet [data-i18n]')].map(el => el.textContent.trim()).filter(Boolean);
  document.querySelector('.resume-toolbar')?.remove();
  document.querySelectorAll('script,link,noscript').forEach(el => el.remove());
  const font = (await readFile(resolve(root, 'assets/fonts/NotoSans.ttf'))).toString('base64');
  const css = (await Promise.all(['styles.css', 'resume.css', 'features.css'].map(name => readFile(resolve(root, name), 'utf8')))).join('\n');
  const style = document.createElement('style');
  style.textContent = `${css}\n@font-face{font-family:ResumeSans;src:url(data:font/ttf;base64,${font}) format('truetype');font-weight:100 900;font-style:normal} .resume-page,.resume-page .monogram{font-family:ResumeSans,Arial,sans-serif}`;
  document.head.append(style);
  const result = { html: dom.serialize(), expected };
  dom.window.close();
  return result;
}
