import { useState } from "react";
import {
  SandboxDisclaimer,
  FormField,
  FormInput,
  Button,
  SuccessState,
  PageTitle,
} from "@/components/ui";
import { toast } from "@/hooks/use-toast";

export function KYCPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    toast({
      title: "KYC aprobado (modo demo)",
      description: "Tu verificación ha sido simulada exitosamente.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageTitle>Verificación KYC</PageTitle>
      <SandboxDisclaimer message="Este proceso de KYC es simulado. No se almacena ningún dato real." />

      {submitted ? (
        <SuccessState title="Verificación completada (demo)" />
      ) : (
        <div className="space-y-4">
          <FormField label="Nombre completo">
            <FormInput type="text" placeholder="Tu nombre" />
          </FormField>
          <FormField label="Documento de identidad">
            <FormInput type="text" placeholder="V-12345678" />
          </FormField>
          <Button type="button" size="form" onClick={handleSubmit}>
            Enviar verificación (demo)
          </Button>
        </div>
      )}
    </div>
  );
}
