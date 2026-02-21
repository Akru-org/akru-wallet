import { useState, useEffect } from "react";
import {
  SandboxDisclaimer,
  FormField,
  FormInput,
  Button,
  PageTitle,
  ErrorMessage,
} from "@/components/ui";
import { toast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { KycStatus } from "@/constants/kycStatus";
import { ShieldCheck } from "lucide-react";

export function KYCPage() {
  const [submitted, setSubmitted] = useState(false);
  const { profile, profileLoading, loadProfile, updateKyc, isUpdatingKyc, error } = useProfile();

  const isApproved = submitted || profile?.kycStatus === KycStatus.APPROVED;

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async () => {
    const result = await updateKyc(KycStatus.APPROVED);
    if (!result.success) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "KYC aprobado (modo demo)",
      description: "Tu verificación ha sido registrada exitosamente.",
    });
  };

  if (profileLoading && !profile) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PageTitle>Verificación KYC</PageTitle>
        <div className="flex justify-center py-12">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (isApproved) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PageTitle>Verificación KYC</PageTitle>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-16 text-center">
          <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500/25 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400">
            <ShieldCheck className="h-16 w-16" strokeWidth={2} />
          </div>
          <h2 className="font-display text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
            Ya estás aprobado
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Tu verificación de identidad está aprobada. Puedes usar todas las funciones disponibles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageTitle>Verificación KYC</PageTitle>
      <SandboxDisclaimer message="Este proceso de KYC es simulado. No se almacena ningún dato real." />

      <div className="space-y-4">
        <FormField label="Nombre completo">
          <FormInput type="text" placeholder="Tu nombre" />
        </FormField>
        <FormField label="Documento de identidad">
          <FormInput type="text" placeholder="V-12345678" />
        </FormField>
        {error && <ErrorMessage message={error} />}
        <Button
          type="button"
          size="form"
          onClick={handleSubmit}
          loading={isUpdatingKyc}
          loadingLabel="Enviando..."
        >
          Enviar verificación (demo)
        </Button>
      </div>
    </div>
  );
}
