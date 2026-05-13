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
   - React app: http://localhost:3000 (proxies `/api` to port 3001)
   - Express API: http://localhost:3001

Or run them separately:
```bash
node server.js          # API server
cd frontend && npm start  # React dev server
```

---

## Project Structure

```
/
├── server.js               # Express server — API routes, auth, static serving
├── frontend/               # React app (Create React App)
│   └── src/
│       ├── pages/          # Full-page views (Homepage, DebtTracker, AdminPortal)
│       ├── components/     # Reusable UI components
│       └── utils/
│           └── projections.js  # Debt payoff algorithm (avalanche/snowball)
└── scripts/
    └── migrate.js          # One-time data migration to Postgres
```

---

## Features

### Personal Site
- Experience, Projects, and Blog sections with no client-side routing (state-driven via `useState`)
- Blog posts use a shared `BlogPost` wrapper component

### Admin Portal
- Accessible via a discreet link in the footer
- Password-protected with JWT authentication (24h token stored in `sessionStorage`)
- Launchpad for hosted side projects

### Debt Payoff Tracker
- Add, edit, and delete debts
- Log payments and track balance progress
- **Avalanche** (highest APR first) and **Snowball** (lowest balance first) payoff strategies
- Extra monthly payment allocation to the priority target
- **Autopay** — configure a monthly amount and day; payments are auto-logged on page load when due
- **What If calculator** — slider for extra monthly payment + one-time lump sum (e.g. tax refund) with projected payoff date, months saved, and interest saved
- Summary bar with months-to-freedom countdown, target date, and total eliminated

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
