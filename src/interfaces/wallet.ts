import type { WalletBalance, PortfolioHolding } from "@/types";

export interface WalletState {
  balances: WalletBalance[];
  holdings: PortfolioHolding[];
  deposit: (currency: string, amount: number) => void;
}
