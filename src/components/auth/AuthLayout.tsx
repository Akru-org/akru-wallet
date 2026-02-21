import { Outlet } from "react-router-dom";
import logo from "@/assets/images/logo_isotipo.png";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Akru" className="h-10" />
          <p className="text-xs text-muted-foreground">Plataforma de inversión simulada</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
