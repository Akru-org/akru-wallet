import { useAuthStore } from '@/store/authStore';
import { Bell } from 'lucide-react';

export function TopBar() {
  const user = useAuthStore((s) => s.user);
  const initial = user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-xl px-4 py-3 md:px-6">
      <div className="md:hidden flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary text-primary-foreground font-display font-bold text-xs">A</div>
        <span className="font-display text-lg font-bold tracking-tight">Akru</span>
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
