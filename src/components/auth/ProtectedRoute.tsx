import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { LoadingScreen } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen message="Cargando..." />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={`${ROUTES.ROOT}?auth=login`} replace />;
}
