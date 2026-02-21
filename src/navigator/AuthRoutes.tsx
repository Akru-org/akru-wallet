import type { RouteObject } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { GuestRoute } from "@/components/auth/GuestRoute";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/pages/Auth";
import { ROUTES } from "@/constants/routes";

export const authRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN.slice(1), element: <LoginPage /> },
          { path: ROUTES.REGISTER.slice(1), element: <RegisterPage /> },
          { path: ROUTES.FORGOT_PASSWORD.slice(1), element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },
];
