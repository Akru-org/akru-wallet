import { create } from "zustand";
import type { WalletState } from "@/interfaces/wallet";

export const useWalletStore = create<WalletState>((set) => ({
  balances: [
    { currency: "USD", amount: 5420.5, symbol: "$" },
    { currency: "USDT", amount: 3200.0, symbol: "₮" },
    { currency: "USDC", amount: 1500.0, symbol: "◉" },
    { currency: "VES", amount: 125000.0, symbol: "Bs" },
  ],
  holdings: [
    { symbol: "BTC", name: "Bitcoin", amount: 0.045, avgPrice: 62000, currency: "USD", category: "crypto" },
    { symbol: "ETH", name: "Ethereum", amount: 1.2, avgPrice: 3200, currency: "USD", category: "crypto" },
    { symbol: "SPY", name: "S&P 500 ETF", amount: 5, avgPrice: 510, currency: "USD", category: "etf" },
    { symbol: "BPV", name: "Banco Provincial", amount: 200, avgPrice: 3.8, currency: "VES", category: "venezuela" },
  ],
  deposit: (currency, amount) =>
    set((state) => ({
      balances: state.balances.map((b) =>
        b.currency === currency ? { ...b, amount: b.amount + amount } : b
      ),
    })),
}));
