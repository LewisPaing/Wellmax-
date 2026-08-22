(() => {
  const measurementId = 'G-BZS092V571';
  if (window.__wellmaxAnalyticsConfigured) return;
  window.__wellmaxAnalyticsConfigured = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true
  });

  let tagRequested = false;
  const loadTag = () => {
    if (tagRequested || document.getElementById('wellmax-ga4') ||
        document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) return;
    tagRequested = true;
    const tag = document.createElement('script');
    tag.id = 'wellmax-ga4';
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(tag);
  };

  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(type => {
    window.addEventListener(type, loadTag, { once: true, passive: true });
  });
  window.addEventListener('load', () => {
    window.setTimeout(loadTag, 15000);
  }, { once: true });

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    loadTag();
    const href = link.getAttribute('href') || '';
    const label = (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 100);

    if (href.startsWith('mailto:')) {
      window.gtag('event', 'contact_intent', { method: 'email', link_text: label });
    } else if (href.startsWith('tel:')) {
      window.gtag('event', 'contact_intent', { method: 'phone', link_text: label });
    } else if (/contact\.html(?:$|[?#])/.test(href)) {
      window.gtag('event', 'contact_page_click', { link_text: label });
    } else if (/work-[^/]+\.html(?:$|[?#])/.test(href)) {
      window.gtag('event', 'portfolio_view', { link_url: new URL(href, location.href).href, link_text: label });
    } else if (/facebook\.com|instagram\.com|tiktok\.com|linkedin\.com/.test(href)) {
      window.gtag('event', 'social_click', { link_url: href, link_text: label });
    }
  });
})();
