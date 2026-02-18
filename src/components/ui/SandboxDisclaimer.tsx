import { AlertTriangle } from 'lucide-react';

interface Props {
  message?: string;
}

export function SandboxDisclaimer({ message = 'Esta operación es simulada. No involucra dinero real.' }: Props) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-warning/10 border border-warning/20 p-3 text-xs text-warning">
      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
