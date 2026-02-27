# 💸 CryptoDash v2.0

A modern, production-structured cryptocurrency dashboard built with **React 19 + TypeScript + TanStack Query v5**.

**CryptoDash** fetches live market data from the **CoinGecko API**, supports dynamic sorting/filtering, and provides detailed coin views with historical price charts.

---

## 🚀 Live Demo

[CryptoDash](https://crypto-dash-hazel-kappa.vercel.app)

![CryptoDash screen 1.](/src/assets/screen-1.png 'CryptoDash screen 1.')
![CryptoDash screen 2.](/src/assets/screen-2.png 'CryptoDash screen 2.')

---

## ✨ Features

### 📊 Markets Dashboard

- View top cryptocurrencies by market cap
- Server-side sorting (market cap, price, volume)
- Client-side filtering by name/symbol
- Adjustable results limit (10 / 20 / 50)
- Cached & background-refetched data via React Query

### 📈 Coin Detail Page

- Rank, price, supply, ATH/ATL, market data
- Historical 7-day price chart (Chart.js + time scale)
- Smart first-sentence description parsing
- External links (official site, blockchain explorer, forum)
- Cached coin responses for instant back-navigation

### ⚡ Performance & UX

- TanStack Query v5 for caching & background refetch
- Graceful error handling
- Strict TypeScript typing
- Loading + refreshing indicators
- Route-safe param handling
- Abort-safe network calls

---

## 🗂 Project Structure

```

src/
  api/
    coingecko.ts

  app/
    queryClient.ts

  components/
    CoinCard.tsx
    CoinChart.tsx
    FilterInput.tsx
    Header.tsx
    LimitSelector.tsx
    ScrollToTopButton.tsx
    SortSelector.tsx
    Spinner.tsx

  hooks/
    useCoinDetails.ts
    useMarkets.ts
    useScrollPosition.ts
    useWatchlist.ts

  pages/
    about.tsx
    coin-details.tsx
    home.tsx
    not-found.tsx

  types/
    coingecko.ts
    coinDetails.ts

  assets/
    screen-1.png
    screen-2.png

  App.tsx
  main.tsx
  index.css


```

---

## 🚧 Roadmap (v2+)

Planned enhancements:

- ⭐ Watchlist (localStorage-backed)
- 📊 Portfolio simulator
- 🔔 Price alerts
- 📈 Multi-coin comparison chart
- 🌓 Dark mode toggle
- 📱 Responsive dashboard refinements

---
