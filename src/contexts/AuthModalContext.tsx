import { createContext, useContext, useState, useCallback } from "react";

type AuthModalMode = "login" | "register" | null;

interface AuthModalContextValue {
  mode: AuthModalMode;
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthModalMode>(null);

  const openLogin = useCallback(() => setMode("login"), []);
  const openRegister = useCallback(() => setMode("register"), []);
  const close = useCallback(() => setMode(null), []);
  const switchToRegister = useCallback(() => setMode("register"), []);
  const switchToLogin = useCallback(() => setMode("login"), []);

  return (
    <AuthModalContext.Provider
      value={{ mode, openLogin, openRegister, close, switchToRegister, switchToLogin }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
