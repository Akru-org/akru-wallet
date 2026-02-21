import type { Asset } from "@/types";

function sparkline(price: number, change7d: number): number[] {
  const base = price / (1 + change7d / 100);
  const step = (price - base) / 6;
  return Array.from({ length: 7 }, (_, i) => Number((base + step * i).toFixed(2)));
}

export const cryptoAssets: Asset[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", price: 97450.2, change1h: 0.3, change24h: 2.34, change7d: 5.2, marketCap: 1_920_000_000_000, volume24h: 28_500_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(97450.2, 5.2) },
  { id: "eth", symbol: "ETH", name: "Ethereum", price: 3842.15, change1h: -0.1, change24h: -1.12, change7d: -2.8, marketCap: 462_000_000_000, volume24h: 12_100_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(3842.15, -2.8) },
  { id: "sol", symbol: "SOL", name: "Solana", price: 198.45, change1h: 0.8, change24h: 5.67, change7d: 12.4, marketCap: 92_000_000_000, volume24h: 2_800_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(198.45, 12.4) },
  { id: "bnb", symbol: "BNB", name: "BNB", price: 612.3, change1h: 0.2, change24h: 0.89, change7d: 1.5, marketCap: 94_000_000_000, volume24h: 1_200_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(612.3, 1.5) },
  { id: "ada", symbol: "ADA", name: "Cardano", price: 0.92, change1h: -0.4, change24h: -2.45, change7d: -4.1, marketCap: 32_000_000_000, volume24h: 450_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(0.92, -4.1) },
  { id: "avax", symbol: "AVAX", name: "Avalanche", price: 42.18, change1h: 0.5, change24h: 3.21, change7d: 8.2, marketCap: 16_500_000_000, volume24h: 380_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(42.18, 8.2) },
  { id: "dot", symbol: "DOT", name: "Polkadot", price: 8.76, change1h: -0.1, change24h: -0.34, change7d: 0.9, marketCap: 11_200_000_000, volume24h: 180_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(8.76, 0.9) },
  { id: "link", symbol: "LINK", name: "Chainlink", price: 18.92, change1h: 0.2, change24h: 1.56, change7d: 3.4, marketCap: 11_100_000_000, volume24h: 520_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(18.92, 3.4) },
  { id: "matic", symbol: "MATIC", name: "Polygon", price: 0.58, change1h: -0.3, change24h: -3.12, change7d: -5.2, marketCap: 5_400_000_000, volume24h: 220_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(0.58, -5.2) },
  { id: "uni", symbol: "UNI", name: "Uniswap", price: 12.34, change1h: 0.6, change24h: 4.05, change7d: 9.1, marketCap: 7_400_000_000, volume24h: 190_000_000, currency: "USD", category: "crypto", priceHistory: sparkline(12.34, 9.1) },
];
