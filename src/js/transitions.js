const INTERNAL_LINK = /\.html(?:[#?].*)?$|\/$/;

export function initPageTransitions() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) return;

  document.body.classList.add("page-transitions-enabled");

  requestAnimationFrame(() => {
    document.body.classList.add("is-page-visible");
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    if (url.origin !== window.location.origin) return;
    if (!INTERNAL_LINK.test(url.pathname + url.search)) return;
    if (url.href === window.location.href) return;

    e.preventDefault();
    document.body.classList.add("is-page-leaving");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 180);
  });
}
