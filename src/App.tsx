import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GuestRoute } from "@/components/auth/GuestRoute";
import HomePage from "@/pages/Home";
import MarketsPage from "@/pages/Markets";
import WalletPage from "@/pages/Wallet";
import ProfilePage from "@/pages/Profile";
import KYCPage from "@/pages/KYC";
import LoginPage from "@/pages/Auth/Login";
import RegisterPage from "@/pages/Auth/Register";
import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";

const queryClient = new QueryClient();

function AppInit() {
  const theme = useUiStore((s) => s.theme);
  const initAuthListener = useAuthStore((s) => s.initAuthListener);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const unsub = initAuthListener();
    return unsub;
  }, [initAuthListener]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppInit />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Guest routes */}
          <Route element={<GuestRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/app/home" element={<HomePage />} />
              <Route path="/app/markets/:tab" element={<MarketsPage />} />
              <Route path="/app/markets" element={<Navigate to="/app/markets/general" replace />} />
              <Route path="/app/wallet" element={<WalletPage />} />
              <Route path="/app/profile" element={<ProfilePage />} />
              <Route path="/app/kyc" element={<KYCPage />} />
            </Route>
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/app/home" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
