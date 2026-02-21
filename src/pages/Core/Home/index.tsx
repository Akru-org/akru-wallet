import { useWalletStore } from "@/store/walletStore";
import { cryptoAssets } from "@/data/crypto";
import { etfAssets } from "@/data/etf";
import { venezuelaAssets } from "@/data/veneceolandia";
import { MarketTable } from "@/components/market/MarketTable";
import { SectionCard, Button } from "@/components/ui";
import { ArrowDownToLine, ArrowLeftRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const topAssets = [...cryptoAssets.slice(0, 3), ...etfAssets.slice(0, 2), ...venezuelaAssets.slice(0, 2)];

export function HomePage() {
  const balances = useWalletStore((s) => s.balances);
  const totalUsd = balances.reduce((acc, b) => {
    if (b.currency === "VES") return acc + b.amount / 36.5;
    return acc + b.amount;
  }, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionCard className="p-6 glow-primary rounded-2xl">
        <p className="mb-1 text-sm text-muted-foreground">Balance Total</p>
        <h1 className="font-display text-4xl font-bold tabular-nums">
          ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">≈ valor equivalente en USD</p>
        <div className="mt-5 flex gap-3">
          <Button asChild className="gap-2 rounded-lg px-5 py-2.5 font-semibold hover:brightness-110" variant="default">
            <Link to={ROUTES.WALLET}>
              <ArrowDownToLine size={16} />
              Depositar
            </Link>
          </Button>
          <Button className="gap-2 rounded-lg border border-border px-5 py-2.5 font-semibold" variant="secondary">
            <ArrowLeftRight size={16} />
            Swap
          </Button>
        </div>
      </SectionCard>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <h2 className="font-display text-lg font-semibold">Top Activos</h2>
          </div>
          <Link to={ROUTES.MARKETS_GENERAL} className="text-sm text-primary hover:underline">
            Ver todos
          </Link>
        </div>
        <MarketTable assets={topAssets} />
      </div>
    </div>
  );
}
