import { Asset } from '@/types';

export const etfAssets: Asset[] = [
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 528.45, change24h: 0.45, currency: 'USD', category: 'etf' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', price: 487.20, change24h: 0.78, currency: 'USD', category: 'etf' },
  { symbol: 'VTI', name: 'Vanguard Total Market', price: 275.80, change24h: 0.32, currency: 'USD', category: 'etf' },
  { symbol: 'IVV', name: 'iShares Core S&P 500', price: 530.10, change24h: 0.41, currency: 'USD', category: 'etf' },
  { symbol: 'VOO', name: 'Vanguard S&P 500', price: 485.90, change24h: 0.39, currency: 'USD', category: 'etf' },
  { symbol: 'ARKK', name: 'ARK Innovation', price: 52.34, change24h: -1.23, currency: 'USD', category: 'etf' },
  { symbol: 'GLD', name: 'SPDR Gold Shares', price: 212.45, change24h: 0.15, currency: 'USD', category: 'etf' },
  { symbol: 'TLT', name: 'iShares 20+ Year Treasury', price: 92.18, change24h: -0.67, currency: 'USD', category: 'etf' },
];
