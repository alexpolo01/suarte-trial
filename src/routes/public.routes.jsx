import ResetPassword from "@/pages/reset-password";
import RouteNotFound from "@/pages/route-not-found";

import InformationPagesRoutes from "./application-routes/information_pages.routes";

/**
 * These are the routes that are outside of the app. They do not require to have an account or be a guest. Anyone can see this pages.
 */
const PublicRoutes = [
  ...InformationPagesRoutes,
  { path: '/reset-password', element: <ResetPassword/> },
  { path: '*', element: <RouteNotFound/> }, 
];

export default PublicRoutes;