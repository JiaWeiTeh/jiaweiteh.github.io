// Loaded in <head> on every page, so the theme is set before the first paint.

// Theme: the visitor's stored choice, else their system setting.
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}   // storage can be blocked (private windows)
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

addEventListener("DOMContentLoaded", () => {
  // Light/dark switch, in the menu, or beside the back link on route and post pages.
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "theme";
  btn.setAttribute("aria-label", "Dark mode");
  const paint = () => {
    const dark = root.dataset.theme === "dark";
    btn.setAttribute("aria-pressed", dark);
    btn.textContent = dark ? "☀" : "☾";
  };
  btn.onclick = () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    paint();
  };
  paint();
  (document.querySelector("nav") || document.querySelector(".back"))?.prepend(btn);
});
