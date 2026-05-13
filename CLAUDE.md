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
