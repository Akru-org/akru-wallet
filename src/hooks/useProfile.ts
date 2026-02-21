import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { userService } from "@/services/user.service";

export function useProfile() {
  const user = useAuthStore((s) => s.user);
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alias = user?.alias ?? "";

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
      const updatedAlias = (res.data as { data?: { alias?: string } })?.data?.alias ?? trimmed;
      setAuthUser(user ? { ...user, alias: updatedAlias } : null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsUpdating(false);
    }
  }

  return { alias, updateAlias, isUpdating, error };
}
