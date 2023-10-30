import AdminAccountRequired from "@/layouts/auth/components/AdminAccountRequired";
import AdminHeader from "@/layouts/navigation/components/AdminHeader";
import ArtworkRequest from "@/pages/admin/artwork-request";
import ArtworkRequests from "@/pages/admin/artwork-requests";
import GalleryRequests from "@/pages/admin/gallery-requests";
import HomeCustomization from "@/pages/admin/home-customization";
import LimitedEditionRequests from "@/pages/admin/limited-editions-requests";
import WelcomeAdmin from "@/pages/admin/welcome-admin";

const AdminRoutes = [
  {
    element: <AdminAccountRequired/>,
    children: [
      {
        element: <AdminHeader/>,
        children: [
          { path: "/admin", element: <WelcomeAdmin/> },
          { path: "/admin/gallery-requests", element: <GalleryRequests/> },
          { path: "/admin/artwork-requests", element: <ArtworkRequests/> },
          { path: "/admin/limited-edition-requests", element: <LimitedEditionRequests/> },
          { path: "/admin/artwork-request", element: <ArtworkRequest/> }
        ]
      },
      {
        children: [
          { path: "/admin/customize-home", element: <HomeCustomization /> }
        ]
      }
    ]
  }
];

export default AdminRoutes;