import type { RouteObject } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { GuestRoute } from "@/components/auth/GuestRoute";
import { ForgotPasswordPage } from "@/pages/Auth";
import { ROUTES } from "@/constants/routes";

export const authRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.FORGOT_PASSWORD.slice(1), element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },
];
