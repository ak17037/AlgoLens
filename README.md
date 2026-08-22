# AlgoLens — Unified Competitive Programming Analytics Dashboard

**College Mini-Project | Frontend Development with React JS**

> "You solve on LeetCode, grind Codeforces, climb CodeChef stars. AlgoLens unifies it all into one clear picture — what's improving, what's stalling, what to do next."

---

## 1. Introduction

AlgoLens is a **single-page React application (SPA)** that acts as a **unified analytics dashboard for competitive programmers**. DSA practice is usually scattered across 3–4 platforms (LeetCode, Codeforces, CodeChef, GeeksforGeeks) with no single place to see the combined picture.

AlgoLens simulates a real analytics product: it takes structured profile data (mock data standing in for what a live API would return) and renders it as an interactive dashboard — topic-wise mastery, cross-platform rating conversion, goal tracking, and interview-readiness scoring.

Built to demonstrate: component-based architecture, state management, custom SVG data-visualization, and clean UI/UX — with **no charting library and no backend**.

## 2. Problem Statement

A student cannot easily answer:
- Am I actually improving, or just solving more Easy problems?
- Which topic (Graphs, DP, Trees) is my weak point?
- If my CodeChef rating is 1620, what's that on Codeforces?
- Am I interview-ready for FAANG vs. a startup?

AlgoLens answers all of this in one dashboard, using only frontend logic (MVP/prototype layer — no backend yet).

## 3. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| UI Library | React 19 (Functional Components + Hooks) | Component tree & reactive rendering |
| Build Tool | Vite 8 | Dev server & production bundling |
| Icons | lucide-react | SVG icon set |
| Styling | Plain CSS + CSS variable design tokens | Theming (`--primary`, `--paper`, `--ink`) |
| Linting | oxlint | Fast JS/JSX linting |
| Charts | Hand-built SVG + trigonometry | Custom animated Radar Chart (no library) |
| Language | JavaScript ES6+, JSX | Application logic |

All data is local and in-memory (`src/data/mockData.js`) — fully client-side, easy to run/demo.

## 4. Project Structure (Blueprint)

```
AlgoLens/
├── index.html, vite.config.js, package.json
├── src/
│   ├── main.jsx           # ReactDOM root render
│   ├── App.jsx             # ROOT — routing, layout, keyboard nav
│   ├── components/
│   │   ├── Sidebar.jsx         # Nav + profile switcher
│   │   ├── TopHeader.jsx       # Top bar
│   │   ├── Footer.jsx          # Footer + scroll-to-top
│   │   ├── RadarChart.jsx      # Custom animated SVG skill chart
│   │   ├── PageDots.jsx / PagePagination.jsx
│   ├── pages/
│   │   ├── OverviewPage.jsx        # p1 — Hero + Radar map
│   │   ├── GoalsReadinessPage.jsx  # p4 — Goal tracker + readiness
│   │   ├── DashboardPage.jsx       # p5 — KPI dashboard + gaps
│   │   └── TechStackPage.jsx       # p6 — Tech stack explainer
│   └── data/
│       ├── mockData.js     # PROFILES, PLATFORM_SPECS, RADAR_PRESETS
│       └── conversionMap.js # Cross-platform rating formulas
└── public/ (favicon.svg, icons.svg)
```

> `App.jsx` also routes to `ProblemPage.jsx` (p2) and `AnalyticsPage.jsx` (p3) — part of the planned 6-page structure, not yet present in this build (see Future Scope).

## 5. System Architecture / Application Flow

Single root-state, multi-page SPA — no `react-router`; navigation is state-driven like a slide deck.

```
main.jsx → mounts <App/>
      │
      ▼
   App.jsx (ROOT STATE OWNER)
   state: activePageId, activeProfile, sidebarCollapsed, pageTransitioning
      │
      ├──► Sidebar (nav + profile switch)
      ├──► TopHeader
      └──► <main> renders active page via switch(activePageId)
                │
       p1 Overview → p2 Problem → p3 Analytics → p4 Goals → p5 Dashboard → p6 TechStack
```

**Data flow (props down, events up):**
```
mockData.js (PROFILES, source of truth)
      → App.jsx useState(activeProfile)
      → passed as prop to every page
      → page reads profile.xyz and renders UI
      → user interacts (slider / button / profile switch)
      → callback prop fires (onNavigate / onSelectProfile / onChange)
      → App.jsx setState updates → React re-renders
```

