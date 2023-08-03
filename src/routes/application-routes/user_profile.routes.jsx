import TypeOfAccountRequired from "@/layouts/auth/components/TypeOfAccountRequired";
import UserProfile from "@/layouts/navigation/user-profile";
import ProfileArtists from "@/pages/profile/artists";
import ProfileArtlists from "@/pages/profile/artlists";
import ProfileArtworks from "@/pages/profile/artworks";
import ProfileArtworkDrafts from "@/pages/profile/artworks-drafts";
import ProfileBoard from "@/pages/profile/board";
import ProfileCollection from "@/pages/profile/collection";
import ProfileCommunity from "@/pages/profile/community";
import ProfilePostDrafts from "@/pages/profile/posts-drafts";
import ProfileRedirect from "@/pages/profile/profile-redirect";

const InternalProfileRoutes = [
  {
    path: "/profile",
    element: <UserProfile internal/>,
    children: [
      { index: true, element: <ProfileRedirect/> },
      {
        element: <TypeOfAccountRequired allowedTypes={["artist", "collector"]}/>,
        children: [
          { path: "/profile/collection", element: <ProfileCollection/> },
          { path: "/profile/community", element: <ProfileCommunity/> },
        ]
      },

      {
        element: <TypeOfAccountRequired allowedTypes={["gallery"]}/>,
        children: [
          { path: "/profile/artworks/drafts", element: <ProfileArtworkDrafts/> },
          { path: "/profile/board", element: <ProfileBoard/> },
          { path: "/profile/board/drafts", element: <ProfilePostDrafts/> },
          { path: "/profile/artists", element: <ProfileArtists/> },
        ]
      },

      {
        element: <TypeOfAccountRequired allowedTypes={["artist", "gallery"]}/>,
        children: [
          { path: "/profile/artworks", element: <ProfileArtworks/> },
        ]
      },

      { path: "/profile/artlists", element: <ProfileArtlists/> },
    ]
  }
];

const ExternalProfileRoutes = [
  {
    path: "/user/:username",
    element: <UserProfile/>,
    children: [
      { index: true, element: <ProfileRedirect/> },
      { path: "/user/:username/artworks", element: <ProfileArtworks/> },
      { path: "/user/:username/collection", element: <ProfileCollection/> },
      { path: "/user/:username/artists", element: <ProfileArtists/> },
      { path: "/user/:username/artlists", element: <ProfileArtlists/> },
      { path: "/user/:username/board", element: <ProfileBoard/> },
      { path: "/user/:username/community", element: <ProfileCommunity/> },
    ]
  }
];

export {
  InternalProfileRoutes,
  ExternalProfileRoutes
};