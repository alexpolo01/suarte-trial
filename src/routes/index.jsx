import { createBrowserRouter } from "react-router-dom";

import AppInit from "@/layouts/wrappers/components/AppInit";
import Prueba from "@/shared-components/common/components/Prueba";

import AdminRoutes from "./admin.routes";
import AppRoutes from "./app.routes";
import OnboardingRoutes from "./onboarding.routes";
import PublicRoutes from "./public.routes";

const router = createBrowserRouter([
  {
    element: <AppInit/>,
    children: [
      ...PublicRoutes,
      ...OnboardingRoutes,
      ...AppRoutes,
      ...AdminRoutes,
      { path: '/prueba', element: <Prueba/> },
    ]
  }
]);

export default router;