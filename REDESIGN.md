# Homepage redesign plan

Written 2026-10-31 after reviewing the site as rendered (desktop, phone, dark mode, Routes, Blog).
This is a plan for the next session to implement. Delete this file when the redesign is done.

## Verdict

The *look* is not the problem. Source Serif, the warm off-white, the dark-red links, dark mode,
the hover preview on "natal molecular clouds", the Routes page with the GPS trace drawn over each
photo: none of that reads as a template. Keep all of it.

What reads as generic, and as a paper rather than a person, is the **structure and the register
of the text**:

- The page order is the stock academic-site skeleton: round headshot + name, research lede,
  links row, About, Research, Software, Publications, Contact. That skeleton is what you get from
  any generator, and the 88 px circular avatar is its signature.
- The first screen is a research statement and a paper figure with a paper caption
  ("Adapted from Figure 1 of Teh et al. 2026"). A visitor meets the abstract before the person.
- The Research section is three abstract-style paragraphs. Sentences like "integrating the
  equation of motion of a single swept-up shell from the first winds to the shell's fate" belong
  in the paper, and they are already there.
- About is a CV in paragraph form: supervisors, IMPRS, three collaborations, honours, three summer
  projects, all in one block. Nobody describes themselves like that out loud.
- Publications lists every co-author on every paper and numbers the lists in reverse, which is
  reference-list convention, not personal-site convention.
- Contact ends with a postal address, like an affiliation footer.
- The personal material (Routes, the colour post, the cycling line) is the best content on the
  site and it is at the bottom, under a heading that defines it by what it is not
  ("Outside research").

Measured on the current homepage at 1280 px wide:

| Block                              | Words | Starts at    |
|------------------------------------|------:|-------------:|
| Lede + links                       |    78 | top          |
| About                              |    90 | 20 % down    |
| Research + Software + Publications |   716 | 26 % – 77 %  |
| Outside research                   |   116 | 77 % down    |
| Contact                            |    18 | 96 % down    |

Seventy percent of the words are research/software/papers. The person appears at 77 % of the
scroll. On a phone the page is about 9000 px tall.

## Keep

- `style.css` typography, palette, dark theme, `.peek` hover preview, `mix-blend-mode` on figures.
- `site.js` as is.
- `routes/` entirely. It is the most distinctive thing here. Do not restyle it.
- `blog/hue-man-rights/` entirely, including the colour-vision switch.
- No build step, one stylesheet, self-hosted fonts.

## Proposed page order

```
nav:  About · Research · Papers · Code · Routes · Blog      (drop "Outside research")

1. Name, one-line role, photo                 (photo: not a 88 px circle, see below)
2. Two or three plain sentences: who, where, what I do, one human hook
3. Links row (CV · GitHub · ADS · ORCID · email)            unchanged
4. Three tiles, one row:  TRINITY  ·  Routes  ·  Colour post
   → in one glance: code, bikes, colour. That is a person.
5. About        short bio in first person, 3–4 sentences
6. Research     one short paragraph per topic, plain English, link out for detail
                the bubble schematic lives here, not at the top
7. Papers       first-author in full; co-author compact (First author et al., year, journal)
8. Code         TRINITY and astrosimplify, one image each, 2 sentences each
9. Elsewhere    hobbies paragraph (keep the random-town cycling line), Routes, blog
                side projects as one line of links or tiny tiles
10. Contact     email + institute, no street address
11. footer      "Last updated …"                            unchanged
```

Target: roughly half the current height on desktop and phone.

## Section by section

### Top of page
- Photo: either larger and rectangular (say 160–200 px tall, left of the text), or a photo of you
  doing something rather than a headshot. The round 88 px avatar is the single most template
  element on the page.
- Lede: rewrite from scratch in your own words. It should pass the "say it to a friend at dinner"
  test. "Galactic baryon cycle" is not a first-sentence phrase. Example shape only, not text to
  use: *I'm a PhD student in Heidelberg. I study how young stars blow apart the clouds they were
  born in, and I write the code that simulates it. When not doing that I pick a town on a map and
  cycle there.*
