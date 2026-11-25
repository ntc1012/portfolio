import { access, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { resumeDocument } from './resume-document.mjs';

async function executable() {
  if (process.env.CHROME_EXECUTABLE_PATH) return { executablePath: process.env.CHROME_EXECUTABLE_PATH, args: [] };
  if (process.platform === 'linux') {
    const chromium = (await import('@sparticuz/chromium')).default;
    chromium.setGraphicsMode = false;
    return { executablePath: await chromium.executablePath(), args: chromium.args, headless: 'shell' };
  }
  const candidates = process.platform === 'win32'
    ? ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe']
    : ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
  for (const candidate of candidates) { try { await access(candidate); return { executablePath: candidate, args: [] }; } catch { /* Try the next renderer. */ } }
  throw new Error('No PDF renderer found. Set CHROME_EXECUTABLE_PATH to a local Chrome/Edge executable.');
}

export async function buildResumePdfs(output, { qa = false } = {}) {
  await mkdir(resolve(output, 'assets'), { recursive: true });
  const launch = await executable();
  const browser = await puppeteer.launch({ headless: true, ...launch });
  const results = [];
  try {
    for (const language of ['en', 'vi']) {
      const document = await resumeDocument(language);
      const page = await browser.newPage();
      await page.setViewport({ width: 1000, height: 1400, deviceScaleFactor: 1 });
      await page.setRequestInterception(true);
      page.on('request', request => /^(data:|about:)/.test(request.url()) ? request.continue() : request.abort());
      await page.setContent(document.html, { waitUntil: 'load' });
      await page.emulateMediaType('print');
      await page.evaluate(() => document.fonts.ready);
      const path = resolve(output, `assets/resume-${language}.pdf`);
      await page.pdf({ path, preferCSSPageSize: true, printBackground: true, tagged: true });
      if (qa) {
        const target = resolve(import.meta.dirname, '../tmp/resume-qa');
        await mkdir(target, { recursive: true });
        await writeFile(resolve(target, `expected-${language}.json`), JSON.stringify(document.expected));
      }
      results.push(path);
      await page.close();
    }
  } finally { await browser.close(); }
  console.log('Generated English and Vietnamese PDF résumés from resume.html');
  return results;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildResumePdfs(resolve(process.argv[2] || 'dist'), { qa: process.argv.includes('--qa') });
}
