import type { MarketTab } from "@/types";

export interface MarketState {
  selectedTab: MarketTab;
  search: string;
  setTab: (tab: MarketTab) => void;
  setSearch: (q: string) => void;
}
