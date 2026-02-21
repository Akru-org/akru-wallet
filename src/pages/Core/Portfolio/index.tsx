import { useMemo } from "react";
import { useWalletStore } from "@/store/walletStore";
import { cryptoAssets } from "@/data/crypto";
import { etfAssets } from "@/data/etf";
import { venezuelaAssets } from "@/data/veneceolandia";
import {
  PortfolioSummary,
  computePortfolioSummary,
} from "@/components/market/PortfolioSummary";

const VES_TO_USD = 36.5;

const allAssets = [...cryptoAssets, ...etfAssets, ...venezuelaAssets];

export function PortfolioPage() {
  const balances = useWalletStore((s) => s.balances);
  const holdings = useWalletStore((s) => s.holdings);

  const { priceBySymbol, change24hBySymbol } = useMemo(() => {
    const priceBySymbol: Record<string, number> = {};
    const change24hBySymbol: Record<string, number> = {};
    for (const a of allAssets) {
      priceBySymbol[a.symbol] = a.currency === "VES" ? a.price / VES_TO_USD : a.price;
      change24hBySymbol[a.symbol] = a.change24h;
    }
    return { priceBySymbol, change24hBySymbol };
  }, []);

  const portfolioData = useMemo(
    () =>
      computePortfolioSummary(
        balances,
        holdings,
        priceBySymbol,
        change24hBySymbol
      ),
    [balances, holdings, priceBySymbol, change24hBySymbol]
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="animate-fade-in">
        <PortfolioSummary data={portfolioData} />
      </div>
    </div>
  );
}
