import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { ROUTES } from "@/constants/routes";
import { navItems } from "@/constants/navigation";
import { LoginModal } from "@/components/auth/LoginModal";
import { RegisterModal } from "@/components/auth/RegisterModal";
import logo from "@/assets/images/logo_isotipo.png";

export function TopNav() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { mode, openLogin, openRegister, close, switchToRegister, switchToLogin } = useAuthModal();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "login") {
      openLogin();
      setSearchParams({}, { replace: true });
    } else if (auth === "register") {
      openRegister();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, openLogin, openRegister, setSearchParams]);

  const initial = user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 backdrop-blur-xl md:px-6">
        <div className="flex items-center gap-6">
          <Link to={ROUTES.ROOT} className="shrink-0">
            <img src={logo} alt="Akru" className="h-9" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.path ||
                (item.path !== ROUTES.ROOT && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link
              to={ROUTES.PROFILE}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                {initial}
              </div>
              <span className="hidden sm:inline">Perfil</span>
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={openLogin}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={openRegister}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </header>

      <LoginModal open={mode === "login"} onClose={close} onSwitchToRegister={switchToRegister} />
      <RegisterModal open={mode === "register"} onClose={close} onSwitchToLogin={switchToLogin} />
    </>
  );
}
