import { initLayout } from "./layout.js";
import { initScrollReveal } from "./scroll.js";
import { initServicesNav } from "./services-nav.js";
import { initContactForm } from "./contact.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page) initLayout(page);
  initScrollReveal();
  if (page === "services") initServicesNav();
  if (page === "infos") initContactForm();
});
