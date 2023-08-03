import HomeArtists from "@/pages/home/artists";
import HomeArtlists from "@/pages/home/artlists";
import HomeArtworks from "@/pages/home/artworks";
import HomeDiscover from "@/pages/home/discover";
import HomeGalleries from "@/pages/home/galleries";
import CollectionPage from "@/shared-components/home/collection-page";

const HomeRoutes = [
  { path: "/", element: <HomeDiscover/> },
  { path: "/galleries", element: <HomeGalleries/> },
  { path: "/artists", element: <HomeArtists/> },
  { path: "/artworks", element: <HomeArtworks/> },
  { path: "/artlists", element: <HomeArtlists/> },

  /** SLIDER ROUTES */
  { path: "/fresh-picks", element: <CollectionPage collectionEndpoint="/category/fresh-picks" collectionName="Fresh Picks"/> },
  { path: "/abstraction", element: <CollectionPage collectionEndpoint="/category/abstraction" collectionName="Abstraction"/> },
  { path: "/love", element: <CollectionPage collectionEndpoint="/category/love" collectionName="Love"/> },
  { path: "/blue", element: <CollectionPage collectionEndpoint="/category/blue" collectionName="Blue"/> },
  { path: "/masterpiece-of-the-day", element: <CollectionPage collectionEndpoint="/category/masterpiece-of-the-day" collectionName="Masterpiece of the day"/> },
  // {path: "/story-told", element: <CollectionPage collectionEndpoint="/category/story-told" collectionName="Story told"/>},
  { path: "/limited-editions", element: <CollectionPage collectionEndpoint="/category/limited_editions" collectionName="Limited Editions"/> },
];

export default HomeRoutes;