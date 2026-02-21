import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useUiStore } from "@/store/uiStore";
import { KYC_STATUS_LABELS, type KycStatusValue } from "@/constants/kycStatus";
import { ROUTES } from "@/constants/routes";
import { Moon, Sun, User, Mail, Shield, LogOut, ShieldCheck } from "lucide-react";
import {
  AvatarInitial,
  SectionCard,
  PageTitle,
  InfoRow,
  DestructiveButton,
  FormField,
  FormInput,
  ErrorMessage,
  Button,
} from "@/components/ui";

export function ProfilePage() {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useUiStore();
  const { profile, profileLoading, loadProfile, alias, updateAlias, isUpdating, error } = useProfile();
  const [aliasInput, setAliasInput] = useState(alias);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    setAliasInput(alias);
  }, [alias]);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Usuario";
  const displayEmail = user?.email || "";
  const kycStatus = profile?.kycStatus ?? null;
  const kycLabel = kycStatus ? KYC_STATUS_LABELS[kycStatus as KycStatusValue] : "—";

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
          <InfoRow
            icon={<Shield size={16} />}
            label="Verificación (KYC)"
            value={profileLoading ? "Cargando..." : kycLabel}
          />
        </div>

        {!profileLoading && (
          <div className="mt-3">
            <Link to={ROUTES.KYC}>
              <Button type="button" variant="outline" size="sm" className="gap-2">
                <ShieldCheck size={16} />
                Ir a verificación KYC
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-4 border-t border-border pt-4">
          <FormField label="Alias">
            <div className="flex gap-2">
              <FormInput
                type="text"
                value={aliasInput}
                onChange={(e) => setAliasInput(e.target.value)}
                placeholder="tu-alias"
                className="flex"
              />
              <Button
                type="button"
                size="form"
                onClick={() => updateAlias(aliasInput)}
                loading={isUpdating}
                loadingLabel="Guardando..."
                disabled={aliasInput.trim() === alias || !aliasInput.trim()}
              >
                Guardar
              </Button>
            </div>
          </FormField>
          {error && <ErrorMessage message={error} className="mt-2" />}
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
