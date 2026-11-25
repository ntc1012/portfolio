(() => {
  'use strict';
  const config = window.NTC_SITE?.analytics;
  if (!config?.enabled || config.provider !== 'umami' || !config.websiteId || !config.scriptUrl) return;
  const restricted = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1';
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol !== 'https:';
  const readDisabled = () => { try { return localStorage.getItem('ntc-analytics-disabled') === 'true'; } catch { return false; } };
  let disabled = restricted || local || readDisabled();
  let ready = false;
  let loaded = false;
  const pending = [];
  const paths = /^\/(?:$|index\.html$|resume\.html$|projects\/(?:iam|youtube-automation)\/$|blog\/(?:[a-z0-9-]+\/)?$)/;
  const pagePath = () => paths.test(location.pathname) ? location.pathname : '/other/';
  const dataFor = (name, data = {}) => {
    if (name === 'perspective_selected' && ['recruiter', 'engineer'].includes(data.perspective)) return { perspective: data.perspective };
    if (name === 'project_opened' && ['iam', 'youtube-automation'].includes(data.project)) return { project: data.project };
    if (name === 'note_opened' && /^[a-z0-9-]{1,80}$/.test(data.slug || '')) return { slug: data.slug };
    if (name === 'sandbox_role_selected' && ['employee', 'manager', 'admin'].includes(data.role)) return { role: data.role };
    if (name === 'resume_downloaded') return { language: document.documentElement.lang === 'vi' ? 'vi' : 'en' };
    return null;
  };
  function send(name, data) {
    if (disabled) return;
    const clean = name ? dataFor(name, data) : {};
    if (clean === null) return;
    if (!ready) { if (pending.length < 10) pending.push([name, clean]); return; }
    try {
      // Explicit payload: no query, hash, referrer, screen details, user ID, or arbitrary properties.
      window.umami?.track({ website: config.websiteId, hostname: location.hostname, url: pagePath(),
        title: document.title, language: document.documentElement.lang, ...(name ? { name, data: clean } : {}) });
    } catch { /* Tracking failure must not interrupt the portfolio. */ }
  }
  function load() {
    if (loaded || disabled) return;
    loaded = true;
    const script = document.createElement('script');
    script.src = config.scriptUrl;
    script.defer = true;
    script.dataset.websiteId = config.websiteId;
    script.dataset.autoTrack = 'false';
    script.dataset.doNotTrack = 'true';
    script.dataset.performance = 'false';
    script.dataset.errors = 'false';
    if (config.domains?.length) script.dataset.domains = config.domains.join(',');
    script.addEventListener('load', () => { ready = true; send(); pending.splice(0).forEach(([name, data]) => send(name, data)); });
    document.head.append(script);
  }
  function updateControl() {
    document.querySelectorAll('[data-analytics-toggle]').forEach(button => {
      button.hidden = false;
      button.disabled = restricted || local;
      const vi = document.documentElement.lang === 'vi';
      button.textContent = disabled ? (vi ? 'Thống kê: tắt' : 'Analytics: off') : (vi ? 'Tắt thống kê' : 'Disable analytics');
      button.setAttribute('aria-pressed', String(!disabled));
    });
  }
  document.querySelectorAll('[data-analytics-toggle]').forEach(button => button.addEventListener('click', () => {
    if (restricted || local) return;
    disabled = !disabled;
    try { localStorage.setItem('ntc-analytics-disabled', String(disabled)); } catch { /* Optional preference. */ }
    if (disabled) pending.length = 0;
    else { load(); if (ready) send(); }
    updateControl();
  }));
  document.addEventListener('ntc:language', updateControl);
  document.addEventListener('ntc:analytics', event => send(event.detail?.name, event.detail?.data));
  document.addEventListener('click', event => {
    const view = event.target.closest('[data-view]');
    if (view) send('perspective_selected', { perspective: view.dataset.view });
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    const project = url.pathname.match(/^\/projects\/(iam|youtube-automation)\/$/);
    if (project) send('project_opened', { project: project[1] });
    const note = url.pathname.match(/^\/blog\/([a-z0-9-]+)\/$/);
    if (note) send('note_opened', { slug: note[1] });
    if (link.hasAttribute('data-resume-download')) send('resume_downloaded');
  });
  updateControl();
  load();
})();
