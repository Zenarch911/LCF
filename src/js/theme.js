const STORAGE_KEY = "lcf-theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "light" || saved === "dark" ? saved : null;
}

export function getTheme() {
  return getStoredTheme() || getSystemTheme();
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateToggle(theme);
  updateIcons(theme);
}

function updateIcons(theme) {
  const sun = document.querySelector(".theme-icon-sun");
  const moon = document.querySelector(".theme-icon-moon");
  if (!sun || !moon) return;

  const isDark = theme === "dark";
  sun.classList.toggle("hidden", isDark);
  moon.classList.toggle("hidden", !isDark);
}

function updateToggle(theme) {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const isDark = theme === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute(
    "aria-label",
    isDark ? "Activer le mode clair" : "Activer le mode sombre",
  );
}

export function initTheme() {
  applyTheme(getTheme());

  const toggle = document.getElementById("theme-toggle");
  toggle?.addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (getStoredTheme()) return;
      applyTheme(e.matches ? "dark" : "light");
    });
}
