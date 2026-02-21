import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { navItems, sideNavItems } from "@/constants/navigation";
import logo from "@/assets/images/logo_isotipo.png";

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = pathname === item.path || (item.path !== ROUTES.HOME && pathname.startsWith(item.path));
          return (
            <Link key={item.path} to={item.path} className={cn('flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors', active ? 'text-primary' : 'text-muted-foreground')}>
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function SideMenu() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-border bg-card/50 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
       <img src={logo} alt="Akru" className="h-10" />
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {sideNavItems.map((item) => {
          const active = pathname === item.path || (item.path !== ROUTES.HOME && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
