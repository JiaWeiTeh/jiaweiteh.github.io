# jiaweiteh.github.io

Personal website, served by GitHub Pages from the root of `main`. No build step: edit, commit, push.

- `index.html` is the home page. `research/`, `papers/`, `code/`, `routes/` and `blog/` each have an
  `index.html` of their own. The menu is copied into all six, so a menu change goes in all six.
- `style.css` is the styling.
- `site.js` (loaded on every page) handles the light/dark switch. Each page marks its own menu entry with `aria-current`.
- `photo.jpg` and `cv.pdf` live at the repo root; overwrite them with the real files.
- `fonts/` holds the self-hosted Source Serif 4 web fonts (SIL Open Font License, see `fonts/OFL.txt`).
 
- After editing `style.css`, bump the `?v=` date in each page's stylesheet link so browsers fetch the new file.
