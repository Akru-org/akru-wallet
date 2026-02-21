import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRegister } from "@/hooks/useRegister";
import {
  Modal,
  SandboxDisclaimer,
  FormField,
  FormInput,
  ErrorMessage,
  Button,
} from "@/components/ui";
import googleLogo from "@/assets/cono/google.svg";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ open, onClose, onSwitchToLogin }: RegisterModalProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (open && isAuthenticated) onClose();
  }, [open, isAuthenticated, onClose]);

  const {
    email,
    password,
    confirm,
    error,
    isSubmitting,
    valid,
    passwordsMatch,
    handleSubmit,
    handleGoogleLogin,
    onEmailChange,
    onPasswordChange,
    onConfirmChange,
  } = useRegister();

  return (
    <Modal open={open} onClose={onClose} title="Crear cuenta">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SandboxDisclaimer message="Las cuentas creadas son solo para pruebas." />

        {error && <ErrorMessage message={error} />}

        <FormField label="Email">
          <FormInput
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="tu@email.com"
            required
          />
        </FormField>

        <FormField label="Contraseña">
          <FormInput
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Mínimo 6 caracteres"
            required
          />
        </FormField>

        <FormField
          label="Confirmar contraseña"
          error={confirm && !passwordsMatch ? "Las contraseñas no coinciden" : undefined}
        >
          <FormInput
            type="password"
            value={confirm}
            onChange={onConfirmChange}
            placeholder="Repite tu contraseña"
            required
          />
        </FormField>

        <Button type="submit" size="form" loading={isSubmitting} loadingLabel="Creando cuenta..." disabled={!valid}>
          Crear Cuenta
        </Button>

        <div className="relative">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </span>
          <span className="relative flex justify-center text-xs uppercase text-muted-foreground">
            o continúa con
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="form"
          onClick={handleGoogleLogin}
          loading={isSubmitting}
          className="gap-2"
        >
          <img src={googleLogo} alt="Google" className="size-5" />
          Iniciar sesión con Google
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline">
            Iniciar sesión
          </button>
        </p>
      </form>
    </Modal>
  );
}
