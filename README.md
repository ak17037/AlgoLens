# AlgoLens — Unified Competitive Programming Analytics Dashboard

**College Mini-Project | Frontend Development with React JS**

> "You solve on LeetCode, grind Codeforces, climb CodeChef stars. AlgoLens unifies it all into one clear picture — what's improving, what's stalling, what to do next."

---

## 1. Introduction

**AlgoLens** is a fully client-side, single-page React application (SPA) that acts as a **unified analytics dashboard for competitive programmers**. DSA practice is scattered across 3–4 platforms (LeetCode, Codeforces, CodeChef, GeeksforGeeks) with no single place to see the combined picture.

AlgoLens simulates a real analytics product: it takes structured profile data (mock data standing in for what a live API would return) and renders it as an **interactive, multi-page dashboard** — complete with topic-wise mastery, cross-platform rating conversion, goal tracking, interview-readiness scoring, and an AI-style coach advisory system.

Built to demonstrate: component-based React architecture, local-storage auth, custom SVG data-visualization, and a professional design system — with **no charting library and no backend**.

---

## 2. Problem Statement

A DSA student cannot easily answer:

- Am I actually improving, or just solving more Easy problems?
- Which topic (Graphs, DP, Trees) is my weak point across all platforms?
- If my CodeChef rating is 1620, what is that on Codeforces?
- Am I interview-ready for FAANG vs. a startup vs. FinTech?

AlgoLens answers all of this in one unified dashboard using only frontend logic.

---

## 3. Tech Stack

| Layer          | Technology                               | Purpose                                         |
|----------------|------------------------------------------|-------------------------------------------------|
| UI Library     | React 19 (Functional Components + Hooks) | Component tree & reactive rendering             |
| Build Tool     | Vite 8                                   | Fast dev server & production bundling           |
| Icons          | lucide-react                             | SVG icon set (Compass, BarChart3, Target, etc.) |
| Styling        | Plain CSS + CSS Variable Design Tokens   | Theming (`--primary`, `--paper`, `--ink`, etc.) |
| Fonts          | Plus Jakarta Sans, JetBrains Mono        | Loaded via Google Fonts                         |
| Charts         | Hand-built SVG + trigonometry            | Custom animated Radar Chart (no library)        |
| Auth           | localStorage session management          | Register / Login / 7-day session persistence    |
| Linting        | oxlint                                   | Fast JS/JSX linting                             |
| Language       | JavaScript ES6+, JSX                     | Application logic                               |

All data is local and in-memory (`src/data/mockData.js`) — fully client-side, easy to run and demo.

---

## 4. Application Pages (6-Page Structure)

| Page ID | Route Label        | Description                                                                                   |
|---------|--------------------|-----------------------------------------------------------------------------------------------|
| Landing | `/`                | Marketing landing page with feature highlights, profile samples, and "Enter Dashboard" CTA    |
| Login   | Auth gate          | Split-panel login/signup with hero artwork; supports Demo Login and real localStorage auth    |
| p1      | Overview           | Hero section with live animated Radar Skill Map, key metrics strip, and preset profiles        |
| p2      | Current Progress   | Platform disparity explainer + Live Cross-Platform Rating Translator (LC <> CF <> CC <> GFG) |
| p3      | Analytics Engine   | 4 metric explanations (Growth, Consistency, Topic Accuracy, Contest) + interactive roll-up    |
| p4      | Goals & Readiness  | Dynamic goal slider + FAANG / FinTech / Startup interview readiness benchmark tabs            |
| p5      | Live Dashboard     | Full KPI panel with 4 stats, topic breakdown with filters, and coach diagnostic note           |
| p6      | Tech Stack         | Self-documenting tech syllabus with interactive layer inspector                               |

---

## 5. Project Structure

