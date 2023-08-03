import TypeOfAccountRequired from "@/layouts/auth/components/TypeOfAccountRequired";
import UserSettings from "@/layouts/navigation/user-settings";
import Address from "@/pages/user-settings/address";
import BankAccount from "@/pages/user-settings/bank-account";
import ClosedMode from "@/pages/user-settings/closed-mode";
import Cookies from "@/pages/user-settings/cookies";
import EditProfile from "@/pages/user-settings/edit-profile";
import GalleryInformation from "@/pages/user-settings/gallery-information";
import LogIn from "@/pages/user-settings/log-in";
import ModeAndTheme from "@/pages/user-settings/mode-theme";
import MyCollection from "@/pages/user-settings/my-collection";
// import Notifications from "@/pages/user-settings/notifications";
import Privacy from "@/pages/user-settings/privacy";
import SettingsIndex from "@/pages/user-settings/settings-index";
import Terms from "@/pages/user-settings/terms";

const UserSettingsRoutes = [
  {
    path: "/profile/settings",
    element: <UserSettings/>,
    children: [
      { index: true, element: <SettingsIndex/> },

      {
        element: <TypeOfAccountRequired allowedTypes={["gallery"]}/>,
        children: [
          { path: "/profile/settings/gallery-information", element: <GalleryInformation/> },
          { path: "/profile/settings/bank-account", element: <BankAccount/> },
          { path: "/profile/settings/closed-mode", element: <ClosedMode/> },
        ]
      },

      {
        element: <TypeOfAccountRequired allowedTypes={["artist", "collector"]}/>,
        children: [   
          { path: "/profile/settings/my-collection", element: <MyCollection/> },
          { path: "/profile/settings/address", element: <Address/> },
        ]
      },

      { path: "/profile/settings/edit-profile", element: <EditProfile/> },
      { path: "/profile/settings/login", element: <LogIn/> },
      { path: "/profile/settings/mode-theme", element: <ModeAndTheme/> },
      // {path: "/profile/settings/notifications", element: <Notifications/>},
      { path: "/profile/settings/privacy", element: <Privacy/> },
      { path: "/profile/settings/terms", element: <Terms/> },
      { path: "/profile/settings/cookies", element: <Cookies/> },
    ]
  }
];

export default UserSettingsRoutes;