import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  HomePage,
  MarketsPage,
  WalletPage,
  ProfilePage,
  KYCPage,
} from "@/pages/Core";
import { ROUTES } from "@/constants/routes";

export const coreRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.APP.slice(1),
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to={ROUTES.HOME} replace /> },
          { path: ROUTES.HOME.replace(`${ROUTES.APP}/`, ""), element: <HomePage /> },
          { path: "markets/:tab", element: <MarketsPage /> },
          { path: "markets", element: <Navigate to={ROUTES.MARKETS_GENERAL} replace /> },
          { path: ROUTES.WALLET.replace(`${ROUTES.APP}/`, ""), element: <WalletPage /> },
          { path: ROUTES.PROFILE.replace(`${ROUTES.APP}/`, ""), element: <ProfilePage /> },
          { path: ROUTES.KYC.replace(`${ROUTES.APP}/`, ""), element: <KYCPage /> },
        ],
      },
    ],
  },
];
