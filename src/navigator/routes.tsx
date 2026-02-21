import { createBrowserRouter, Navigate } from "react-router-dom";
import { NotFound } from "@/pages/Core";
import { authRoutes } from "@/navigator/AuthRoutes";
import { coreRoutes } from "@/navigator/CoreRoutes";
import { ROUTES } from "@/constants/routes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...coreRoutes,
  { path: ROUTES.ROOT, element: <Navigate to={ROUTES.HOME} replace /> },
  { path: "*", element: <NotFound /> },
]);
