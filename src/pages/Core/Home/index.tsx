import { cryptoAssets } from "@/data/crypto";
import { etfAssets } from "@/data/etf";
import { venezuelaAssets } from "@/data/veneceolandia";
import { MarketTable } from "@/components/market/MarketTable";

const allAssets = [...cryptoAssets, ...etfAssets, ...venezuelaAssets];

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="animate-fade-in">
        <MarketTable assets={allAssets} />
      </div>
    </div>
  );
}
