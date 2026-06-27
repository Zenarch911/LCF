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

export function renderHeader(activePage) {
  const navItems = NAV_LINKS.map(
    ({ href, label, page }) =>
      `<li><a href="${href}" class="${navLinkClass(page === activePage)}" ${page === activePage ? 'aria-current="page"' : ""}>${label}</a></li>`,
  ).join("");

  return `
    <header id="site-header-bar" class="glass-header">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-16 lg:h-[4.25rem]">
          <a href="index.html" class="flex items-center gap-3 group shrink-0">
            <img src="/logo.svg" alt="" width="40" height="40" class="w-9 h-9 lg:w-10 lg:h-10 transition-transform duration-200 group-hover:scale-105" />
            <span class="hidden sm:block">
              <span class="block text-sm font-bold text-lcf-navy leading-tight tracking-tight">Lorem Consulting France</span>
              <span class="block text-xs text-lcf-muted font-medium">Web · Conformité · Applications</span>
            </span>
          </a>

          <div class="flex items-center gap-2 md:gap-4">
            <nav aria-label="Navigation principale">
              <button
                id="nav-toggle"
                type="button"
                class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-lcf-text hover:bg-lcf-light transition-colors"
                aria-expanded="false"
                aria-controls="nav-menu-mobile"
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

        <ul id="nav-menu-mobile" class="hidden pb-4 space-y-1 md:hidden border-t border-lcf-border/60 pt-3">
          ${navItems}
          <li class="pt-2 sm:hidden">
            <a href="infos.html" class="btn-primary w-full">Contact</a>
          </li>
        </ul>
      </div>
    </header>
  `;
}

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="bg-lcf-navy text-lcf-muted mt-auto">
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
            <p class="text-sm">contact@lorem-consulting.fr</p>
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

export function initLayout(activePage) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) headerEl.innerHTML = renderHeader(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();

  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-menu-mobile");
  const iconOpen = document.getElementById("nav-icon-open");
  const iconClose = document.getElementById("nav-icon-close");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      iconOpen?.classList.toggle("hidden", !isOpen);
      iconClose?.classList.toggle("hidden", isOpen);
    });
  }

  initScrollHeader();
}
