import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "@/pages/Core";
import { authRoutes } from "@/navigator/AuthRoutes";
import { coreRoutes } from "@/navigator/CoreRoutes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...coreRoutes,
  { path: "*", element: <NotFound /> },
]);
