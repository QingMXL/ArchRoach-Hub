# ArchRoach Hub · 建筑蟑螂互助会

**Career-transition stories and peer support for architecture people — a front-end prototype**

> Architecture people survive anywhere.

<p align="left">
  <a href="README.md">中文</a> ·
  <b>English</b>
</p>

---

## What this is

A **front-end prototype** of a career-exploration tool for architecture students and professionals. It turns scattered career-change information into structured, filterable, comparable content: career paths, real transition stories, a skill-transfer dictionary, jobs and resources — plus booking a session with someone who already made the move.

The product definition and content rules come from [`docs/SPEC_建筑蟑螂互助会_PRD与MVP_v1.0.md`](docs/SPEC_建筑蟑螂互助会_PRD与MVP_v1.0.md) (Chinese); the visual system comes from [`docs/design-system.md`](docs/design-system.md).

### Please read this first

- This is a **static front-end prototype**. No backend, no database, no accounts.
- Every path, story, mentor, job, order and message is **sample data hard-coded in `assets/js/data-*.js`** — not real people, roles or experiences.
- The booking flow (service → time → details → review → payment) is a **UI demo**. Nothing is charged; "Pay" just switches to a success state.
- Saved items and language preference live in browser `localStorage` and do not sync across devices.
- Story covers and mentor avatars are **inline SVG illustrations**, not photographs.

---

## Screenshots

> All captured from the running app with headless Chrome (`screenshots/`). UI text is Chinese by default.

### Home

![Home](screenshots/01-home.png)

### Career paths (list / detail)

| List | Detail |
| --- | --- |
| ![Paths](screenshots/02-directions.png) | ![Path detail](screenshots/03-direction-detail.png) |

### Real stories (list / detail)

| List | Detail |
| --- | --- |
| ![Stories](screenshots/04-cases.png) | ![Story detail](screenshots/05-case-detail.png) |

### Skill transfer / Mentors

| Skill transfer | Mentors |
| --- | --- |
| ![Skills](screenshots/06-skills.png) | ![Mentors](screenshots/07-mentors.png) |

### Booking / My center

| Booking | My center |
| --- | --- |
| ![Booking](screenshots/08-booking.png) | ![My center](screenshots/09-me.png) |

### Language switching

Every UI string and every content field is bilingual. The `中 / EN` switch in the top bar swaps the language in place, keeping the current route and scroll position. A `?lang=en` deep link is also supported.

![English](screenshots/10-home-en.png)

---

## Pages

| Route | Page | Notes |
| --- | --- | --- |
| `#/` | Home | Quick actions, popular path folders, featured stories, mentors |
| `#/directions` | Career paths | Four filters, table-style list, trending and newly added |
| `#/directions/:id` | Path detail | Six tabs: overview / skill transfer / preparation / stories / mentors / jobs |
| `#/cases` | Real stories | Search, four filters, three view tabs, load more |
| `#/cases/:id` | Story detail | Six-part narrative, scroll-linked contents, key numbers |
| `#/skills` | Skill transfer | Category filter, 12 mappings with expandable deep dives |
| `#/mentors` | Mentors | Filters, matched / newly joined groups, reviews |
| `#/mentors/:id` | Mentor detail | Bio, specialties, three services |
| `#/mentors/:id/book` | Booking | Four-step flow with a live order summary |
| `#/resources` | Resources | Jobs / guides / templates |
| `#/roadmap` | Roadmap | Six steps, each linking to the matching page |
| `#/me/:tab` | My center | Bookings / profile / files / saved / messages |
| `#/me/settings` | Settings | Notifications, privacy, export, delete (placeholders) |

Unmatched routes render a 404 page.

---

## Interaction

- **Global search** — `⌘K` / `Ctrl K`, results grouped by paths / stories / mentors / jobs.
- **Filters** re-render only the result area, never the whole page.
- **Saving** works on paths, stories and mentors; saved items collect in My center.
- **Page transitions** share one pattern across every route: top progress bar plus staggered fade-in.
- **Responsive** — the sidebar becomes a drawer below 1100px; no horizontal overflow at 1440 / 1024 / 390.
- **Reduced motion** disables all animation and smooth scrolling.

---

## Implementation

Deliberately simple: **no framework, no build step, no dependencies.**

- Plain HTML / CSS / JavaScript (ES5 style, classic `<script>` tags, no ES modules)
- Hash routing, string-template rendering, event delegation
- Design tokens centralised in `assets/css/tokens.css`
- All graphics — 12 roach poses, 45 icons, story covers — are inline SVG, so there are zero external requests
- Because there are no ES modules or `fetch` calls, **opening `index.html` directly works**

### Structure

```
index.html                 App shell: sidebar + top bar + SVG sprite
assets/css/
  tokens.css               Design tokens
  base.css                 Reset, utilities, transitions, toast
  layout.css               App shell, sidebar, top bar, page frame
  components.css           Buttons, folder cards, content cards, chips, forms
  pages.css                Page-specific styles
assets/js/
  i18n.js                  Dictionary and language switching
  data-*.js                Sample data (paths / skills / stories / people and jobs)
  ui.js                    Render atoms (icons, roach, folder card, saving)
  art.js                   Story cover SVGs
  page-*.js                Per-page rendering and interaction
  app.js                   Router, global search, drawer, language
docs/                      Product spec, design system, design references
screenshots/               Screenshots used in this README
```

---

## Running locally

```bash
open index.html
```

For URL parameters such as `?lang=`, or a setup closer to production, serve it statically:

```bash
python3 -m http.server 4173
# then open http://localhost:4173/
```

No `npm install` required.

---

## Design system notes

- **The base is cool grey-white**, not warm. Canvas `#F1F1F4`; a white app container with a 30px radius and a large shadow, so it reads as a standalone workbench.
- **Roach brown `#B9632E` is roughly 7% of the surface** — primary buttons, the logo and small accents only.
- **Folder cards** carry top-level collections. The tab and the body share one outline; the tab lifts slightly on hover.
- **Muted pastels** are used only for category recognition (lavender = paths, blue = stories, peach = consulting, mint = learning, rose = opportunities).
- **The roach is a brand component, not an emoji** — 12 poses (waving, pointing, magnifier, folder, celebrating, tie / glasses / hat …) used for the logo, guidance, empty states and mentor avatars.

Full spec in [`docs/design-system.md`](docs/design-system.md).

---

## Content and privacy principles

Taken from the SPEC and reflected in the prototype:

- Stories publish categories and ranges only (discipline, experience band, prep time) — never schools, exact employers or exact salaries.
- Mentors use nicknames and illustrated avatars, never real names or photos.
- Uploaded CVs and portfolios are described as visible only to both parties and deleted after 30 days.

---

## Verified / not verified

**Checked**

- All 12 routes render and mount cleanly in both languages; no console errors or warnings
- Cross-reference integrity across stories ↔ mentors ↔ paths ↔ jobs passes
- No horizontal overflow at 1440 / 1024 / 390
- Filters, search, tabs, saving and the four-step booking flow verified by hand

**Not done**

- No automated tests (no unit tests, no E2E)
- Only tested in Chrome on macOS; no cross-browser verification
- No systematic accessibility audit (keyboard access, `aria-*`, focus-visible and reduced-motion are implemented, but no axe-style tooling was run)
- No performance baseline (no build step, no minification; files ship unoptimised)

---

## Possible next steps

- A real backend and content management (story submission, mentor verification, job expiry)
- Real authentication and payments
- Licensed photography for story covers
- Automated tests and an accessibility audit
- Add a LICENSE (none specified yet)
