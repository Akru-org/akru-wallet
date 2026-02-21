import { create } from "zustand";
import type { MarketState } from "@/interfaces/market";

export const useMarketStore = create<MarketState>((set) => ({
  selectedTab: "general",
  search: "",
  setTab: (tab) => set({ selectedTab: tab }),
  setSearch: (search) => set({ search }),
}));
