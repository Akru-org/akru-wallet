import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, BarChart3, Wallet, User, TrendingUp, Globe, Bitcoin, Landmark, ShieldCheck } from 'lucide-react';

const navItems = [
  { path: '/app/home', label: 'Home', icon: Home },
  { path: '/app/markets/general', label: 'Mercado', icon: BarChart3 },
  { path: '/app/wallet', label: 'Wallet', icon: Wallet },
  { path: '/app/profile', label: 'Perfil', icon: User },
];

const sideNavItems = [
  { path: '/app/home', label: 'Home', icon: Home },
  { path: '/app/markets/general', label: 'Mercado General', icon: TrendingUp },
  { path: '/app/markets/etfs', label: 'ETFs', icon: Landmark },
  { path: '/app/markets/crypto', label: 'Crypto', icon: Bitcoin },
  { path: '/app/markets/venezuela', label: 'Venezuela', icon: Globe },
  { path: '/app/wallet', label: 'Wallet / Recarga', icon: Wallet },
  { path: '/app/kyc', label: 'Verificación KYC', icon: ShieldCheck },
  { path: '/app/profile', label: 'Perfil', icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = pathname === item.path || (item.path !== '/app/home' && pathname.startsWith(item.path));
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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm">A</div>
        <span className="font-display text-xl font-bold tracking-tight">Akru</span>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {sideNavItems.map((item) => {
          const active = pathname === item.path || (item.path !== '/app/home' && pathname.startsWith(item.path));
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
