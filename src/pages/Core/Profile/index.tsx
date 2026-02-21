import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { useUiStore } from "@/store/uiStore";
import { Moon, Sun, User, Mail, Shield, LogOut } from "lucide-react";
import {
  AvatarInitial,
  SectionCard,
  PageTitle,
  InfoRow,
  DestructiveButton,
} from "@/components/ui";

export function ProfilePage() {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useUiStore();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Usuario";
  const displayEmail = user?.email || "";

  return (
    <div className="space-y-6 animate-fade-in">
      <PageTitle>Perfil</PageTitle>

      <SectionCard className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <AvatarInitial initial={displayName.charAt(0).toUpperCase()} size="lg" />
          <div>
            <h2 className="font-display text-xl font-semibold">{displayName}</h2>
            <p className="text-sm text-muted-foreground">{displayEmail}</p>
          </div>
        </div>

        <div className="space-y-3">
          <InfoRow icon={<User size={16} />} label="Nombre" value={displayName} />
          <InfoRow icon={<Mail size={16} />} label="Email" value={displayEmail} />
          <InfoRow icon={<Shield size={16} />} label="Verificación" value="Pendiente" />
        </div>
      </SectionCard>

      <SectionCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            <div>
              <p className="text-sm font-semibold">Tema</p>
              <p className="text-xs text-muted-foreground">{theme === "dark" ? "Modo oscuro" : "Modo claro"}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="relative h-7 w-12 rounded-full bg-secondary transition-colors"
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-primary transition-all ${theme === "dark" ? "left-[calc(100%-1.625rem)]" : "left-0.5"}`}
            />
          </button>
        </div>
      </SectionCard>

      <DestructiveButton onClick={logout}>
        <LogOut size={16} />
        Cerrar sesión
      </DestructiveButton>
    </div>
  );
}