```
AlgoLens/
+-- index.html
+-- vite.config.js
+-- package.json
+-- public/
¦   +-- algolens-login-hero.jpg       # Custom hero artwork for login page
+-- src/
    +-- main.jsx                      # ReactDOM root render (StrictMode)
    +-- App.jsx                       # ROOT — routing, layout, state, keyboard nav
    +-- App.css                       # App-level styles (nav-link-btn, etc.)
    +-- index.css                     # Global design system & CSS token definitions
    ¦
    +-- components/
    ¦   +-- Sidebar.jsx               # Collapsible left nav with logout button
    ¦   +-- TopHeader.jsx             # Top bar with page title and sidebar toggle
    ¦   +-- Footer.jsx                # Footer with brand + scroll-to-top
    ¦   +-- RadarChart.jsx            # Custom animated SVG radar chart
    ¦   +-- Navbar.jsx                # Landing page sticky navbar (9 sections, profile selector)
    ¦   +-- PageDots.jsx              # Landing page dot-based section indicators
    ¦   +-- PagePagination.jsx        # Landing page prev/next page controls
    ¦
    +-- pages/
    ¦   +-- LandingPage.jsx           # Marketing landing (uses Navbar, PageDots, PagePagination)
    ¦   +-- LoginPage.jsx             # Redesigned split-panel auth page
    ¦   +-- ComingSoonPage.jsx        # Fallback placeholder for unimplemented pages
    ¦   +-- OverviewPage.jsx          # p1 — Hero + interactive radar skill map
    ¦   +-- ProblemPage.jsx           # p2 — Platform disparity + rating translator
    ¦   +-- AnalyticsPage.jsx         # p3 — Analytics engine + live consistency calculator
    ¦   +-- GoalsReadinessPage.jsx    # p4 — Goal tracker + readiness by role
    ¦   +-- DashboardPage.jsx         # p5 — KPI dashboard + topic gaps + coach note
    ¦   +-- TechStackPage.jsx         # p6 — Tech/syllabus layer inspector
    ¦
    +-- data/
        +-- mockData.js               # PROFILES, PLATFORM_SPECS, RADAR_PRESETS, TECH_STACK
        +-- conversionMap.js          # Cross-platform rating formulas + DIFFICULTY_TIERS
        +-- authUtils.js              # localStorage auth: register, login, session, logout
```

---

## 6. System Architecture & Application Flow

State-driven SPA — no `react-router`. Navigation is pure React state, like a slide deck.

```
main.jsx  mounts <App/>
      |
      v
   App.jsx (ROOT STATE OWNER)
   state: activePageId, activeProfile, sidebarCollapsed,
          pageTransitioning, showLanding, showLogin, isAuthenticated
      |
      +-- showLanding=true  -->  <LandingPage onEnterDashboard />
      |
      +-- showLogin=true    -->  <LoginPage onLoginSuccess, onBackToHome />
      |
      +-- authenticated     -->  Dashboard Layout
                +-- Sidebar (collapsible, logout)
                +-- TopHeader (page title, sidebar toggle)
                +-- <main> renders active page via renderCurrentPage()
                |     p1 Overview  p2 Problem  p3 Analytics
                |     p4 Goals     p5 Dashboard  p6 TechStack
                +-- Footer (scroll-to-top)
```

**Data flow (props down, events up):**

```
mockData.js (PROFILES source of truth)
      -> App.jsx useState(activeProfile)
      -> passed as prop to every page
      -> page reads profile.xyz and renders UI
      -> user interacts (slider / filter / profile switch)
      -> callback prop fires (onNavigate / onSelectProfile / onChange)
      -> App.jsx setState -> React re-renders
```

**Runtime flow:**
1. `main.jsx` renders `<App/>` inside `StrictMode`.
2. `App.jsx` checks `isLoggedIn()` via `authUtils.js` (localStorage session).
3. If not authenticated ? Landing page ? Login page gate.
4. After successful login/demo-login ? Dashboard loads.
5. Active page is rendered via `renderCurrentPage()` switching on `activePageId`.
6. Keyboard shortcuts: number keys `1–6` jump to pages; `ArrowLeft`/`ArrowRight` flip between pages.
7. Profile switching (navbar dropdown or Dashboard buttons) updates `activeProfile` — every page re-renders instantly.
8. Pages hold local `useState` for UI-local state: radar sliders, topic filters, goal targets, readiness tabs, consistency toggles.

