export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  currency: string;
  category: AssetCategory;
  priceHistory: number[];
  icon?: string;
}

export type AssetCategory = 'crypto' | 'etf' | 'venezuela' | 'general';

export interface PortfolioHolding {
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
  currency: string;
  category: AssetCategory;
}

export interface WalletBalance {
  currency: string;
  amount: number;
  symbol: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type MarketTab = 'general' | 'crypto' | 'etf' | 'venezuela';
export type ThemeMode = 'light' | 'dark';
