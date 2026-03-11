/**
 * site.js — Shared navigation & footer for freedomappload.es
 * Injects <header> nav and <footer> into every page.
 */
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
    .related-block .related-links {
      margin-top: 24px;
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
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

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
