# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `frontend/` directory:

```bash
npm start       # Dev server at http://localhost:3000
npm run build   # Production build to frontend/build/
npm test        # Run tests (interactive watch mode)
npm test -- --watchAll=false  # Run tests once (non-interactive)
```

The `heroku` script (`serve -s build`) is for production deployment serving the static build.

## Architecture

This is a single-page React app (Create React App) with no routing — navigation between sections is managed via a `useState` hook in `Homepage.jsx`.

**Section switching flow:**
- `App.js` renders `Homepage`
- `Homepage` holds `activeSection` state and passes `setActiveSection` to `Header`
- `Header` renders nav buttons that call `setActiveSection` via `event.currentTarget.value` (not `event.target.value` — buttons have inner spans so target may be a child element)
- `Homepage` conditionally renders sections based on `activeSection`: `"experience"`, `"projects"`, `"blog"`, `"admin"`, `"debt-tracker"`, `"pomodoro"`
- Admin-only pages (`DebtTracker`, `Pomodoro`) receive `setActiveSection` as a prop and render a `← Admin Portal` back button that calls `setActiveSection("admin")`

**Two-column layout (desktop ≥1200px):**
- `Homepage` renders a `.layout` flex row containing `.sidebar` and `.section`
- `.sidebar` is `position: sticky; height: 100vh` — holds the `Header` component
- `.section` is the scrollable content area on the right
- Below 1200px, layout collapses to single-column stacked

**Blog post pattern:**
Each blog post is a standalone component in `src/components/BlogPosts/<PostName>/`. New posts should use the shared `BlogPost` wrapper component (`src/components/BlogPosts/BlogPost/BlogPost.jsx`), which accepts `header`, `shortText`, `datePosted`, `topic` props and renders children as the expanded content. After creating a new post component, add it to `src/components/Blog/Blog.jsx` (newest first).

**Admin portal pages:**
`AdminPortal` renders a grid of `ProjectCard` components from a hardcoded `projects` array in `AdminPortal.jsx`. Each card can link to an internal route (via `internalRoute`) or an external URL. To add a new tool, add an entry to that array and a corresponding render case in `Homepage.jsx`.

**Data as JSX props (not a CMS):**
Experience entries live as a hardcoded array in `Experience.jsx`; projects live in `Projects.jsx`. To add/update content, edit those arrays directly.

**Styling:** CSS Modules (`.module.css`) colocated with each component. No global CSS framework. Note: tag selectors (e.g. `button`, `h1`) in CSS Modules are NOT scoped — only class and ID selectors get hashed. The global `button { all: unset }` rule lives in `Header.module.css` and applies sitewide. A `button:hover { text-decoration: underline }` rule also applies globally — override with `text-decoration: none` on specific hover selectors when unwanted.

**Debt Tracker ownership model:**
Each debt has an `owners: string[]` field storing `["Jabez"]`, `["August"]`, or `["Jabez", "August"]`. The `DebtTracker` page holds `activeView` state (`"Jabez"` | `"August"` | `"Household"`) and derives `filteredDebts` from it — all downstream components (SummaryBar, debt list, projections, WhatIfCalculator) consume `filteredDebts`, not the full `debts` array. Shared debts appear in both individual views and in Household. The owners are hardcoded to Jabez and August in `DebtForm.jsx` (`OWNERS` constant) — do not make this configurable without revisiting the filtering logic. The `owners` column is a Postgres `TEXT[]`; it is added via `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` in `initDB()`.

**Backend API routes:**
- `/api/debts` — debt CRUD (no auth required); `POST` and `PUT` accept an `owners` array
- `/api/settings` — payoff strategy settings (no auth required)
- `/api/login` — returns JWT on valid credentials
- `/api/pomodoro/sessions` — pomodoro session CRUD (JWT required via `authenticateToken` middleware)

New admin-only API routes should use the `authenticateToken` middleware. Pass the token from `sessionStorage.getItem("adminToken")` in an `Authorization: Bearer <token>` header.

---

## Design System

### Color Palette

CSS variables are defined in `App.css` and re-declared in `Header.module.css`:

| Variable              | Value                    | Usage                                                  |
|-----------------------|--------------------------|--------------------------------------------------------|
| `--maroon`            | `#7d0a0a`                | Primary headings, active nav, bold accents             |
| `--red`               | `#bf3131`                | Secondary headings, nav labels, dates, card hover      |
| `--beige`             | `#ead196`                | Sidebar background, skill pill background, card border |
| `--yellow`            | `#f3edc8`                | Card backgrounds (blog, project, experience)           |
| `--yellow-background` | `hsl(52, 64%, 92.5%)`    | Page background (`html`)                               |

