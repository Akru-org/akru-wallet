import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";
import { BottomNav } from "./Navigation";
import { SandboxBanner } from "./SandboxBanner";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SandboxBanner />
      <TopNav />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="mx-auto max-w-7xl p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