- Move `figure.lead-fig` down into Research. If you want a visual on the first screen, a short
  looping animation of a TRINITY bubble expanding (radius vs time, or the shell growing) would do
  far more than a static paper figure. `projects/astrosimplify.gif` shows the format works.
- The three-tile row (TRINITY · Routes · Colour) reuses `.tiles` and `.tile` as they exist.
  Existing images: `projects/trinity.png`, `routes/tile.jpg`, `colour/tile.png`.

### About
- Replace the CV paragraph with a short bio: where you grew up if you want to say, ANU then
  Heidelberg, who you work with (keep Klessen, Glover, Kreckel: academics look for that), and one
  or two lines that are not credentials.
- IMPRS, ECOGAL, first-class honours, the three summer projects: move to the CV. They are already
  in `cv.pdf`.

### Research
- One paragraph per topic, 2–4 sentences, written for a first-year student, not a referee.
  Rule: no sentence on the site should be pasteable into an abstract.
- Keep the links to the papers. Keep the schematic here with a one-line caption.
- Drop em-dash lists ("stellar winds — direct and dust-reprocessed radiation pressure — and").

### Papers
- First-author: keep as is, they are two entries.
- Co-author: compact to `Sheriff et al. (2026), AJ · ADS`. Five entries with 8–11 names each is
  noise on a personal page; ADS has the full list and is already linked.
- Remove `reversed` numbering; a plain list or a year label is enough.

### Code
- `projects/trinity.png` is the same schematic as the lead figure. One of them goes.
- Cut each description to two sentences. The current ones are README prose.

### Elsewhere (currently "Outside research")
- Rename. "Elsewhere", "Not astronomy", or just "Routes and other things".
- Keep the hobbies paragraph. "I also enjoy picking a town more or less at random on a map and
  cycling there" is the most human sentence on the site. Put it higher.
- Side projects (2022–23 Python toys): fold into one line of links, or keep as tiny tiles at the
  very end. The black BallGame tile is visually the heaviest thing on the page and the least
  important.
- Delete the commented-out Bouldering/Piano placeholder tiles and the `.todo` rule in the CSS.

### Contact
- Email and institute line only. The street address goes to the CV.

### Small visual
- Drop the `translateY(-2px)` + shadow hover on tiles, or keep only the shadow. The lift is the
  generic card interaction.
- `nav`: six items is fine, but "Outside research" is the awkward one. See order above.

## Writing rules for the next session

The text is the thing that reads as AI, so the next session must not write it. It moves, cuts
and restructures. Any new sentence is a placeholder in square brackets for the author to fill in,
or a verbatim move of a sentence the author already wrote.

Phrases to cut when encountered, with their fix:

| Now                                                       | Fix                                   |
|-----------------------------------------------------------|---------------------------------------|
| "I am interested in the galactic baryon cycle, focusing on" | say what you actually do             |
| "To do so, I develop"                                     | "I write"                             |
| "under the influence of important stellar feedback processes" | name the three things, or none    |
| "These predictions can be tested against observations"    | "I check this against …"              |
| "I also contribute TRINITY models to studies of"          | "I helped with …"                     |
| any "X — Y — Z" list inside a sentence                    | a plain list, or three short sentences |

## Order of work

1. Restructure `index.html` to the order above with the author's existing sentences, placeholders
   where new text is needed. No new prose. (One commit.)
2. Author fills placeholders, in their own words. (Their commit.)
3. Photo and optional TRINITY animation. (Separate commit, author supplies the assets.)
4. Trim CSS orphans: `.todo`, placeholder rules, tile hover lift. Bump `?v=` on the stylesheet
   links in every page.
5. Check at 390 px and in dark mode. Check the nav section-marking still works with renamed ids.
