import { useState } from "react";
import { Plus } from "lucide-react";
import { useWalletStore } from "@/store/walletStore";
import { BalanceCard } from "@/components/wallet/BalanceCard";
import { DepositModal } from "@/components/wallet/DepositModal";
import {
  AkruBadge,
  AvatarInitial,
  SectionCard,
  PageTitle,
  Button,
} from "@/components/ui";

export function WalletPage() {
  const { balances, holdings } = useWalletStore();
  const [depositOpen, setDepositOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <PageTitle>Wallet</PageTitle>
        <Button onClick={() => setDepositOpen(true)} className="gap-2 rounded-lg font-semibold hover:brightness-110">
          <Plus size={16} />
          Recargar
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {balances.map((b) => (
          <BalanceCard key={b.currency} currency={b.currency} symbol={b.symbol} amount={b.amount} />
        ))}
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold">Portafolio</h2>
        <SectionCard className="overflow-hidden divide-y divide-border">
          {holdings.map((h) => (
            <div key={h.symbol} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <AvatarInitial initial={h.symbol.slice(0, 2)} size="sm" />
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
        </SectionCard>
      </div>

      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
    </div>
  );
}
