# jabezdailey.com

Personal website and admin portal for Jabez Dailey — Software Engineer at Deloitte, Morehouse College CS graduate, incoming Georgia Tech OMSCS student.

Live at **[jabezdailey.com](https://jabezdailey.com)**

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React (Create React App), CSS Modules |
| Backend | Node.js, Express |
| Database | PostgreSQL (Heroku Postgres) |
| Auth | JWT (jsonwebtoken) |
| Hosting | Heroku |

---

## Local Development

**Prerequisites:** Node.js, a running PostgreSQL instance (or Heroku Postgres connection string)

1. Clone the repo and install root dependencies:
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend && npm install && cd ..
   ```

3. Create a `.env` file in the root:
   ```
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_password
   JWT_SECRET=your_secret
   DATABASE_URL=postgres://...
   PORT=3001
   ```

4. Start both the Express server and React dev server concurrently:
   ```bash
   npm run dev
   ```
   - React app: `http://localhost:3000` (proxies `/api` to port 3001)
   - Express API: `http://localhost:3001`

Or run them separately:
```bash
node server.js            # API server
cd frontend && npm start  # React dev server
```

---

## Project Structure

```
/
├── server.js               # Express server — API routes, auth, static serving
├── frontend/               # React app (Create React App)
│   └── src/
│       ├── pages/
│       │   ├── Homepage/       # Main layout and section state manager
│       │   ├── AdminPortal/    # Auth-gated launchpad for admin tools
│       │   ├── DebtTracker/    # Debt payoff planner
│       │   └── Pomodoro/       # Pomodoro timer with session tracking
│       ├── components/     # Reusable UI components
│       └── utils/
│           └── projections.js  # Debt payoff algorithm (avalanche/snowball)
└── scripts/
    └── migrate.js          # One-time data migration to Postgres
```

---

## Features

### Personal Site
- Two-column layout on desktop (≥1200px): sticky sidebar with identity + nav, scrollable content on the right
- Experience, Projects, and Blog sections — no client-side routing, state-driven via `useState`
- Blog posts use a shared `BlogPost` wrapper component with expand/collapse

### Admin Portal
- Accessible via a discreet `⌘ Portal` link at the bottom of the sidebar (desktop) or footer (mobile)
- Password-protected with JWT authentication (24h token stored in `sessionStorage`)
- Launchpad for hosted admin tools — each tool launches as its own full-page section with a back button

### Pomodoro Timer
- 25/5/15 minute Work / Short Break / Long Break modes
- Task input required before starting a work session — carries through to the session log
- Sessions logged to PostgreSQL on natural completion (resets are not logged)
- Daily metrics: pomodoros completed, total focus time, per-task breakdown
- Scrollable session log grouped by date with per-entry delete
- Browser notifications on session completion
- API routes are JWT-protected (`Authorization: Bearer <token>`)

### Debt Payoff Tracker
- Add, edit, and delete debts
- Log payments and track balance progress
- **Avalanche** (highest APR first) and **Snowball** (lowest balance first) payoff strategies
- Extra monthly payment allocation to the priority target
- **Autopay** — configure a monthly amount and day; payments are auto-logged on page load when due
- **What If calculator** — slider for extra monthly payment + one-time lump sum with projected payoff date, months saved, and interest saved
- Summary bar with months-to-freedom countdown, target date, and total eliminated
- **Ownership & Household view** — each debt is assigned to Jabez, August, or both; a tab switcher filters the full UI (summary, debt list, projections, What-If) by owner; Household shows all debts combined

---

## Deployment

The app is deployed on Heroku. Pushing to `main` triggers an automatic build:

1. `heroku-postbuild` runs `cd frontend && npm install && npm run build`
2. `server.js` serves the static React build and handles all `/api` routes

**Required Heroku config vars:**
```
ADMIN_USERNAME
ADMIN_PASSWORD
JWT_SECRET
DATABASE_URL   (auto-set by Heroku Postgres add-on)
```

To provision the database (first time only):
```bash
heroku addons:create heroku-postgresql:essential-0 --app <app-name>
```

The database schema is created automatically on server start via `initDB()` in `server.js`.
