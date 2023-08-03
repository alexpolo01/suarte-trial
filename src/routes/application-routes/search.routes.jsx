import Search from "@/pages/search";
import CollectionPage from "@/shared-components/home/collection-page";

const SearchRoutes = [
  { path: "/search", element: <Search/> },

  /** Theme categories */
  { path: "/search/abstraction", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Abstraction" additionalParams={{ theme: ["Abstraction"] }}/> },
  { path: "/search/figures", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Figures" additionalParams={{ theme: ["Figures"] }}/> },
  { path: "/search/landscape", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Landscape" additionalParams={{ theme: ["Landscape"] }}/> },
  { path: "/search/pop-culture", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Pop Culture" additionalParams={{ theme: ["Pop Culture"] }}/> },

  /** Emotions categories */
  { path: "/search/happiness", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Happiness" additionalParams={{ emotion: ["Happiness"] }}/> },
  { path: "/search/love", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Love" additionalParams={{ emotion: ["Love"] }}/> },
  { path: "/search/freedom", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Freedom" additionalParams={{ emotion: ["Freedom"] }}/> },
  { path: "/search/curiosity", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Curiosity" additionalParams={{ emotion: ["Curiosity"] }}/> },

  /** Colors categories */
  { path: "/search/blue", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Blue" additionalParams={{ color: ["Blue"] }}/> },
  { path: "/search/green", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Green" additionalParams={{ color: ["Green"] }}/> },
  { path: "/search/red", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Red" additionalParams={{ color: ["Red"] }}/> },
  { path: "/search/yellow", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Yellow" additionalParams={{ color: ["Yellow"] }}/> },

  /** Size categories */
  { path: "/search/under-45cm", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Under 45 cm" additionalParams={{ size: { unit: "cm", minWidth: "0", minHeight: "0", width: "45", height: "45", condition: "smaller" } }}/> },
  { path: "/search/45cm-90cm", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="45 cm - 90 cm" additionalParams={{ size: { unit: "cm", minWidth: "45", minHeight: "45", width: "90", height: "90", condition: "smaller" } }}/> },
  { path: "/search/90cm-120cm", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="90 cm - 120 cm" additionalParams={{ size: { unit: "cm", minWidth: "90", minHeight: "90", width: "120", height: "120", condition: "smaller" } }}/> },
  { path: "/search/over-120cm", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Over 120 cm" additionalParams={{ size: { unit: "cm", width: "120", height: "120", condition: "bigger" } }}/> },

  /** Price categories */
  { path: "/search/under-1000-dollars", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Under $1000" additionalParams={{ price: [0, 1000] }}/> },
  { path: "/search/between-1001-and-5000-dollars", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="$1,001 - $5,000" additionalParams={{ price: [1001, 5000] }}/> },
  { path: "/search/between-5001-and-10000-dollars", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="$5,001 - $10,000" additionalParams={{ price: [5001, 10000] }}/> },
  { path: "/search/over-10000-dollars", element: <CollectionPage collectionEndpoint="/search/artwork" collectionName="Over $10,000" additionalParams={{ price: [10000, Number.MAX_SAFE_INTEGER] }}/> },
];

export default SearchRoutes;