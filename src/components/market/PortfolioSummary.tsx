import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { ArrowDownToLine } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const VES_TO_USD = 36.5;

export interface PortfolioSummaryData {
  totalUsd: number;
  change24hPercent: number;
  breakdown: {
    crypto: number;
    etf: number;
    venezuela: number;
  };
}

interface PortfolioSummaryProps {
  data: PortfolioSummaryData;
}

export function PortfolioSummary({ data }: PortfolioSummaryProps) {
  const { totalUsd, change24hPercent, breakdown } = data;
  const isPositive = change24hPercent >= 0;

  return (
    <section className="rounded-xl border border-neutral-800 bg-[#121212] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
              Balance total
            </span>
            <span className="rounded bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-500">
              Modo Sandbox
            </span>
          </div>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-white sm:text-4xl">
            ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p
            className={`mt-1 text-sm font-medium tabular-nums ${
              isPositive ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {change24hPercent.toFixed(2)}% (24h)
          </p>
        </div>
        <Button
          asChild
          size="default"
          className="gap-2 rounded-lg bg-[#007AFF] hover:bg-[#007AFF]/90 text-white border-0"
        >
          <Link to={ROUTES.WALLET}>
            <ArrowDownToLine size={16} />
            Recargar
          </Link>
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 border-t border-neutral-800 pt-5">
        <BreakdownItem label="Crypto" value={breakdown.crypto} />
        <BreakdownItem label="ETFs" value={breakdown.etf} />
        <BreakdownItem label="Venezuela" value={breakdown.venezuela} />
      </div>
    </section>
  );
}

function BreakdownItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2">
      <span className="text-xs text-neutral-400">{label}</span>
      <p className="text-sm font-semibold tabular-nums text-[#00F5D4]">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}

export function computePortfolioSummary(
  balances: { currency: string; amount: number }[],
  holdings: { symbol: string; amount: number; currency: string; category: string }[],
  priceBySymbol: Record<string, number>,
  change24hBySymbol: Record<string, number>
): PortfolioSummaryData {
  const vesToUsd = (ves: number) => ves / VES_TO_USD;

  let totalUsd = 0;
  const breakdown = { crypto: 0, etf: 0, venezuela: 0 };

  for (const b of balances) {
    const usd = b.currency === "VES" ? vesToUsd(b.amount) : b.amount;
    totalUsd += usd;
  }

  let holdingsValue = 0;
  let weightedChange = 0;

  for (const h of holdings) {
    const priceUsd = priceBySymbol[h.symbol] ?? 0;
    const value = h.amount * priceUsd;
    holdingsValue += value;
    const cat = h.category as keyof typeof breakdown;
    if (cat in breakdown) breakdown[cat] += value;
    const ch = change24hBySymbol[h.symbol] ?? 0;
    weightedChange += value * ch;
  }

  totalUsd += holdingsValue;
  const change24hPercent = holdingsValue > 0 ? weightedChange / holdingsValue : 0;

  return {
    totalUsd,
    change24hPercent,
    breakdown,
  };
}
