export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  currency: string;
  category: AssetCategory;
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
