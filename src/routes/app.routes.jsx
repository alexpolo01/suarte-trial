import AppAccessControl from "@/layouts/auth/components/AppAccessControl";
import TypeOfAccountRequired from "@/layouts/auth/components/TypeOfAccountRequired";
import UserAccountRequired from "@/layouts/auth/components/UserAccountRequired";
import AppNavigation from "@/layouts/navigation/components/AppNavigation";
import Artwork from "@/pages/artwork";
import SuarteWorld from "@/pages/home/suarteworld";
import Notifications from "@/pages/notifications";
import PaymentFailed from "@/pages/payment-failed";
import AddArtwork from "@/pages/profile/add-artwork";
import AddPost from "@/pages/profile/add-post";
import Artlist from "@/pages/profile/artlist";
import ArtworkRequest from "@/pages/profile/artwork-request";
import EditArtwork from "@/pages/profile/edit-artwork";
import EditPost from "@/pages/profile/edit-post";
import PlayArtlist from "@/pages/profile/play-artlist";
import Post from "@/pages/profile/post";
// import HomeFollowing from "@/pages/home/following";
import Rankings from "@/pages/rankings";
import SuarteRoad from "@/pages/suarte-road";

import GalleryProfileOptions from "./application-routes/gallery_profile_options.routes";
import HomeRoutes from "./application-routes/home.routes";
import OrderRoutes from "./application-routes/order.routes";
import SearchRoutes from "./application-routes/search.routes";
import UserActivityRoutes from "./application-routes/user_activity.routes";
import { ExternalProfileRoutes, InternalProfileRoutes } from "./application-routes/user_profile.routes";
import UserSettingsRoutes from "./application-routes/user_settings.routes";

/**
 * These are the routes that are inside of the app. We will have routes that anyone can enter (account or guest) and we will have protected routes (only people with accounts or certain type of accounts will be able to enter).
 * Internally, a guest is not an account, it's just a logical abstraction. Everyone without a session will be treated as a guest.
 * 
 * Admins are not allowed to enter the app routes either. They will be redirected to /admin routes.
 */
const AppRoutes = [
  {
    element: <AppAccessControl/>,
    children: [
      {
        element: <AppNavigation/>,
        children: [
          ...ExternalProfileRoutes,
          ...HomeRoutes,
          ...SearchRoutes,
          { path: "/rankings", element: <Rankings/> },
          { path: "/notifications", element: <Notifications/> },
          { path: "/payment-failed", element: <PaymentFailed/> },
          {
            element: <UserAccountRequired/>,
            children: [
              ...InternalProfileRoutes,
              // {path: "/following", element: <HomeFollowing/>}
            ]
          }
        ]
      },
      { path: "/artlist/:artlistId", element: <Artlist/> },
      { path: "/artlist/play", element: <PlayArtlist/> }, 
      { path: "/post/:postId", element: <Post/> },
      { path: '/artwork/:artworkId', element: <Artwork/> },
      { path: "/suarteworld", element: <SuarteWorld/> },
      {
        element: <UserAccountRequired/>, /** This is for protected routes that do not have the app navigation layout */
        children: [
          ...UserSettingsRoutes,
          ...UserActivityRoutes,
          ...OrderRoutes,
          {
            element: <TypeOfAccountRequired allowedTypes={["gallery"]}/>,
            children: [
              ...GalleryProfileOptions,
              { path: "/profile/add-artwork", element: <AddArtwork/> },
              { path: "/profile/edit-artwork", element: <EditArtwork/> },
              { path: "/artwork-request", element: <ArtworkRequest/> },
              { path: "/profile/add-post", element: <AddPost/> },
              { path: "/profile/edit-post", element: <EditPost/> }
            ]
          },
          {
            element: <TypeOfAccountRequired allowedTypes={["artist", "collector"]}/>,
            children: [
              { path: "/profile/suarte-road", element: <SuarteRoad/> }
            ]
          },
        ]
      }
    ]
  }
];

export default AppRoutes;