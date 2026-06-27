const STORAGE_KEY = "lcf-cookie-consent";

export function initCookieBanner() {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Consentement cookies");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <p class="cookie-banner-text">
        Ce site n'utilise pas de cookies de tracking pour le moment. En continuant,
        vous acceptez l'utilisation de cookies techniques nécessaires au fonctionnement
        du site. Consultez notre
        <a href="confidentialite.html">politique de confidentialité</a>.
      </p>
      <div class="cookie-banner-actions">
        <button type="button" id="cookie-reject" class="btn-secondary btn-sm">Refuser</button>
        <button type="button" id="cookie-accept" class="btn-primary btn-sm">Accepter</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add("is-visible"));

  const dismiss = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    banner.classList.remove("is-visible");
    window.setTimeout(() => banner.remove(), 300);
  };

  banner.querySelector("#cookie-accept")?.addEventListener("click", () => dismiss("accepted"));
  banner.querySelector("#cookie-reject")?.addEventListener("click", () => dismiss("rejected"));
}