**Runtime flow:**
1. `main.jsx` renders `<App/>` inside `StrictMode`.
2. `App.jsx` defaults `activePageId='p1'`, `activeProfile=PROFILES[0]`.
3. Sidebar, TopHeader, active page, Footer render together; a top bar shows page progress %.
4. Clicking Sidebar items, number keys `1–6`, or arrow keys call `handleNavigate()`, updating `activePageId` with a short fade transition.
5. `renderCurrentPage()` switches on `activePageId` to mount the right page.
6. Switching profile (Sidebar dropdown / Dashboard buttons) updates `activeProfile` — every page re-renders instantly with the new user's stats.
7. Pages keep their own local `useState` for things that stay local: radar sliders, topic filters, goal target, readiness tab.

## 6. Core Modules Explained

**`App.jsx`** — lightweight router + state container; owns 4 state values, exposes `handleNavigate`/`handleScrollTop`; adds keyboard navigation.

**`RadarChart.jsx`** — the most technical piece. Built from raw SVG + trigonometry (no chart library): converts each skill score (0–1) to `(x,y)` via `angle = -90 + i*(360/n)` with `cos()/sin()`; draws concentric grids at 25/50/75/100%; animates shape morphing with `requestAnimationFrame` + cubic ease-out; ships interactive sliders for live "what-if" tuning.

**`mockData.js`** — plays the role of an API response: `PROFILES` (3 sample users with per-platform stats, topic mastery, readiness %, coach quotes), `PLATFORM_SPECS` (how each platform would be fetched live), `RADAR_PRESETS` (demo skill profiles), `TECH_STACK` (syllabus content).

**`conversionMap.js`** — linear formulas that estimate one platform's rating on another, e.g. `cfRating = max(800, (lcRating-1200)*0.85 + 900)`. Also classifies a rating into a `DIFFICULTY_TIERS` bucket (Beginner → Grandmaster). This is the app's "intelligence" layer.

**Page components** — each is a self-contained slide: receives `profile` + `onNavigate` as props, holds local UI state, renders an `editorial-panel`.
- *OverviewPage* — hero + live radar skill map with presets.
- *GoalsReadinessPage* — goal slider + FAANG/FinTech/Startup readiness tabs with progress bars.
- *DashboardPage* — 4 KPI cards, topic breakdown with filters, coach's diagnostic note.
- *TechStackPage* — documents the tech/syllabus layers (self-documenting page).

## 7. Design System

A custom "editorial/paper" language via CSS variable tokens (`--primary`, `--paper`, `--ink`, `--line`, `--radius-*`) so every component shares consistent spacing, color, and type — a small-scale version of production token systems (Material, Tailwind).

## 8. How to Run Locally

```bash
cd AlgoLens
npm install
npm run dev       # http://localhost:5173
npm run build      # production build
npm run preview    # preview the build
```

## 9. Applications & Use Cases

- **Students** — one dashboard to track DSA prep before placements/interviews.
- **Coding clubs/colleges** — extend into a batch leaderboard (multi-profile support already exists).
- **Interview prep** — maps practice data directly to company-tier benchmarks.
- **Portfolio project** — showcases component architecture, custom SVG charts, state lifting, design systems.

## 10. Limitations

- Data is fully mocked — no live platform API integration yet.
- No backend/auth/database — manual edits (e.g. radar sliders) reset on refresh.
- `ProblemPage` (p2) and `AnalyticsPage` (p3) are routed but not implemented.
- Rating-conversion formulas are simplified linear approximations, not statistically validated.

## 11. Future Scope

- Integrate real LeetCode/Codeforces/CodeChef/GFG APIs as hinted in `PLATFORM_SPECS`.
- Add a backend (Node/Express + MongoDB) for real, persistent user accounts.
- Build out `ProblemPage` and `AnalyticsPage` (trend graphs over time).
- Replace linear conversion with a regression model trained on real data.
- Add authentication for live, saved per-student profiles.

## 12. Conclusion

AlgoLens shows how a purely frontend React app, with no backend, can simulate a fully functional analytics product through smart mock-data design, custom SVG visualization, and clean component architecture — reflecting core HTML/CSS, JavaScript ES6+, DOM, and React fundamentals in one complete showcase project.

---
*Project by ak17037 · Built with React + Vite*
