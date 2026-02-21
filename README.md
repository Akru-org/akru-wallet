# Akru

**Invertir, sin tanto cuento.**

A sandbox fintech web application that simulates a broker-style experience. No real money, no real trades—just a clean UI/UX and architectural demo for spot-style investing flows.

---

## Description

Akru is a **sandbox broker-style application** for demonstration and learning. It simulates:

- **Spot-only trading** — No leverage, no futures. Simulated buy/sell of assets.
- **Mock assets** — BTC, ETH, selected ETFs, and Venezuelan stocks (all fake data).
- **Fake wallet** — Simulated balances and deposits for demo purposes only.

Nothing is connected to real markets or real funds. All data and transactions are simulated.

---

## ⚠️ Sandbox disclaimer

**This is not financial advice.** Akru is a demo application.

- **No real transactions occur.** All trades and deposits are simulated.
- **No real funds are stored.** Balances exist only in local/sandbox state.
- **This is a UI/UX and architectural demo.** Use it to explore flows and structure, not to invest.

Do not use Akru for real investing or with real money.

---

## Features

- **Firebase Authentication** — Login, Register, Reset Password, and optional Google sign-in.
- **Protected routes** — App shell and core pages require authentication.
- **Dark / Light mode** — Theme support for a comfortable experience.
- **Spot-only simulated trading** — Browse and “trade” mock assets (crypto, ETFs, Venezuela).
- **Mock market data** — Static or simulated prices for demo.
- **Wallet with simulated balances** — Simulated deposits and balances by currency.
- **Transaction history** — In-app record of simulated movements.
- **KYC demo flow** — Simulated verification (auto-approved in sandbox).

---

## Tech stack

| Layer        | Technology   |
| ------------ | ----------- |
| Build       | Vite        |
| UI          | React       |
| Language    | TypeScript  |
| Styling     | Tailwind CSS |
| Auth        | Firebase    |
| State       | Zustand     |

---

## Project structure

```
src/
  assets/     # Images, icons, SVGs (e.g. logo, Google icon)
  config/     # App config (e.g. Firebase initialization)
  constants/  # Route paths, nav items, i18n-style constants
  components/ # Reusable UI and layout (auth, layout, market, wallet, ui)
  data/       # Mock market and asset data (crypto, ETFs, Venezuela)
  hooks/      # Global hooks (e.g. useAuth, useToast)
  interfaces/ # Shared TypeScript interfaces
  lib/        # Small utilities (e.g. cn, theme helpers)
  navigator/  # React Router config (AuthRoutes, CoreRoutes, router)
  pages/      # Route-level screens (Auth: Login, Register, ForgotPassword; Core: Home, Markets, Wallet, Profile, KYC)
  store/      # Zustand stores (auth, wallet, market, ui)
  utils/      # Helpers (e.g. Firebase error mapping, API client)
```

- **assets** — Static assets.
- **config** — Firebase and other app-wide configuration.
- **constants** — Centralized routes, navigation items, and similar constants.
- **components** — Shared components and layout building blocks.
- **data** — Mock datasets for markets and assets.
- **hooks** — Shared React hooks (auth, toast, etc.).
- **interfaces** — Shared types/interfaces.
- **lib** — Lightweight utilities used across the app.
- **navigator** — Routing setup and route definitions.
- **pages** — Page components grouped by area (Auth vs Core).
- **store** — Global state (Zustand).
- **utils** — Domain-oriented helpers (errors, API, etc.).

---

## Getting started

**Prerequisites:** Node.js (LTS) and npm (or equivalent).

```bash
git clone <repository-url>
cd akru-wallet

npm install
npm run dev
```

The app will run locally (e.g. `http://localhost:5173` with Vite).

### Firebase setup

Authentication is handled by Firebase. Configure your project in:

- **`src/config/firebase.ts`**

Add your Firebase config (API key, project ID, etc.). You can use environment variables (e.g. `import.meta.env.VITE_*`) and reference them in `firebase.ts` so credentials are not committed.

Without valid Firebase config, login, register, and password reset will not work.

---

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`  | Run ESLint               |
| `npm run test`  | Run tests                |

---

## Roadmap

Possible future improvements (no commitment):

- Real or live price feeds (still in sandbox mode).
- Real backend API for persistence and consistency.
- More realistic wallet engine (simulated ledger, PnL).
- Richer charting and market views.
- Portfolio analytics and performance views.

---

## License

MIT License. See the [LICENSE](LICENSE) file for details.

**Short summary:** You may use, copy, modify, and distribute this software under the condition that the original license and copyright notice are included. No warranty is provided.
