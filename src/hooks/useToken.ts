import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/utils/ApiClient";

/**
 * Sincroniza el token del store con ApiClient.
 * Colócalo en App (o en un componente raíz siempre montado) para que
 * cada vez que cambie el token en el store se actualice en la clase ApiClient
 * y todas las peticiones lleven Authorization: Bearer <token>.
 */
export function useToken() {
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    apiClient.setToken(token);
  }, [token]);

  return { token };
}
