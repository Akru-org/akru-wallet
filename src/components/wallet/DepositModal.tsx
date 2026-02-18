import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useWalletStore } from '@/store/walletStore';
import { cn } from '@/lib/utils';

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

const currencies = ['USD', 'USDT', 'USDC', 'VES'];

export function DepositModal({ open, onClose }: DepositModalProps) {
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);
  const deposit = useWalletStore((s) => s.deposit);

  const handleDeposit = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    deposit(currency, num);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setAmount('');
      onClose();
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title="Recargar">
      {success ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success text-xl">✓</div>
          <p className="font-semibold">¡Depósito exitoso!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Moneda</label>
            <div className="flex gap-2">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium border transition-all',
                    currency === c
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:bg-secondary'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Monto</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-lg font-display font-semibold tabular-nums placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button
            onClick={handleDeposit}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirmar Depósito
          </button>
        </div>
      )}
    </Modal>
  );
}
