(function () {
  var key = "lcf-theme";
  var saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
    return;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
