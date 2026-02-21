import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { LoadingScreen } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
}
