import { useState } from 'react';
import { SandboxDisclaimer } from '@/components/ui/SandboxDisclaimer';
import { toast } from '@/hooks/use-toast';

export default function KYCPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    toast({ title: 'KYC aprobado (modo demo)', description: 'Tu verificación ha sido simulada exitosamente.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Verificación KYC</h1>
      <SandboxDisclaimer message="Este proceso de KYC es simulado. No se almacena ningún dato real." />

      {submitted ? (
        <div className="rounded-xl border border-success/30 bg-success/10 p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success text-xl">✓</div>
          <p className="font-semibold text-success">Verificación completada (demo)</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Nombre completo</label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Documento de identidad</label>
            <input
              type="text"
              placeholder="V-12345678"
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Enviar verificación (demo)
          </button>
        </div>
      )}
    </div>
  );
}
