import { useParams, useNavigate } from 'react-router-dom';
import { AkruTabs } from '@/components/ui/AkruTabs';
import { MarketTable } from '@/components/market/MarketTable';
import { cryptoAssets } from '@/data/crypto';
import { etfAssets } from '@/data/etf';
import { venezuelaAssets } from '@/data/veneceolandia';
import { Asset, MarketTab } from '@/types';
import { useState } from 'react';
import { Search } from 'lucide-react';

const tabs = [
  { key: 'general', label: 'General' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'etfs', label: 'ETFs' },
  { key: 'venezuela', label: 'Venezuela' },
];

const dataMap: Record<string, Asset[]> = {
  general: [...cryptoAssets, ...etfAssets, ...venezuelaAssets],
  crypto: cryptoAssets,
  etfs: etfAssets,
  venezuela: venezuelaAssets,
};

export default function MarketsPage() {
  const { tab = 'general' } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const assets = (dataMap[tab] || dataMap.general).filter(
    (a) => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Mercados</h1>

      <AkruTabs
        tabs={tabs}
        active={tab as MarketTab}
        onChange={(key) => navigate(`/markets/${key}`)}
        className="overflow-x-auto"
      />

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar activo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-9 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <MarketTable assets={assets} />
    </div>
  );
}
