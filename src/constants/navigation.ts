import { Home, BarChart3, Wallet, User, TrendingUp, Globe, Bitcoin, Landmark, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { path: ROUTES.HOME, label: "Home", icon: Home },
  { path: ROUTES.MARKETS_GENERAL, label: "Mercado", icon: BarChart3 },
  { path: ROUTES.WALLET, label: "Wallet", icon: Wallet },
  { path: ROUTES.PROFILE, label: "Perfil", icon: User },
];

export const sideNavItems: NavItem[] = [
  { path: ROUTES.HOME, label: "Home", icon: Home },
  { path: ROUTES.MARKETS_GENERAL, label: "Mercado General", icon: TrendingUp },
  { path: ROUTES.MARKETS_ETFS, label: "ETFs", icon: Landmark },
  { path: ROUTES.MARKETS_CRYPTO, label: "Crypto", icon: Bitcoin },
  { path: ROUTES.MARKETS_VENEZUELA, label: "Venezuela", icon: Globe },
  { path: ROUTES.WALLET, label: "Wallet / Recarga", icon: Wallet },
  { path: ROUTES.KYC, label: "Verificación KYC", icon: ShieldCheck },
  { path: ROUTES.PROFILE, label: "Perfil", icon: User },
];
