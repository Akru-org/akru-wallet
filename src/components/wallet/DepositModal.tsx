import { useState } from "react";
import {
  Modal,
  SandboxDisclaimer,
  FormField,
  FormInput,
  Button,
  SuccessState,
} from "@/components/ui";
import { useWalletStore } from "@/store/walletStore";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

const currencies = ["USD", "USDT", "USDC", "VES"];

export function DepositModal({ open, onClose }: DepositModalProps) {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const deposit = useWalletStore((s) => s.deposit);

  const handleDeposit = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    deposit(currency, num);
    toast({
      title: "Depósito simulado completado",
      description: `${num} ${currency} añadidos a tu cuenta (sandbox).`,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setAmount("");
      onClose();
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title="Recargar">
      {success ? (
        <SuccessState title="¡Depósito exitoso!" />
      ) : (
        <div className="space-y-4">
          <SandboxDisclaimer message="Este depósito es simulado. No se procesará dinero real." />
          <FormField label="Moneda">
            <div className="flex gap-2">
              {currencies.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                    currency === c
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Monto">
            <FormInput
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-lg font-semibold tabular-nums"
            />
          </FormField>
          <Button
            type="button"
            size="form"
            onClick={handleDeposit}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Confirmar Depósito
          </Button>
        </div>
      )}
    </Modal>
  );
}
