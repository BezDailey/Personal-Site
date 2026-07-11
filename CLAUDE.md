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
- `Homepage` holds `activeSection` state; sections are `"experience"`, `"projects"`, `"skills"` (Blog exists as components but is not currently in the nav — see roadmap #5)
- Nav buttons live in the shared `Nav` component (`src/components/Nav/Nav.jsx`), rendered twice: once inside `Header` with `variant="sidebar"` (desktop only) and once directly in `Homepage` with `variant="bar"` (sticky mobile tab bar, hidden ≥1200px). The mobile bar must stay a direct child of `.layout` — `position: sticky` is bounded by the parent element, so it would not stick if nested inside the header
- Nav buttons call `setActiveSection` via `event.currentTarget.value` (not `event.target.value` — buttons have inner spans so target may be a child element)
- Section content is wrapped in a `div` keyed by `activeSection` with a `.fade` class (`Homepage.module.css`) — remounting triggers a 0.2s fade/slide-in animation on every switch (disabled under `prefers-reduced-motion`)

**Two-column layout (desktop ≥1200px):**
- `Homepage` renders a `.layout` flex row containing `.sidebar` and `.section`
- `.sidebar` is `position: sticky; height: 100vh` — holds the `Header` component
- `.section` is the scrollable content area on the right
- Below 1200px, layout collapses to single-column stacked: dark header block, then sticky tab bar, then content, then `Footer` (footer is mobile-only; desktop shows icons/links in the sidebar instead)

**Blog post pattern:**
Each blog post is a standalone component in `src/components/BlogPosts/<PostName>/`. New posts should use the shared `BlogPost` wrapper component (`src/components/BlogPosts/BlogPost/BlogPost.jsx`), which accepts `header`, `shortText`, `datePosted`, `topic` props and renders children as the expanded content. After creating a new post component, add it to `src/components/Blog/Blog.jsx` (newest first).

**Data as JSX props (not a CMS):**
Experience entries live as a hardcoded array in `Experience.jsx`; projects live in `Projects.jsx`; skill groups live in `Skills.jsx`. To add/update content, edit those arrays directly.

**Styling:** CSS Modules (`.module.css`) colocated with each component. No global CSS framework. Note: tag selectors (e.g. `button`, `h1`) in CSS Modules are NOT scoped — only class and ID selectors get hashed. The global `button { all: unset }` reset and the global `button:focus-visible` / `a:focus-visible` outline styles live in `Header.module.css` and apply sitewide. A `button:hover { text-decoration: underline }` rule also applies globally — override with `text-decoration: none` on specific hover selectors when unwanted.

**Backend:**
The Express server (`server.js`) serves the static frontend build. Admin features (login, debt tracker, pomodoro) are being removed — all UI entry points (the "⌘ Portal" buttons) are gone and `Homepage` no longer renders those sections; the page components still exist on disk pending full removal (see GitHub project board).

**Planned features (GitHub project board):**
- Re-enable Blog section in navigation (#5)
- Migrate from Create React App to Vite (#6)
- Add downloadable resume/PDF link (#7) — the sidebar "↓ Resume" link points to `/resume.pdf`; the PDF still needs to be added to `frontend/public/`
- Add dark mode support (#8)
- Add SEO meta tags and Open Graph support (#9)
- Add contact form or email link (#10) — done (mailto link in Header)
- Add page transition animations (#11) — done (section fade-in)
- Filter projects and experience by technology (#12)

---

## Design System

### Color Palette

CSS variables are defined in `App.css`:

| Variable     | Value     | Usage                                                       |
|--------------|-----------|-------------------------------------------------------------|
| `--ink`      | `#1a1a2e` | Primary text, headings, desktop nav active state            |
| `--slate`    | `#16213e` | Dark header/footer background (mobile), mobile tab bar      |
| `--stone`    | `#e8e4dd` | Page background (`html`)                                    |
| `--signal`   | `#e94560` | Accent: subtitles, active nav dot/underline, hovers, focus  |
| `--mist`     | `#f5f3ef` | Card and skill-pill backgrounds                             |
| `--graphite` | `#6b6b7b` | Muted text: dates, skills lines, desktop nav resting state  |

Legacy aliases (`--maroon`, `--red`, `--beige`, `--yellow`, `--yellow-background`) map onto the new palette for old admin pages — do not use them in new code.

### Typography

Google Fonts loaded in `public/index.html`:
- **Inter** — body text (set on `body` in `index.css`)
- **Space Grotesk** — display: name, section headings, entry/card titles, nav labels
- **JetBrains Mono** — metadata: job-title line, dates, skills lines, pills, group labels, contact links

Conventions:
- **Name (header h1):** Space Grotesk, `1.75rem` mobile / `2rem` desktop, `#fff` on mobile, `--ink` on desktop
- **Title line (header h2):** JetBrains Mono, `0.8rem`, `--signal`
- **Bio:** `0.85rem`, `line-height: 1.6`, translucent white on mobile / `--graphite` on desktop
- **Entry titles (Job/Project):** Space Grotesk, `1.1–1.15rem`, weight 600, `--ink`
- **Employer/location line:** `0.85rem`, `--signal`
- **Dates:** JetBrains Mono, `0.72rem`, `--graphite`
- **Skills line (under entries):** JetBrains Mono, `0.72rem`, `--graphite`, prefixed with `▸`
- **Group labels (Skills section):** JetBrains Mono, `0.7rem`, uppercase, `letter-spacing: 0.1em`, `--graphite`

### Entry Pattern (Experience)

Job entries (`Job.module.css`) are flat rows separated by hairlines, not cards:
- `padding: 1.5rem 1rem` with negative left/right margins so text stays aligned with the column edge
- `border-bottom: 1px solid rgba(0,0,0,0.08)` between entries (none on last)
- Transparent `border-left: 2px` at rest; on hover the border turns `--signal` and background tints `rgba(233,69,96,0.04)` (0.2s ease)

### Card Pattern (Projects)

Project cards (`Project.module.css`):
- Background `--mist`, `border-radius: 4px`, `border: 1px solid rgba(0,0,0,0.06)`, `padding: 1.5rem`
- Hover: `box-shadow: 0 4px 20px rgba(233,69,96,0.1)` + `translateY(-1px)`
- "Building" badge: JetBrains Mono, uppercase, `--signal` on `rgba(233,69,96,0.08)`

### Buttons & Links

Global reset in `Header.module.css`: `button { all: unset; font-size: 1.3rem; color: var(--signal); }` — applies sitewide. Because `all: unset` strips focus outlines, `Header.module.css` also defines global `button:focus-visible, a:focus-visible { outline: 2px solid var(--signal) }` — keep this when adding interactive elements.

- **Nav button** (`Nav.module.css` `.navBtn`): dot + uppercase Space Grotesk label + subtitle. See Navigation below.
- **Contact/resume links** (`Header.module.css` `.action`): JetBrains Mono `0.75rem`, translucent white (mobile) / `--graphite` (desktop), hover `--signal`. Resume points to `/resume.pdf`.

### Navigation

Both variants live in `Nav.module.css`; buttons share `.navBtn` / `.active` / `.dotOutline` / `.navLabel` / `.navSub` classes.

**Desktop sidebar (`variant="sidebar"`, shown ≥1200px):**
- Vertical flex column under a `border-top` hairline
- Each item: outlined dot (`8px`, border `--graphite`) + label + subtitle
- Resting color `--graphite`; active/hover `--ink`; active dot fills `--signal`
- Label: Space Grotesk `0.85rem`, weight 600, uppercase, `letter-spacing: 0.1em`

**Mobile tab bar (`variant="bar"`, hidden ≥1200px):**
- Rendered by `Homepage` between the header and content; `position: sticky; top: 0; z-index: 10` with `--slate` background so it stays pinned while scrolling
- Horizontal row, left-aligned, `gap: 1.5rem` (`2rem` ≥768px) — tabs are grouped, not spread with `space-between`
- Dots and subtitles hidden; active tab gets a `border-bottom: 2px solid var(--signal)` underline overlapping the bar's translucent white bottom border

### Skill Pills

Rendered by `Skill.jsx`: background `--mist`, `border-radius: 4px`, `1px` translucent border, JetBrains Mono `0.75rem` `--ink`, padding `0.3rem 0.75rem`. Used in the Skills section groups.

### Layout

- **Page max-width:** At `≥1200px`, `body` is capped at `max-width: 1100px` and centered (`margin: 0 auto`) with `2.5%` side padding. Below that, full width.
- **Desktop two-column:** `.sidebar` is `38%` wide (sticky, `height: 100vh`), `.section` is `flex: 1` with `padding: 2.5rem 5%`
- **Section transitions:** `.fade` in `Homepage.module.css` — `fadeIn` keyframes (opacity + 6px translateY, 0.2s), disabled under `prefers-reduced-motion`
- **Lists:** Projects `gap: 1rem`; Experience entries `gap: 0` (hairline-separated); Skills groups `gap: 1.25rem`
- **Skill pill rows:** `flex-direction: row; flex-wrap: wrap; gap: 8px`

### Code Blocks (in blog posts)

Styled in `BlogPost.module.css`, scoped under `.blogOverlay`:

- **Inline `<code>`:** background `rgba(0,0,0,0.07)`, color `#c7254e`, `border-radius: 3px`, padding `0.15em 0.45em`, font-size `0.88em`
- **`<pre>` block:** background `#1e1e1e` (dark), `border-left: 3px solid var(--red)`, `border-radius: 8px`, padding `1.25rem 1.5rem`, font-size `0.875rem`, `line-height: 1.65`
- **`<pre code>`:** color `#d4d4d4`, background reset to none
