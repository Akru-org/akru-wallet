import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { Moon, Sun, User, Mail, Shield } from 'lucide-react';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const { theme, toggleTheme } = useUiStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Perfil</h1>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary text-2xl font-display font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <InfoRow icon={<User size={16} />} label="Nombre" value={user.name} />
          <InfoRow icon={<Mail size={16} />} label="Email" value={user.email} />
          <InfoRow icon={<Shield size={16} />} label="Verificación" value="Completa" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            <div>
              <p className="text-sm font-semibold">Tema</p>
              <p className="text-xs text-muted-foreground">{theme === 'dark' ? 'Modo oscuro' : 'Modo claro'}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="relative h-7 w-12 rounded-full bg-secondary transition-colors"
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-primary transition-all ${
                theme === 'dark' ? 'left-[calc(100%-1.625rem)]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-sm text-muted-foreground w-24">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
