import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-display font-bold text-xl">
            A
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Akru</h1>
          <p className="text-xs text-muted-foreground">Plataforma de inversión simulada</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
