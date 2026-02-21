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

- **Firebase Authentication** — Login and Register as **modals** (no dedicated routes); Forgot Password as a **full screen** at `/forgot-password`. Optional Google sign-in.
- **Public routes** — Market at `/` (main index) and Markets at `/markets` are visible to everyone.
- **Private routes** — Portfolio (`/app/portfolio`), Wallet (`/app/wallet`), KYC (`/app/kyc`), and Profile (`/app/profile`) require authentication.
- **Top navbar** — Mercado, Portafolio, Wallet, KYC; top-right shows Profile when logged in, or “Iniciar sesión” / “Registrarse” when not.
- **Dark / Light mode** — Theme support.
- **Spot-only simulated trading** — Market table with mock assets (crypto, ETFs, Venezuela), sparklines, and basic sorting.
- **Portfolio summary** — Private page with total balance, 24h change, breakdown (Crypto / ETFs / Venezuela), and “Recargar” link to Wallet.
- **Wallet with simulated balances** — Simulated deposits and balances by currency.
- **KYC demo flow** — Simulated verification (auto-approved in sandbox).

---

## Tech stack

| Layer     | Technology  |
| --------- | ---------- |
| Build     | Vite       |
| UI        | React      |
| Language  | TypeScript |
| Styling   | Tailwind CSS |
| Auth      | Firebase   |
| State     | Zustand    |

---

## Project structure

```
src/
  assets/      # Images, icons, SVGs (logo, Google icon)
  config/      # App config (Firebase initialization)
  constants/   # Route paths, nav items
  components/  # UI and layout (auth modals, layout, market, wallet, ui)
  contexts/    # React context (e.g. AuthModalContext for login/register modals)
  data/        # Mock market and asset data (crypto, ETFs, Venezuela)
  hooks/       # Global hooks (useAuth, useLogin, useRegister, useToast)
  interfaces/  # Shared TypeScript interfaces
  lib/         # Small utilities (cn, theme helpers)
  navigator/   # React Router (AuthRoutes, CoreRoutes, router)
  pages/       # Screens: Auth (ForgotPassword only); Core (Home, Markets, Portfolio, Wallet, Profile, KYC, NotFound)
  store/       # Zustand stores (auth, wallet, market, ui)
  utils/       # Helpers (Firebase error mapping, API client)
```

- **assets** — Static assets.
- **config** — Firebase and app-wide configuration.
- **constants** — Routes and navigation items.
- **components** — Reusable UI: auth (LoginModal, RegisterModal), layout (MainLayout, TopNav, BottomNav), market (MarketTable, PortfolioSummary, SparklineChart), wallet, ui.
- **contexts** — Auth modal state (open/close login or register modal, switch between them).
- **data** — Mock assets with price, changes, marketCap, volume, priceHistory for sparklines.
- **hooks** — useAuth, useLogin, useRegister, useToast, etc.
- **navigator** — Public routes (/, /markets), auth route (/forgot-password), protected routes (/app/portfolio, /app/wallet, /app/kyc, /app/profile).
- **pages** — Auth: only ForgotPassword. Core: Home (market table), Markets, Portfolio (summary), Wallet, Profile, KYC, NotFound.
- **store** — Global state.
- **utils** — Domain helpers.

---

## Getting started

**Prerequisites:** Node.js (LTS) and npm (or equivalent).

```bash
git clone <repository-url>
cd akru-wallet

npm install
npm run dev
```

The app runs locally (e.g. `http://localhost:5173` with Vite).

### Firebase setup

Authentication uses Firebase. Configure your project in:

- **`src/config/firebase.ts`**

Add your Firebase config (API key, project ID, etc.). Prefer environment variables (e.g. `import.meta.env.VITE_*`) in `firebase.ts` so credentials are not committed.

Without valid Firebase config, login, register, and password reset will not work.

---

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start dev server           |
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |
| `npm run test`    | Run tests                  |

---

## Roadmap

Possible future improvements (no commitment):

- Real or live price feeds (still sandbox).
- Real backend API for persistence.
- Richer portfolio analytics and performance views.
- Improved charting and market views.

---

## License

MIT License. See the [LICENSE](LICENSE) file for details.

**Short summary:** You may use, copy, modify, and distribute this software under the condition that the original license and copyright notice are included. No warranty is provided.
