import type { Asset } from "@/types";

function sparkline(price: number, change7d: number): number[] {
  const base = price / (1 + change7d / 100);
  const step = (price - base) / 6;
  return Array.from({ length: 7 }, (_, i) => Number((base + step * i).toFixed(2)));
}

export const etfAssets: Asset[] = [
  { id: "spy", symbol: "SPY", name: "S&P 500 ETF", price: 528.45, change1h: 0.05, change24h: 0.45, change7d: 0.9, marketCap: 485_000_000_000, volume24h: 22_000_000_000, currency: "USD", category: "etf", priceHistory: sparkline(528.45, 0.9) },
  { id: "qqq", symbol: "QQQ", name: "Nasdaq 100 ETF", price: 487.2, change1h: 0.08, change24h: 0.78, change7d: 1.2, marketCap: 265_000_000_000, volume24h: 18_500_000_000, currency: "USD", category: "etf", priceHistory: sparkline(487.2, 1.2) },
  { id: "vti", symbol: "VTI", name: "Vanguard Total Market", price: 275.8, change1h: 0.03, change24h: 0.32, change7d: 0.6, marketCap: 365_000_000_000, volume24h: 2_100_000_000, currency: "USD", category: "etf", priceHistory: sparkline(275.8, 0.6) },
  { id: "ivv", symbol: "IVV", name: "iShares Core S&P 500", price: 530.1, change1h: 0.04, change24h: 0.41, change7d: 0.85, marketCap: 412_000_000_000, volume24h: 8_200_000_000, currency: "USD", category: "etf", priceHistory: sparkline(530.1, 0.85) },
  { id: "voo", symbol: "VOO", name: "Vanguard S&P 500", price: 485.9, change1h: 0.04, change24h: 0.39, change7d: 0.7, marketCap: 398_000_000_000, volume24h: 3_800_000_000, currency: "USD", category: "etf", priceHistory: sparkline(485.9, 0.7) },
  { id: "arkk", symbol: "ARKK", name: "ARK Innovation", price: 52.34, change1h: -0.2, change24h: -1.23, change7d: -2.5, marketCap: 10_200_000_000, volume24h: 420_000_000, currency: "USD", category: "etf", priceHistory: sparkline(52.34, -2.5) },
  { id: "gld", symbol: "GLD", name: "SPDR Gold Shares", price: 212.45, change1h: 0.02, change24h: 0.15, change7d: 0.35, marketCap: 82_000_000_000, volume24h: 1_900_000_000, currency: "USD", category: "etf", priceHistory: sparkline(212.45, 0.35) },
  { id: "tlt", symbol: "TLT", name: "iShares 20+ Year Treasury", price: 92.18, change1h: -0.08, change24h: -0.67, change7d: -1.2, marketCap: 28_000_000_000, volume24h: 1_200_000_000, currency: "USD", category: "etf", priceHistory: sparkline(92.18, -1.2) },
];
