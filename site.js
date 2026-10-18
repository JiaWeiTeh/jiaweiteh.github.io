// Loaded in <head> on every page, so the theme is set before the first paint.

// Theme: the visitor's stored choice, else their system setting.
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}   // storage can be blocked (private windows)
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

addEventListener("DOMContentLoaded", () => {
  // Light/dark switch, in the menu on the home page and beside the back link elsewhere.
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

  // Menu: mark the section currently on screen.
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.hash === "#" + e.target.id ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"));
  }), { rootMargin: "-20% 0px -70% 0px" });
  links.forEach(l => { const s = document.getElementById(l.hash.slice(1)); if (s) io.observe(s); });
});
