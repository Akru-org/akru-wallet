import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { SandboxDisclaimer } from '@/components/ui/SandboxDisclaimer';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, error, clearError } = useAuthStore();

  const passwordsMatch = password === confirm;
  const valid = email.includes('@') && password.length >= 6 && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    try {
      await register(email, password);
    } catch {
      // error set in store
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SandboxDisclaimer message="Las cuentas creadas son solo para pruebas." />

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => { clearError(); setEmail(e.target.value); }}
          placeholder="tu@email.com"
          className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => { clearError(); setPassword(e.target.value); }}
          placeholder="Mínimo 6 caracteres"
          className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Confirmar contraseña</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repite tu contraseña"
          className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          required
        />
        {confirm && !passwordsMatch && (
          <p className="text-xs text-destructive">Las contraseñas no coinciden</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!valid || loading}
        className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-primary hover:underline">Iniciar sesión</Link>
      </p>
    </form>
  );
}
