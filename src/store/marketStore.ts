import { create } from 'zustand';
import { MarketTab } from '@/types';

interface MarketState {
  selectedTab: MarketTab;
  search: string;
  setTab: (tab: MarketTab) => void;
  setSearch: (q: string) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  selectedTab: 'general',
  search: '',
  setTab: (tab) => set({ selectedTab: tab }),
  setSearch: (search) => set({ search }),
}));
