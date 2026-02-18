import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword, error, clearError } = useAuthStore();

  const valid = email.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    try {
      await resetPassword(email);
      toast({ title: 'Email enviado', description: 'Revisa tu bandeja para recuperar tu contraseña.' });
    } catch {
      // error set in store
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Ingresa tu email y te enviaremos un link para restablecer tu contraseña.
      </p>

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

      <button
        type="submit"
        disabled={!valid || loading}
        className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Enviar link de recuperación'}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        <Link to="/login" className="text-primary hover:underline">Volver al login</Link>
      </p>
    </form>
  );
}
