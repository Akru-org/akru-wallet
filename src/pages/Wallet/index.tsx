import { useState } from 'react';
import { useWalletStore } from '@/store/walletStore';
import { BalanceCard } from '@/components/wallet/BalanceCard';
import { DepositModal } from '@/components/wallet/DepositModal';
import { AkruBadge } from '@/components/ui/AkruBadge';
import { Plus } from 'lucide-react';

export default function WalletPage() {
  const { balances, holdings } = useWalletStore();
  const [depositOpen, setDepositOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Wallet</h1>
        <button
          onClick={() => setDepositOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          <Plus size={16} />
          Recargar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {balances.map((b) => (
          <BalanceCard key={b.currency} currency={b.currency} symbol={b.symbol} amount={b.amount} />
        ))}
      </div>

      <div>
        <h2 className="text-lg font-display font-semibold mb-3">Portafolio</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
          {holdings.map((h) => (
            <div key={h.symbol} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary font-display font-bold text-xs">
                  {h.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{h.symbol}</p>
                  <p className="text-xs text-muted-foreground">{h.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium tabular-nums">{h.amount}</p>
                <AkruBadge variant="outline">{h.category}</AkruBadge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
    </div>
  );
}
