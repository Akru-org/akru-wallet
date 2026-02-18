import { AlertTriangle } from 'lucide-react';

export function SandboxBanner() {
  return (
    <div className="flex items-center gap-2 bg-warning/10 border-b border-warning/20 px-4 py-2 text-xs font-medium text-warning">
      <AlertTriangle size={14} className="shrink-0" />
      <span>⚠️ Modo Sandbox: Esto no es dinero real. Todas las operaciones son simuladas.</span>
    </div>
  );
}
