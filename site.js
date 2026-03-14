/**
 * site.js — Shared navigation, footer and analytics for freedomappload.es
 * Injects <header> nav and <footer> into every page, and loads GA4 analytics.
 *
 * Analytics – Google Analytics 4
 * ─────────────────────────────────────────────────────────────────────────────
 * GA4 Measurement ID is set in GA_MEASUREMENT_ID below.
 * To use a different property, update that constant.
 *
 * Events tracked automatically by GA4:
 *   • page_view    – fired on every page load (standard GA4 behaviour).
 *
 * Custom events tracked by this file:
 *   • click_play_store        – user clicks a Google Play Store link.
 *       Parameters: app_id (string), link_text (string), page_location (string)
 *   • click_external_project  – user clicks a link to an external project site.
 *       Parameters: project (string), destination (string), page_location (string)
 *
 * Dashboard:
 *   Reports › Engagement › Events in the GA4 console shows all events above,
 *   filtered per landing page via the "Page path" dimension.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Google Analytics 4 ────────────────────────────────────────── */
const GA_MEASUREMENT_ID = 'G-FL1V0XJYW8';
const MAX_LINK_TEXT_LENGTH = 100;

(function initGA(measurementId) {
  if (!measurementId) return;

  /* Load the gtag.js library */
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(gaScript);

  /* Bootstrap dataLayer and the gtag helper (guard against duplicate initialisation) */
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
  }
  window.gtag('config', measurementId);

  /* Outbound-click tracking (capture phase so it fires before any preventDefault) */
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href]');
    if (!anchor) return;

    let url;
    try { url = new URL(anchor.href); } catch (_) { return; }

    if (url.hostname === 'play.google.com') {
      const appId = url.searchParams.get('id') || 'unknown';
      window.gtag('event', 'click_play_store', {
        app_id: appId,
        link_text: anchor.textContent.trim().slice(0, MAX_LINK_TEXT_LENGTH),
        page_location: window.location.href
      });
    } else if (url.hostname === 'maestrococinero.es' || url.hostname === 'www.maestrococinero.es') {
      window.gtag('event', 'click_external_project', {
        project: 'maestro-cocinero',
        destination: anchor.href,
        page_location: window.location.href
      });
    }
  }, true);
}(GA_MEASUREMENT_ID));

