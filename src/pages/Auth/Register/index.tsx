import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useRegister } from "./hooks/useRegister";
import {
  SandboxDisclaimer,
  FormField,
  FormInput,
  ErrorMessage,
  Button,
} from "@/components/ui";

export function RegisterPage() {
  const {
    email,
    password,
    confirm,
    error,
    isSubmitting,
    valid,
    passwordsMatch,
    handleSubmit,
    onEmailChange,
    onPasswordChange,
    onConfirmChange,
  } = useRegister();

  return (
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

      <FormField label="Confirmar contraseña" error={confirm && !passwordsMatch ? "Las contraseñas no coinciden" : undefined}>
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

      <p className="text-center text-xs text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
