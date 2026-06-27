import { initLayout } from "./layout.js";
import { initScrollReveal } from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page) initLayout(page);
  initScrollReveal();
});
