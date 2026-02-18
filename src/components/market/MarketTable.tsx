import { Asset } from '@/types';
import { AkruBadge } from '@/components/ui/AkruBadge';
import { cn } from '@/lib/utils';

interface MarketTableProps {
  assets: Asset[];
  onBuy?: (asset: Asset) => void;
}

export function MarketTable({ assets, onBuy }: MarketTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-[1fr_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_auto] gap-4 px-4 py-3 text-xs font-medium text-muted-foreground border-b border-border">
        <span>Activo</span>
        <span className="text-right">Precio</span>
        <span className="text-right">24h</span>
        <span className="text-right">Acción</span>
      </div>
      <div className="divide-y divide-border">
        {assets.map((asset) => (
          <MarketRow key={asset.symbol} asset={asset} onBuy={onBuy} />
        ))}
      </div>
    </div>
  );
}

function MarketRow({ asset, onBuy }: { asset: Asset; onBuy?: (a: Asset) => void }) {
  const isPositive = asset.change24h >= 0;

  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_auto] gap-4 px-4 py-3 items-center hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary font-display font-bold text-xs shrink-0">
          {asset.symbol.slice(0, 2)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{asset.symbol}</p>
          <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
        </div>
      </div>
      <p className="text-sm font-medium text-right tabular-nums">
        {asset.currency === 'VES' ? 'Bs ' : '$'}
        {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <div className="text-right">
        <AkruBadge variant={isPositive ? 'positive' : 'negative'}>
          {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
        </AkruBadge>
      </div>
      <div className="text-right">
        <button
          onClick={() => onBuy?.(asset)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
            'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
          )}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