### Typography

- **Font stack:** System sans-serif (`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...`), set globally in `index.css`. No external fonts.
- **Code font:** `'Courier New', Courier, monospace` — used for inline code, dates, and any monospaced metadata
- **Heading colors:** `h1` → `--maroon`, `h2` → `--red`
- **Name (sidebar h1):** `1.75rem`, `--maroon`
- **Job title:** `1rem`, `--red`, `font-weight: normal`
- **Bio text:** `0.875rem`, `line-height: 1.6`, `#5a3a3a` (muted warm tone)
- **Dates (Job, Blog):** `0.75–0.85rem`, bold, monospace, `--maroon` or `--red`
- **Meta labels (topic, field labels):** `0.72–0.75rem`, bold, uppercase, `letter-spacing: 0.06–0.1em`, `--red`
- **Body text:** default size and color

### Card Pattern

Used by Blog posts, Projects, and Experience entries:
- Background: `var(--yellow)`
- Left border: `3px solid var(--beige)` at rest
- Hover: `border-left-color` transitions to `var(--red)` (`transition: border-color 0.15s ease`)
- No `box-shadow`, no `transform` on hover
- Padding: `1.25rem 1.5rem`

### Buttons

Global reset in `Header.module.css`: `button { all: unset; font-size: 1.3rem; color: var(--red); }` — applies to all buttons sitewide.

Named button variants:
- **Nav button** (`.navBtn`): flex row with outlined dot + label + subtitle. `text-decoration: none` on hover, color shifts to `--maroon`. Uses `event.currentTarget.value` for click handling.
- **Beige fill** (login submit): `background: var(--beige)`, `color: var(--maroon)`, full-width. Hover darkens the beige slightly. `text-decoration: none` override required.
- **Text CTA** (blog "Read →"): `all: unset`, `font-size: 0.8rem`, bold, `--red`. No underline on hover.
- **Discrete link** (portal, sign out): `font-size: 0.75rem`, `color: #aaa`, hover shifts to `--maroon` or `--red`.

### Navigation

**Desktop sidebar (≥1200px):**
- Vertical flex column, `gap: 0`
- Each item: outlined circle dot (`9px`, `border: 2px solid var(--red)`) + `.navContent` (label + subtitle)
- Active: dot fills `--maroon`, label color `--maroon`, `font-weight: bold`
- Label: `1rem`, bold, uppercase, `letter-spacing: 0.07em`
- Subtitle: `0.78rem`, `#9a6a6a`, normal weight — hidden on mobile

**Mobile single-column (≤1199px):**
- Horizontal flex row, `gap: 1.5rem`
- Dots hidden; tab-style underline instead
- Active item: `border-bottom: 2px solid var(--maroon)`, overlapping a `border-bottom: 2px solid var(--beige)` on the row

### Experience Timeline

- `.experiences` has `border-left: 2px solid var(--beige)` and `padding-left: 1.5rem`
- Each `Job` wrapper `div::before`: `10px` circle, `background: var(--maroon)`, `position: absolute`, aligned to the left border

### Skill Pills

Rendered by `Skill.jsx`. Pill shape via `border-radius: 50px`, background `--beige`, text `0.8em` bold `--maroon`, horizontal padding `20px`. Used in Experience and Projects footers.

### Layout

- **Page max-width:** At `≥1200px`, body is `65%` width centered (`margin-left: 15%`). Below that, `95%` width with `2.5%` margins.
- **Desktop two-column:** `.sidebar` is `38%` wide (sticky, `height: 100vh`), `.section` is `flex: 1` with `padding-left: 5%`
- **Lists (Blog, Projects):** `flex-direction: column; gap: 1.5rem`
- **Experience:** `flex-direction: column; gap: 2.5em` with timeline border
- **Skill tag rows:** `flex-direction: row; flex-wrap: wrap; gap: 10px`

### Code Blocks (in blog posts)

Styled in `BlogPost.module.css`, scoped under `.blogOverlay`:

- **Inline `<code>`:** background `rgba(0,0,0,0.07)`, color `#c7254e`, `border-radius: 3px`, padding `0.15em 0.45em`, font-size `0.88em`
- **`<pre>` block:** background `#1e1e1e` (dark), `border-left: 3px solid var(--red)`, `border-radius: 8px`, padding `1.25rem 1.5rem`, font-size `0.875rem`, `line-height: 1.65`
- **`<pre code>`:** color `#d4d4d4`, background reset to none