---

## 7. Core Modules Explained

### `App.jsx` — Root Router & State Container
Owns 7 state values. Manages the three-screen flow (Landing ? Login ? Dashboard). Handles keyboard navigation and page-transition animations (opacity + translateY fade).

### `authUtils.js` — localStorage Auth Layer
Provides `registerUser()`, `loginUser()`, `logoutUser()`, `isLoggedIn()`, `getSession()`. Sessions are stored as JSON in `localStorage` with a 7-day expiry. Passwords are stored as plaintext (client-side demo only — not production-safe). Supports a "Demo Login" bypass that skips credentials entirely.

### `RadarChart.jsx` — Custom SVG Chart Engine
The most technical component. Built from raw SVG + trigonometry (zero chart libraries):
- Converts each skill score (0–1) to `(x,y)` via `angle = -90 + i*(360/n)` using `Math.cos()`/`Math.sin()`.
- Draws concentric reference polygons at 25/50/75/100%.
- Animates shape morphing with `requestAnimationFrame` + cubic ease-out interpolation.
- Supports interactive per-axis sliders for live "what-if" skill tuning.
- Accepts preset profiles from `RADAR_PRESETS` (Beginner, Balanced, Master, current profile).

### `mockData.js` — Structured Mock API Layer
Plays the role of a real API response:
- **`PROFILES`** — 3 demo users (Arjun, Priya, Alex) each with per-platform stats (LeetCode solved/rating, Codeforces rating/tier, CodeChef stars, GFG score), topic mastery scores, readiness by role, and AI coach quotes.
- **`PLATFORM_SPECS`** — Describes how each platform would be fetched live (GraphQL, REST API, scraper).
- **`RADAR_PRESETS`** — 4 skill profile archetypes for the Overview radar demo.
- **`TECH_STACK`** — 4 syllabus layers displayed on the Tech Stack page.

### `conversionMap.js` — Cross-Platform Intelligence Layer
Contains linear formulas that estimate one platform's rating from another (e.g. `cfRating = max(800, (lcRating - 1200) * 0.85 + 900)`). Also classifies ratings into `DIFFICULTY_TIERS` buckets: Beginner ? Standard ? Advanced ? Master/Grandmaster. Powers the interactive **Live Rating Translator** on ProblemPage.

### Page Components
Each page is a self-contained slide receiving `profile` + `onNavigate` props and holding its own local state:

| Page                  | Key Interactive Feature                                                    |
|-----------------------|----------------------------------------------------------------------------|
| `OverviewPage`        | Radar preset switcher + live per-axis slider tuning                        |
| `ProblemPage`         | LeetCode / Codeforces rating slider with live cross-platform translation   |
| `AnalyticsPage`       | 14-day consistency calendar (click to toggle days, score recalculates live)|
| `GoalsReadinessPage`  | Problem target slider + FAANG/FinTech/Startup readiness tab switcher       |
| `DashboardPage`       | Topic filter chips (All / Mastered / Needs Focus) + profile switcher       |
| `TechStackPage`       | 4-layer tech card selector + expanded syllabus breakdown inspector         |

---

## 8. Design System

A custom "editorial/paper" design language defined entirely in `src/index.css` via CSS variable tokens:

```css
/* Color Tokens */
--paper: #F8FAFC;       /* page background */
--panel: #FFFFFF;        /* card/panel surface */
--ink: #0F172A;          /* primary text */
--ink-dim: #475569;      /* secondary text */
--primary: #4F46E5;      /* indigo accent */
--teal: #0D9488;         /* success/platform color */
--gold: #D97706;         /* warning/highlight color */
--danger: #E11D48;       /* error/logout color */

/* Shared Radius Scale */
--radius-sm / --radius-md / --radius-lg / --radius-xl / --radius-full

/* Typography */
--font-sans: 'Plus Jakarta Sans', 'Inter', system-ui
--font-mono: 'JetBrains Mono'
```

