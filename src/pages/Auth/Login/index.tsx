import { Link } from "react-router-dom";  
import { ROUTES } from "@/constants/routes";
import { useLogin } from "./hooks/useLogin";
import { FormField, FormInput, ErrorMessage, Button } from "@/components/ui";
import googleLogo from "@/assets/cono/google.svg";

export function LoginPage() {
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

  return (
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

        <span className="relative flex justify-center text-xs uppercase text-muted-foreground">
          o continúa con
        </span>

      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 py-3"
        onClick={handleGoogleLogin}
        loading={isSubmitting}
      >
        <img src={googleLogo} alt="Google" className="size-5" />
        Iniciar sesión con Google
      </Button>

      <div className="flex items-center justify-between text-xs">
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
        <Link to={ROUTES.REGISTER} className="text-primary hover:underline">
          Crear cuenta
        </Link>
      </div>
    </form>
  );
}
