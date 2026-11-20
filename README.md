# jiaweiteh.github.io

Personal website, served by GitHub Pages from the root of `main`. No build step: edit, commit, push.

- `index.html` is the home page. `research/`, `papers/`, `code/`, `routes/` and `blog/` each have an
  `index.html` of their own, and so does every route (`routes/<slug>/`) and every post (`blog/<slug>/`).
- The menu is copied into all of those pages, so a menu change goes in all of them. Only the `../`
  prefixes and the `aria-current` mark differ from page to page.
- `style.css` is the styling. The colours are set once at the top, with a second set for the dark theme.
- `site.js` (loaded on every page) handles the light/dark switch, and the colour-vision switch on the colour post.
- A route folder holds `index.html`, `map.html`, `track.json`, `cover.jpg` and `photo-N.jpg`. `map.html` is the
  same file in every route. It draws `track.json` with `routes/map.js`, `routes/map.css` and Leaflet 1.9.4,
  which is kept unmodified in `routes/leaflet/` (BSD 2-Clause, see `routes/leaflet/LICENSE`).
  `track.json` holds coordinates and elevation, and nothing else.
- Every page carries a Content-Security-Policy that allows files from this site only (the map pages also
  allow map tiles). Scripts and styles therefore live in files, never inline, and images are hosted here.
- Links to other sites open in a new tab with `rel="noopener noreferrer"`.
- `photo.jpg` lives at the repo root.
- `fonts/` holds the self-hosted Source Serif 4 web fonts (SIL Open Font License, see `fonts/OFL.txt`).
- After editing `style.css`, bump the `?v=` date in each page's stylesheet link so browsers fetch the new file.
- The "Last updated" line is on the home page only.