**Utility classes:** `.wrap`, `.idx`, `.editorial-h1`, `.editorial-h2`, `.editorial-lede`, `.editorial-panel`, `.editorial-button`, `.editorial-badge`, `.grid-2`, `.grid-3`, `.mono`, `.display`

Every component consumes only these shared tokens — no ad-hoc color strings or magic numbers in component files.

---

## 9. Authentication Flow

```
Landing Page  -->  "Enter Dashboard" button
      |
      v
   isAuthenticated?
   Yes --> go straight to dashboard
   No  --> LoginPage (split panel: hero art left | form right)
            |
            +-- Sign Up tab  (name + email + password  -> registerUser())
            +-- Log In tab   (email + password         -> loginUser())
            +-- Demo Login   (bypasses auth, enters dashboard directly)
```

Session data is stored in `localStorage` under key `algolens_session` and expires after 7 days. Logout clears the session and returns to the Landing page.

---

## 10. How to Run Locally

```bash
# Clone the repo
git clone https://github.com/ak17037/algolens-main.git
cd algolens-main

# Install dependencies
npm install

# Start the dev server
npm run dev        # http://localhost:5173

# Build for production
npm run build

# Preview the production build
npm run preview

# Run linter
npm run lint
```

> **Demo Login**: On the login page, click **"Demo Login"** to enter the dashboard without creating an account.

---

## 11. Sample Profiles (Mock Data)

| Profile      | Handle       | Solved | LC Rating | CF Tier              | CC Stars | Streak |
|--------------|--------------|--------|-----------|----------------------|----------|--------|
| Arjun Kumar  | `ak123`      | 324    | 1715      | Pupil (1250)         | 3 stars  | 21d    |
| Priya Sharma | `priyacodes` | 542    | 1940      | Specialist (1580)    | 4 stars  | 48d    |
| Alex Chen    | `alexp_cp`   | 780    | 2180      | Cand. Master (1820)  | 5 stars  | 112d   |

---

## 12. Applications & Use Cases

- **Students** — one dashboard to track DSA prep before placements/interviews.
- **Coding clubs/colleges** — extend into a batch leaderboard (multi-profile support already in `PROFILES`).
- **Interview prep** — maps practice data directly to company-tier benchmarks (FAANG, FinTech, Startups).
- **Portfolio project** — showcases component architecture, custom SVG charts, state lifting, localStorage auth, and a production-grade design system.

---

## 13. Known Limitations

- Data is fully mocked — no live platform API integration yet.
- `localStorage`-based auth stores passwords as plaintext (client-side demo only).
- Manual edits (e.g. radar sliders, consistency toggles) reset on browser refresh.
- Rating-conversion formulas are simplified linear approximations, not statistically validated.
- The dashboard currently routes only `OverviewPage` (p1) as the live page; p2–p6 show a "Coming Soon" placeholder in App routing (the individual page files are fully built and ready to wire up).

---

## 14. Future Scope

- Integrate real LeetCode (GraphQL), Codeforces (REST API), CodeChef, and GFG APIs as documented in `PLATFORM_SPECS`.
- Add a Node/Express + MongoDB backend for persistent user accounts and history.
- Wire all 6 page slots in `App.jsx` to their fully-built page components.
- Replace the linear conversion formulas with a regression model trained on real contest data.
- Add dark mode via a CSS token swap.
- Add email verification and hashed passwords for production-grade auth.

---

## 15. Conclusion

AlgoLens shows how a purely frontend React app — with no backend — can simulate a fully functional analytics product through smart mock-data design, a localStorage auth system, custom SVG visualization, and a clean token-based design system. It reflects core HTML/CSS, JavaScript ES6+, DOM manipulation, and React fundamentals in one complete, cohesive showcase project.

---

*Project by ak17037 · Built with React 19 + Vite 8 · Styled with vanilla CSS design tokens*
