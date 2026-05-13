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
- `Header` renders nav buttons that call `setActiveSection`
- `Homepage` conditionally renders `<Experience>`, `<Projects>`, or `<Blog>` based on `activeSection`

**Blog post pattern:**
Each blog post is a standalone component in `src/components/BlogPosts/<PostName>/`. The older posts (DevLog1, DevLog2, etc.) manage their own open/close state internally. New posts should use the shared `BlogPost` wrapper component (`src/components/BlogPosts/BlogPost/BlogPost.jsx`), which accepts `header`, `shortText`, `datePosted`, `topic` props and renders children as the expanded content. After creating a new post component, add it to `src/components/Blog/Blog.jsx` (newest first).

**Data as JSX props (not a CMS):**
Experience entries live as a hardcoded array in `Experience.jsx`; projects live in `Projects.jsx`. To add/update content, edit those arrays directly.

**Styling:** CSS Modules (`.module.css`) colocated with each component. No global CSS framework.

## Design System

### Color Palette

CSS variables are defined in `App.css` and re-declared in `Header.module.css`:

| Variable             | Hex / Value              | Usage                                      |
|----------------------|--------------------------|--------------------------------------------|
| `--maroon`           | `#7d0a0a`                | Primary headings, active nav, bold accents |
| `--red`              | `#bf3131`                | Secondary headings, nav buttons, dates     |
| `--beige`            | `#ead196`                | Header background, skill pill background   |
| `--yellow`           | `#f3edc8`                | Blog card background, blog overlay         |
| `--yellow-background`| `hsl(52, 64%, 92.5%)`    | Page background (`html`)                   |

### Typography

- **Font stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...` (system sans-serif), set globally in `index.css`
- **Code font:** `source-code-pro, Menlo, Monaco, Consolas, 'Courier New'`, applied to `<code>` globally
- **Heading colors:** `h1` → `--maroon`, `h2` → `--red`
- **Small/meta text:** `0.85–0.9rem`, bold, `--maroon`
- **Body text:** default size, default color

### Buttons

All buttons use `all: unset` (set globally in `Header.module.css`) — no border, no background, inherits font. Shared behavior:
- Default color: `--red`
- Hover: `text-decoration: underline`, `cursor: pointer`
- Active/selected nav button: `--maroon` + `font-weight: bold`

### Skill Pills

Rendered by `Skill.jsx`. Pill shape via `border-radius: 50px`, background `--beige`, text `0.8em` bold `--maroon`, horizontal padding `20px`.

### Layout

- **Page max-width:** At `≥1200px`, body is `65%` width centered with `15%` side margins. Below that, `95%` width with `2.5%` margins.
- **Section padding:** Main content sections use `width: 95%; padding-left: 2.5%; padding-right: 2.5%`
- **Header:** Full-width `--beige` background, `padding-top: 2rem`
- **Lists (Experience, Projects, Blog):** `flex-direction: column; gap: 10px`
- **Skill tag rows:** `flex-direction: row; flex-wrap: wrap; gap: 10px`

### Code Blocks (in blog posts)

Styled in `BlogPost.module.css`:
- `<code>` inline: background `#f5f5f5`, color `#c7254e`, `border-radius: 4px`, padding `0.2em 0.4em`
- `<pre>` block: background `#f5f5f5`, `border-radius: 6px`, `box-shadow: 0 0 0.25rem rgba(0,0,0,0.05)`, `padding: 1rem`
- `<pre code>`: background reset to none, color `#333`
