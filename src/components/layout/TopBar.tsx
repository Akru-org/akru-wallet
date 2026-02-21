import { useAuthStore } from "@/store/authStore";
import { Bell } from "lucide-react";
import logo from "@/assets/images/logo_isotipo.png";

export function TopBar() {
  const user = useAuthStore((s) => s.user);
  const initial = user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-xl px-4 py-3 md:px-6">
      <div className="md:hidden flex items-center gap-2">
        <img src={logo} alt="Akru" className="h-10" />
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <Bell size={18} />
        </button>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-semibold">
          {initial}
        </div>
      </div>
    </header>
  );
}
