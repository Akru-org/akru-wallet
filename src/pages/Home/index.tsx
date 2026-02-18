import { useWalletStore } from '@/store/walletStore';
import { cryptoAssets } from '@/data/crypto';
import { etfAssets } from '@/data/etf';
import { venezuelaAssets } from '@/data/veneceolandia';
import { MarketTable } from '@/components/market/MarketTable';
import { ArrowDownToLine, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const topAssets = [...cryptoAssets.slice(0, 3), ...etfAssets.slice(0, 2), ...venezuelaAssets.slice(0, 2)];

export default function HomePage() {
  const balances = useWalletStore((s) => s.balances);
  const totalUsd = balances.reduce((acc, b) => {
    if (b.currency === 'VES') return acc + b.amount / 36.5;
    return acc + b.amount;
  }, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Balance Card */}
      <div className="rounded-2xl border border-border bg-card p-6 glow-primary">
        <p className="text-sm text-muted-foreground mb-1">Balance Total</p>
        <h1 className="text-4xl font-display font-bold tabular-nums">
          ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">≈ valor equivalente en USD</p>

        <div className="mt-5 flex gap-3">
          <Link
            to="/wallet"
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            <ArrowDownToLine size={16} />
            Depositar
          </Link>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary/80">
            <ArrowLeftRight size={16} />
            Swap
          </button>
        </div>
      </div>

      {/* Top Markets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <h2 className="text-lg font-display font-semibold">Top Activos</h2>
          </div>
          <Link to="/markets/general" className="text-sm text-primary hover:underline">
            Ver todos
          </Link>
        </div>
        <MarketTable assets={topAssets} />
      </div>
    </div>
  );
}
