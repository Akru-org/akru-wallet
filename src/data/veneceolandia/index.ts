import type { Asset } from "@/types";

const VES_TO_USD = 36.5;

function sparkline(price: number, change7d: number): number[] {
  const base = price / (1 + change7d / 100);
  const step = (price - base) / 6;
  return Array.from({ length: 7 }, (_, i) => Number((base + step * i).toFixed(2)));
}

export const venezuelaAssets: Asset[] = [
  { id: "bpv", symbol: "BPV", name: "Banco Provincial", price: 4.25, change1h: 0.1, change24h: 1.8, change7d: 2.5, marketCap: 850_000_000 * VES_TO_USD, volume24h: 12_000_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(4.25, 2.5) },
  { id: "bnc", symbol: "BNC", name: "Banco Nacional de Crédito", price: 2.1, change1h: -0.05, change24h: -0.95, change7d: -1.5, marketCap: 420_000_000 * VES_TO_USD, volume24h: 5_500_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(2.1, -1.5) },
  { id: "mbv", symbol: "MBV", name: "Mercantil Banco", price: 3.85, change1h: 0.2, change24h: 2.4, change7d: 3.2, marketCap: 720_000_000 * VES_TO_USD, volume24h: 8_200_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(3.85, 3.2) },
  { id: "tvs", symbol: "TVS", name: "Telares de Valencia", price: 0.45, change1h: -0.02, change24h: -1.5, change7d: -2.2, marketCap: 95_000_000 * VES_TO_USD, volume24h: 1_100_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(0.45, -2.2) },
  { id: "cpv", symbol: "CPV", name: "Cementos Pacasmayo VE", price: 1.92, change1h: 0.05, change24h: 0.75, change7d: 1.1, marketCap: 380_000_000 * VES_TO_USD, volume24h: 3_200_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(1.92, 1.1) },
  { id: "mvz", symbol: "MVZ", name: "Manpa Venezuela", price: 0.78, change1h: 0.15, change24h: 3.2, change7d: 4.5, marketCap: 155_000_000 * VES_TO_USD, volume24h: 2_800_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(0.78, 4.5) },
  { id: "dom", symbol: "DOM", name: "Ron Santa Teresa", price: 5.6, change1h: 0.08, change24h: 1.1, change7d: 1.8, marketCap: 1_120_000_000 * VES_TO_USD, volume24h: 18_000_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(5.6, 1.8) },
  { id: "env", symbol: "ENV", name: "Envases Venezolanos", price: 1.35, change1h: -0.02, change24h: -0.4, change7d: -0.6, marketCap: 270_000_000 * VES_TO_USD, volume24h: 4_100_000 * VES_TO_USD, currency: "VES", category: "venezuela", priceHistory: sparkline(1.35, -0.6) },
];
