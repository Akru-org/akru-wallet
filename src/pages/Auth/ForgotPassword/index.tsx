import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { FirebaseAuthError } from "@/utils/firebaseAuthErrors";
import { toast } from "@/hooks/use-toast";
import { FormField, FormInput, ErrorMessage, Button } from "@/components/ui";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  const valid = email.includes("@");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      toast({
        title: "Email enviado",
        description: "Revisa tu bandeja para recuperar tu contraseña.",
      });
    } catch (e) {
      setError(FirebaseAuthError.getMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        Ingresa tu email y te enviaremos un link para restablecer tu contraseña.
      </p>

      {error && <ErrorMessage message={error} />}

      <FormField label="Email">
        <FormInput
          type="email"
          value={email}
          onChange={(e) => {
            setError(null);
            setEmail(e.target.value);
          }}
          placeholder="tu@email.com"
          required
        />
      </FormField>

      <Button type="submit" size="form" loading={isSubmitting} loadingLabel="Enviando..." disabled={!valid}>
        Enviar link de recuperación
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
          Volver al login
        </Link>
      </p>
    </form>
  );
}
