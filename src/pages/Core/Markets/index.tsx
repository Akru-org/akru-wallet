import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Search } from "lucide-react";
import { AkruTabs, SearchInput, PageTitle } from "@/components/ui";
import { MarketTable } from "@/components/market/MarketTable";
import { cryptoAssets } from "@/data/crypto";
import { etfAssets } from "@/data/etf";
import { venezuelaAssets } from "@/data/veneceolandia";
import { Asset, MarketTab } from "@/types";
import { useState } from "react";

const tabs = [
  { key: "general", label: "General" },
  { key: "crypto", label: "Crypto" },
  { key: "etfs", label: "ETFs" },
  { key: "venezuela", label: "Venezuela" },
];

const dataMap: Record<string, Asset[]> = {
  general: [...cryptoAssets, ...etfAssets, ...venezuelaAssets],
  crypto: cryptoAssets,
  etfs: etfAssets,
  venezuela: venezuelaAssets,
};

export function MarketsPage() {
  const { tab = "general" } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const assets = (dataMap[tab] || dataMap.general).filter(
    (a) =>
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <PageTitle>Mercados</PageTitle>

      <AkruTabs
        tabs={tabs}
        active={tab as MarketTab}
        onChange={(key) => navigate(`${ROUTES.MARKETS}/${key}`)}
        className="overflow-x-auto"
      />

      <SearchInput
        icon={<Search size={16} />}
        placeholder="Buscar activo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="py-2.5"
      />

      <MarketTable assets={assets} />
    </div>
  );
}
