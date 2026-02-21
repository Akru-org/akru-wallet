import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/constants/routes";
import { useLogin } from "@/hooks/useLogin";
import { Modal, FormField, FormInput, ErrorMessage, Button } from "@/components/ui";
import googleLogo from "@/assets/icons/google.svg";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ open, onClose, onSwitchToRegister }: LoginModalProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (open && isAuthenticated) onClose();
  }, [open, isAuthenticated, onClose]);

  const {
    email,
    password,
    error,
    isSubmitting,
    valid,
    handleSubmit,
    handleGoogleLogin,
    onEmailChange,
    onPasswordChange,
  } = useLogin();

  const handleForgotPassword = () => {
    onClose();
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  return (
    <Modal open={open} onClose={onClose} title="Iniciar sesión">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Button type="submit" size="form" loading={isSubmitting} loadingLabel="Iniciando sesión..." disabled={!valid}>
          Iniciar Sesión
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

        <div className="flex items-center justify-between text-xs">
          <button type="button" onClick={handleForgotPassword} className="text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </button>
          <button type="button" onClick={onSwitchToRegister} className="text-primary hover:underline">
            Crear cuenta
          </button>
        </div>
      </form>
    </Modal>
  );
}
