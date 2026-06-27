const NAV_LINKS = [
  { href: "index.html", label: "Accueil", page: "home" },
  { href: "services.html", label: "Services", page: "services" },
  { href: "infos.html", label: "Infos", page: "infos" },
];

function navLinkClass(isActive) {
  const base =
    "block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200";
  return isActive
    ? `${base} bg-lcf-accent/10 text-lcf-accent`
    : `${base} text-lcf-text hover:bg-lcf-light hover:text-lcf-navy`;
}

function mobileNavLinkClass(isActive) {
  return isActive
    ? "mobile-nav-link is-active"
    : "mobile-nav-link";
}

export function renderSkipLink() {
  return `<a href="#main-content" class="skip-link">Aller au contenu principal</a>`;
}

export function renderHeader(activePage) {
  const navItems = NAV_LINKS.map(
    ({ href, label, page }) =>
      `<li><a href="${href}" class="${navLinkClass(page === activePage)}" ${page === activePage ? 'aria-current="page"' : ""}>${label}</a></li>`,
  ).join("");

  const mobileNavItems = NAV_LINKS.map(
    ({ href, label, page }) =>
      `<li><a href="${href}" class="${mobileNavLinkClass(page === activePage)}" ${page === activePage ? 'aria-current="page"' : ""}>${label}</a></li>`,
  ).join("");

  return `
    ${renderSkipLink()}
    <header id="site-header-bar" class="glass-header">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-16 lg:h-[4.25rem]">
          <a href="index.html" class="flex items-center gap-3 group shrink-0" aria-label="Lorem Consulting France — Accueil">
            <img src="/logo.svg" alt="" width="40" height="40" class="w-9 h-9 lg:w-10 lg:h-10 transition-transform duration-200 group-hover:scale-105" />
            <span class="hidden sm:block">
              <span class="block text-sm font-bold text-lcf-navy leading-tight tracking-tight">Lorem Consulting France</span>
              <span class="block text-xs text-lcf-muted font-medium">Web · Conformité · Applications</span>
            </span>
          </a>

          <div class="flex items-center gap-1 sm:gap-2 md:gap-3">
            <button
              id="theme-toggle"
              type="button"
              class="theme-toggle"
              aria-pressed="false"
              aria-label="Activer le mode sombre"
            >
              <svg class="theme-icon theme-icon-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>
              <svg class="theme-icon theme-icon-moon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>
            </button>

            <nav aria-label="Navigation principale">
              <button
                id="nav-toggle"
                type="button"
                class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-lcf-text hover:bg-lcf-light transition-colors"
                aria-expanded="false"
                aria-controls="mobile-nav-overlay"
              >
                <span class="sr-only">Ouvrir le menu</span>
                <svg id="nav-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <svg id="nav-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <ul id="nav-menu" class="hidden md:flex md:items-center md:gap-1">
                ${navItems}
              </ul>
            </nav>

            <a href="infos.html" class="btn-primary btn-sm hidden sm:inline-flex">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>

    <div
      id="mobile-nav-overlay"
      class="mobile-nav-overlay"
      aria-hidden="true"
      inert
    >
      <div class="mobile-nav-backdrop" data-nav-close aria-hidden="true"></div>
      <nav class="mobile-nav-panel" aria-label="Navigation mobile">
        <button type="button" class="mobile-nav-close" data-nav-close aria-label="Fermer le menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <ul class="mobile-nav-links">
          ${mobileNavItems}
        </ul>
        <a href="infos.html" class="btn-primary mobile-nav-cta">Contact</a>
      </nav>
    </div>
  `;
}

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="site-footer text-lcf-muted mt-auto">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-14">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div class="flex items-center gap-2.5 mb-4">
              <img src="/logo.svg" alt="" width="32" height="32" class="w-8 h-8" />
              <p class="text-white font-bold tracking-tight">Lorem Consulting France</p>
            </div>
            <p class="text-sm leading-relaxed">
              Accompagnement web, mise en conformité et développement d'applications sur mesure.
            </p>
          </div>
          <div>
            <p class="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Navigation</p>
            <ul class="space-y-2 text-sm">
              ${NAV_LINKS.map(({ href, label }) => `<li><a href="${href}" class="hover:text-white transition-colors duration-200">${label}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <p class="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</p>
            <p class="text-sm"><a href="mailto:contact@lorem-consulting.fr" class="hover:text-white transition-colors duration-200">contact@lorem-consulting.fr</a></p>
            <p class="text-sm mt-1">France</p>
          </div>
        </div>
        <div class="mt-10 pt-6 border-t border-white/10 text-xs text-lcf-muted/80 flex flex-col sm:flex-row sm:justify-between gap-2">
          <p>&copy; ${year} Lorem Consulting France. Tous droits réservés.</p>
          <p>
            <a href="mentions-legales.html" class="hover:text-white transition-colors duration-200">Mentions légales</a>
            ·
            <a href="confidentialite.html" class="hover:text-white transition-colors duration-200">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  `;
}

function initScrollHeader() {
  const header = document.getElementById("site-header-bar");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setMobileNavOpen(isOpen) {
  const overlay = document.getElementById("mobile-nav-overlay");
  const toggle = document.getElementById("nav-toggle");
  const iconOpen = document.getElementById("nav-icon-open");
  const iconClose = document.getElementById("nav-icon-close");

  if (!overlay || !toggle) return;

  overlay.classList.toggle("is-open", isOpen);
  overlay.setAttribute("aria-hidden", String(!isOpen));
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.querySelector(".sr-only").textContent = isOpen
    ? "Fermer le menu"
    : "Ouvrir le menu";
  iconOpen?.classList.toggle("hidden", isOpen);
  iconClose?.classList.toggle("hidden", !isOpen);
  document.body.classList.toggle("nav-open", isOpen);

  if (isOpen) {
    overlay.removeAttribute("inert");
    overlay.querySelector(".mobile-nav-close")?.focus();
  } else {
    overlay.setAttribute("inert", "");
    toggle.focus();
  }
}

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const overlay = document.getElementById("mobile-nav-overlay");
  if (!toggle || !overlay) return;

  toggle.addEventListener("click", () => {
    setMobileNavOpen(!overlay.classList.contains("is-open"));
  });

  overlay.querySelectorAll("[data-nav-close]").forEach((el) => {
    el.addEventListener("click", () => setMobileNavOpen(false));
  });

  overlay.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => setMobileNavOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      setMobileNavOpen(false);
    }
  });
}

function ensureMainLandmark() {
  const main = document.querySelector("main");
  if (main && !main.id) main.id = "main-content";
  if (main && !main.getAttribute("tabindex")) main.setAttribute("tabindex", "-1");
}

export function initLayout(activePage) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) headerEl.innerHTML = renderHeader(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();

  ensureMainLandmark();
  initMobileNav();
  initScrollHeader();
}
