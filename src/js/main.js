import { initLayout } from "./layout.js";
import { initScrollReveal } from "./scroll.js";
import { initServicesNav } from "./services-nav.js";
import { initContactForm } from "./contact.js";
import { initTheme } from "./theme.js";
import { initPageTransitions } from "./transitions.js";
import { initCookieBanner } from "./cookies.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page) initLayout(page);
  initTheme();
  initPageTransitions();
  initScrollReveal();
  initCookieBanner();
  if (page === "services") initServicesNav();
  if (page === "infos") initContactForm();
});
