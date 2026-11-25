import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function writeSiteConfig(output, root = resolve(import.meta.dirname, '..')) {
  const config = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
  if (!['timezone-only', 'open-remote', 'not-looking'].includes(config.availability?.status)) throw new Error('Unknown availability status');
  new Intl.DateTimeFormat('en', { timeZone: config.availability.timezone }).format();
  const hours = config.availability.hours;
  if (hours !== null && typeof hours !== 'string' && !(hours && typeof hours.en === 'string' && typeof hours.vi === 'string')) throw new Error('Working hours require text, en/vi text, or null');
  if (config.analytics?.enabled) {
    const url = new URL(config.analytics.scriptUrl);
    if (config.analytics.provider !== 'umami' || url.protocol !== 'https:' || url.username || url.password
      || url.search || url.hash || !/^[a-f0-9-]{36}$/i.test(config.analytics.websiteId)
      || !Array.isArray(config.analytics.domains) || !config.analytics.domains.length
      || !config.analytics.domains.every(domain => /^[a-z0-9.-]+$/i.test(domain))) {
      throw new Error('Umami requires an HTTPS script URL, website ID and explicit production domains');
    }
  }
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'site-config.js'), `window.NTC_SITE = ${JSON.stringify(config).replace(/</g, '\\u003c')};\n`);
}