(function () {
  /* ── Styles ─────────────────────────────────────────────────── */
  const css = `
    .site-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 clamp(16px, 5vw, 80px);
      height: 64px;
      background: rgba(7, 7, 7, 0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .site-nav__brand {
      font-weight: 700;
      font-size: 1.1rem;
      color: #6ef3a5;
      text-decoration: none;
      letter-spacing: -0.02em;
    }
    .site-nav__brand:hover { color: #fff; }
    .site-nav__links {
      display: flex;
      list-style: none;
      gap: 0;
      margin: 0;
      padding: 0;
    }
    .site-nav__links li a {
      display: block;
      padding: 8px 16px;
      color: #8f9ba8;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      border-radius: 8px;
      transition: color 150ms ease, background 150ms ease;
    }
    .site-nav__links li a:hover,
    .site-nav__links li a[aria-current="page"] {
      color: #f1f1f1;
      background: rgba(255,255,255,0.07);
    }
    .site-nav__toggle {
      display: none;
      background: none;
      border: 1px solid rgba(255,255,255,0.2);
      color: #f1f1f1;
      font-size: 1.2rem;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
    }

    .site-footer {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding: 48px clamp(16px, 5vw, 80px) 36px;
      margin-top: auto;
    }
    .site-footer__inner {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      gap: 20px;
      text-align: center;
    }
    .site-footer__links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 4px;
    }
    .site-footer__links a,
    .site-footer__social a {
      padding: 6px 12px;
      color: #8f9ba8;
      text-decoration: none;
      font-size: 0.9rem;
      border-radius: 8px;
      transition: color 150ms ease, background 150ms ease;
    }
    .site-footer__links a:hover,
    .site-footer__social a:hover {
      color: #f1f1f1;
      background: rgba(255,255,255,0.07);
    }
    .site-footer__social {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 4px;
    }
    .site-footer__copy {
      color: #556070;
      font-size: 0.9rem;
      margin: 0;
    }
    .site-footer__tagline {
      color: #8f9ba8;
      font-size: 0.85rem;
      margin: 0;
    }

    @media (max-width: 640px) {
      .site-nav__links {
        display: none;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        flex-direction: column;
        background: rgba(7,7,7,0.97);
        border-bottom: 1px solid rgba(255,255,255,0.07);
        padding: 12px 16px 16px;
        gap: 4px;
      }
      .site-nav__links.open { display: flex; }
      .site-nav__toggle { display: block; }
    }

    @media (prefers-color-scheme: light) {
      .site-nav {
        background: rgba(251,251,251,0.9);
        border-bottom-color: rgba(0,0,0,0.08);
      }
      .site-nav__brand { color: #16c37b; }
      .site-nav__brand:hover { color: #0f172a; }
      .site-nav__links li a { color: #556070; }
      .site-nav__links li a:hover,
      .site-nav__links li a[aria-current="page"] {
        color: #0f172a;
        background: rgba(0,0,0,0.05);
      }
      .site-nav__toggle { border-color: rgba(0,0,0,0.2); color: #0f172a; }
      .site-footer { border-top-color: rgba(0,0,0,0.08); }
      .site-footer__links a,
      .site-footer__social a { color: #556070; }
      .site-footer__links a:hover,
      .site-footer__social a:hover { color: #0f172a; background: rgba(0,0,0,0.05); }
      .site-footer__copy { color: #8f9ba8; }
      .site-footer__tagline { color: #556070; }
      @media (max-width: 640px) {
        .site-nav__links { background: rgba(251,251,251,0.99); }
      }
    }

    /* ── Related blocks (reusable component) ────────────────────── */
    .related-block {
      margin-top: 48px;
      padding-top: 40px;
      border-top: 1px solid rgba(255,255,255,0.07);
    }
    .related-block__title {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin: 0 0 20px;
    }
    .related-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .related-card {
      display: flex;
      flex-direction: column;
      background: var(--card);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      overflow: hidden;
      text-decoration: none;
      color: var(--text);
      transition: border-color 150ms ease, transform 150ms ease;
    }
    .related-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .related-card__img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      display: block;
    }
    .related-card__body {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .related-card__label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #6ef3a5;
    }
    .related-card__title {
      font-size: 0.975rem;
      font-weight: 600;
      line-height: 1.35;
      margin: 0;
    }
    .related-card__desc {
      font-size: 0.85rem;
      color: #8f9ba8;
      margin: 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .related-card__cta {
      font-size: 0.82rem;
      color: #6ef3a5;
      margin-top: auto;
      padding-top: 8px;
    }
    .related-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .related-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      background: var(--card);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      color: var(--text);
      font-size: 0.9rem;
      font-weight: 500;
      text-decoration: none;
      transition: border-color 150ms ease, color 150ms ease;
    }
    .related-link:hover { border-color: var(--accent); color: var(--accent); }
    .related-block .related-links {
      margin-top: 24px;
    }

    /* ── Shared CTA banner component ─────────────────────────────── */
    .cta-banner {
      background: linear-gradient(135deg, rgba(110,243,165,0.12) 0%, rgba(110,243,165,0.04) 100%);
      border: 1px solid rgba(110,243,165,0.2);
      border-radius: 16px;
      padding: 32px 28px;
      text-align: center;
    }
    .cta-banner h2 { font-size: 1.4rem; font-weight: 700; margin-bottom: 8px; }
    .cta-banner p { color: var(--muted, #8f9ba8); font-size: 1rem; margin-bottom: 20px; }
    .cta-banner__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }

    @media (prefers-color-scheme: light) {
      .related-block { border-top-color: rgba(0,0,0,0.08); }
      .related-card {
        border-color: rgba(0,0,0,0.08);
        box-shadow: 0 2px 8px rgba(15,23,42,0.06);
      }
      .related-card:hover { border-color: #16c37b; }
      .related-card__label { color: #16c37b; }
      .related-card__desc { color: #556070; }
      .related-card__cta { color: #16c37b; }
      .related-link { box-shadow: 0 2px 8px rgba(15,23,42,0.06); }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── JSON-LD structured data ─────────────────────────────────── */
  if (!document.querySelector('script[data-sitewide-jsonld]')) {
    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://freedomappload.es/#website',
        name: 'freedomappload',
        url: 'https://freedomappload.es/',
        description: 'Desarrollador móvil y web. Apps y proyectos que generan tracción real.',
        inLanguage: 'es',
        author: { '@id': 'https://freedomappload.es/#person' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://freedomappload.es/#person',
        name: 'Antonio Palomo',
        url: 'https://freedomappload.es/',
        jobTitle: 'Desarrollador móvil y web',
        sameAs: [
          'https://www.linkedin.com/in/antonio-palomo-cardenas-b8155a3b/',
          'https://github.com/apalomo',
        ],
      },
    ];
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.setAttribute('data-sitewide-jsonld', '');
    ldScript.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(ldScript);
  }

  /* ── Active link helper ─────────────────────────────────────── */
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  function isCurrent(href) {
    const h = href.replace(/\/$/, '') || '/';
    if (h === '/') return path === '/';
    return path === h || path.startsWith(h + '/');
  }

  const navLinks = [
    { label: 'Apps',       href: '/apps/'      },
    { label: 'Proyectos',  href: '/projects/'  },
    { label: 'Blog',       href: '/blog/'       },
    { label: 'Sobre mí',   href: '/about/'      },
  ];

  /* ── Header ─────────────────────────────────────────────────── */
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Navegación principal');

  const brand = document.createElement('a');
  brand.className = 'site-nav__brand';
  brand.href = '/';
  brand.textContent = 'freedomappload';
  if (isCurrent('/')) brand.setAttribute('aria-current', 'page');

  const toggle = document.createElement('button');
  toggle.className = 'site-nav__toggle';
  toggle.setAttribute('aria-label', 'Menú');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';

  const ul = document.createElement('ul');
  ul.className = 'site-nav__links';

  navLinks.forEach(({ label, href }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (isCurrent(href)) a.setAttribute('aria-current', 'page');
    li.appendChild(a);
    ul.appendChild(li);
  });

  toggle.addEventListener('click', () => {
    const open = ul.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  });

  nav.appendChild(brand);
  nav.appendChild(toggle);
  nav.appendChild(ul);

  document.body.insertAdjacentElement('afterbegin', nav);

  /* ── Footer ─────────────────────────────────────────────────── */
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  const footerLinks = [
    { label: 'Inicio', href: '/' },
    ...navLinks,
  ];

  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="site-footer__inner">
      <nav class="site-footer__links" aria-label="Pie de página">
        ${footerLinks.map(({ label, href }) =>
          `<a href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>${label}</a>`
        ).join('')}
      </nav>
      <div class="site-footer__social">
        <a href="https://www.linkedin.com/in/antonio-palomo-cardenas-b8155a3b/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/apalomo" target="_blank" rel="noreferrer">GitHub</a>
        <a href="/about/">Contacto</a>
      </div>
      <p class="site-footer__copy">&copy; ${year} Antonio Palomo &middot; freedomappload</p>
      <p class="site-footer__tagline">Código limpio, productos memorables.</p>
    </div>
  `;

  /* Replace existing <footer> if present, otherwise append */
  const existingFooter = document.querySelector('body > footer');
  if (existingFooter) {
    existingFooter.replaceWith(footer);
  } else {
    document.body.appendChild(footer);
  }
})();
