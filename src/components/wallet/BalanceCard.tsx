import { SectionCard } from "@/components/ui";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  currency: string;
  symbol: string;
  amount: number;
  className?: string;
}

export function BalanceCard({ currency, symbol, amount, className }: BalanceCardProps) {
  return (
    <SectionCard className={cn("p-4", className)}>
      <p className="mb-1 text-xs font-medium text-muted-foreground">{currency}</p>
      <p className="font-display text-2xl font-bold tabular-nums">
        {symbol} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </SectionCard>
  );
}
