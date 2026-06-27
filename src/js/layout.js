const NAV_LINKS = [
  { href: "index.html", label: "Accueil", page: "home" },
  { href: "services.html", label: "Services", page: "services" },
  { href: "infos.html", label: "Infos", page: "infos" },
];

function navLinkClass(isActive) {
  const base =
    "block px-3 py-2 rounded-md text-sm font-medium transition-colors";
  return isActive
    ? `${base} bg-lcf-accent text-white`
    : `${base} text-slate-700 hover:bg-slate-100 hover:text-lcf-navy`;
}

export function renderHeader(activePage) {
  const navItems = NAV_LINKS.map(
    ({ href, label, page }) =>
      `<li><a href="${href}" class="${navLinkClass(page === activePage)}" ${page === activePage ? 'aria-current="page"' : ""}>${label}</a></li>`,
  ).join("");

  return `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-16">
          <a href="index.html" class="flex items-center gap-2 group">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-lcf-navy text-white text-sm font-bold">LCF</span>
            <span class="hidden sm:block">
              <span class="block text-sm font-semibold text-lcf-navy leading-tight">Lorem Consulting France</span>
              <span class="block text-xs text-slate-500">Web · Conformité · Applications</span>
            </span>
          </a>

          <nav aria-label="Navigation principale">
            <button
              id="nav-toggle"
              type="button"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100"
              aria-expanded="false"
              aria-controls="nav-menu"
            >
              <span class="sr-only">Ouvrir le menu</span>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <ul id="nav-menu" class="hidden md:flex md:items-center md:gap-1">
              ${navItems}
            </ul>
          </nav>
        </div>

        <ul id="nav-menu-mobile" class="hidden pb-4 space-y-1 md:hidden border-t border-slate-100 pt-3">
          ${navItems}
        </ul>
      </div>
    </header>
  `;
}

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="bg-lcf-navy text-slate-300 mt-auto">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p class="text-white font-semibold mb-2">Lorem Consulting France</p>
            <p class="text-sm leading-relaxed">
              Accompagnement web, mise en conformité et développement d'applications sur mesure.
            </p>
          </div>
          <div>
            <p class="text-white font-semibold mb-2">Navigation</p>
            <ul class="space-y-1 text-sm">
              ${NAV_LINKS.map(({ href, label }) => `<li><a href="${href}" class="hover:text-white transition-colors">${label}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <p class="text-white font-semibold mb-2">Contact</p>
            <p class="text-sm">contact@lorem-consulting.fr</p>
            <p class="text-sm mt-1">France</p>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-slate-700 text-sm text-slate-400 flex flex-col sm:flex-row sm:justify-between gap-2">
          <p>&copy; ${year} Lorem Consulting France. Tous droits réservés.</p>
          <p>Mentions légales · Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  `;
}

export function initLayout(activePage) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) headerEl.innerHTML = renderHeader(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();

  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-menu-mobile");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }
}
