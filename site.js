// Loaded in <head> on every page, so the theme is set before the first paint.

const root = document.documentElement;
const btn = document.createElement("button");   // light/dark switch; goes into the menu below

function setTheme(theme) {
  root.dataset.theme = theme;
  btn.setAttribute("aria-pressed", theme === "dark");
  btn.textContent = theme === "dark" ? "☀" : "☾";
}

// Theme: the visitor's stored choice, else their system setting.
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}   // storage can be blocked (private windows)
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

// A switch made in another tab, or on the page around a route map, applies here too.
addEventListener("storage", e => { if (e.key === "theme" && e.newValue) setTheme(e.newValue); });

addEventListener("DOMContentLoaded", () => {
  btn.type = "button";
  btn.className = "theme";
  btn.setAttribute("aria-label", "Dark mode");
  btn.onclick = () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  };
  document.querySelector("nav")?.prepend(btn);

  // Colour-vision switch on the colour post: show the figures through the chosen filter.
  const vision = document.querySelectorAll(".vision button");
  vision.forEach(b => b.onclick = () => {
    document.body.dataset.vision = b.dataset.v;
    vision.forEach(x => x.setAttribute("aria-pressed", x === b));
  });
});
