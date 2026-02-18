import { cn } from '@/lib/utils';

interface BalanceCardProps {
  currency: string;
  symbol: string;
  amount: number;
  className?: string;
}

export function BalanceCard({ currency, symbol, amount, className }: BalanceCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-4', className)}>
      <p className="text-xs font-medium text-muted-foreground mb-1">{currency}</p>
      <p className="text-2xl font-display font-bold tabular-nums">
        {symbol} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}
