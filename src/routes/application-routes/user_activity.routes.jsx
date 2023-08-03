import UserActivity from "@/layouts/navigation/user-activity";
import ActivityIndex from "@/pages/user-activity/activity-index";
import LikedArtlists from "@/pages/user-activity/liked-artlists";
import LikedArtworks from "@/pages/user-activity/liked-artworks";
import LikedPosts from "@/pages/user-activity/liked-posts";
import LikedThoughts from "@/pages/user-activity/liked-thoughts";
import SavedArtworks from "@/pages/user-activity/saved-artworks";

const UserActivityRoutes = [
  {
    path: "/profile/activity",
    element: <UserActivity/>,
    children: [
      { index: true, element: <ActivityIndex/> },
      { path: "/profile/activity/liked-artworks", element: <LikedArtworks/> },
      { path: "/profile/activity/liked-thoughts", element: <LikedThoughts/> },
      { path: "/profile/activity/liked-artlists", element: <LikedArtlists/> },
      { path: "/profile/activity/liked-posts", element: <LikedPosts/> },
      { path: "/profile/activity/saved-artworks", element: <SavedArtworks/> },
    ]
  }
];

export default UserActivityRoutes;