import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  HomePage,
  MarketsPage,
  WalletPage,
  ProfilePage,
  KYCPage,
  PortfolioPage,
} from "@/pages/Core";
import { ROUTES } from "@/constants/routes";

export const coreRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "markets", element: <Navigate to={ROUTES.MARKETS_GENERAL} replace /> },
      { path: "markets/:tab", element: <MarketsPage /> },
      {
        path: "app",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Navigate to={ROUTES.PORTFOLIO} replace /> },
          { path: "portfolio", element: <PortfolioPage /> },
          { path: "wallet", element: <WalletPage /> },
          { path: "kyc", element: <KYCPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
];
