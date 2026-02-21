import { Home, BarChart3, Wallet, User, TrendingUp, Globe, Bitcoin, Landmark, ShieldCheck, PieChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { path: ROUTES.ROOT, label: "Mercado", icon: BarChart3 },
  { path: ROUTES.PORTFOLIO, label: "Portafolio", icon: PieChart },
  { path: ROUTES.WALLET, label: "Wallet", icon: Wallet },
  { path: ROUTES.KYC, label: "KYC", icon: ShieldCheck },
];

export const sideNavItems: NavItem[] = [
  { path: ROUTES.ROOT, label: "Mercado", icon: Home },
  { path: ROUTES.PORTFOLIO, label: "Portafolio", icon: PieChart },
  { path: ROUTES.MARKETS_GENERAL, label: "Mercado General", icon: TrendingUp },
  { path: ROUTES.MARKETS_ETFS, label: "ETFs", icon: Landmark },
  { path: ROUTES.MARKETS_CRYPTO, label: "Crypto", icon: Bitcoin },
  { path: ROUTES.MARKETS_VENEZUELA, label: "Venezuela", icon: Globe },
  { path: ROUTES.WALLET, label: "Wallet / Recarga", icon: Wallet },
  { path: ROUTES.KYC, label: "Verificación KYC", icon: ShieldCheck },
  { path: ROUTES.PROFILE, label: "Perfil", icon: User },
];
