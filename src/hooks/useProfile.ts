import { useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { userService } from "@/services/user.service";
import type { ProfileResponse } from "@/services/user.service";
import type { KycStatusValue } from "@/constants/kycStatus";

export function useProfile() {
  const user = useAuthStore((s) => s.user);
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingKyc, setIsUpdatingKyc] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alias = profile?.alias ?? user?.alias ?? "";

  const loadProfile = useCallback(async () => {
    setError(null);
    setProfileLoading(true);
    try {
      const res = await userService.getProfile();
      if (res.error || res.status >= 400) {
        if (res.status === 404) setProfile(null);
        return;
      }
      const body = res.data as { data?: ProfileResponse } | null;
      const data = body?.data;
      if (data) {
        setProfile(data);
        setAuthUser(user ? { ...user, alias: data.alias ?? user.alias } : null);
      } else {
        setProfile(null);
      }
    } finally {
      setProfileLoading(false);
    }
  }, [user, setAuthUser]);

  async function updateAlias(newAlias: string) {
    const trimmed = newAlias.trim();
    if (!user) {
      setError("Debes iniciar sesión");
      return;
    }
    setError(null);
    setIsUpdating(true);
    try {
      const res = await userService.updateMe({ alias: trimmed });
      if (res.error || res.status >= 400) {
        setError(res.error ?? "Error al actualizar el alias");
        return;
      }
      const data = (res.data as { data?: ProfileResponse })?.data;
      if (data) {
        setProfile((p) => (p ? { ...p, alias: data.alias } : null));
        setAuthUser(user ? { ...user, alias: data.alias ?? "" } : null);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsUpdating(false);
    }
  }

  async function updateKyc(kycStatus: KycStatusValue): Promise<{ success: boolean; error?: string }> {
    if (!user) {
      const msg = "Debes iniciar sesión";
      setError(msg);
      return { success: false, error: msg };
    }
    setError(null);
    setIsUpdatingKyc(true);
    try {
      const res = await userService.updateKyc({ kycStatus });
      if (res.error || res.status >= 400) {
        const msg = res.error ?? "Error al actualizar KYC";
        setError(msg);
        return { success: false, error: msg };
      }
      const data = (res.data as { data?: ProfileResponse })?.data;
      if (data) setProfile((p) => (p ? { ...p, kycStatus: data.kycStatus } : null));
      return { success: true };
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsUpdatingKyc(false);
    }
  }

  return {
    profile,
    profileLoading,
    loadProfile,
    alias,
    updateAlias,
    isUpdating,
    updateKyc,
    isUpdatingKyc,
    error,
  };
}
