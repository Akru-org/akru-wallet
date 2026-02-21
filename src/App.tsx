import { Toaster } from "@/components/ui/toaster/index";
import { Toaster as Sonner } from "@/components/ui/sonner/index";
import { TooltipProvider } from "@/components/ui/tooltip/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "@/navigator";
import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { AuthModalProvider } from "@/contexts/AuthModalContext";

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
      <AuthModalProvider>
        <AppInit />
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </AuthModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
