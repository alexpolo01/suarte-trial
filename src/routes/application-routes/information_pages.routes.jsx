import ArtworkAgreement from "@/pages/information/artwork-agreement";
import CookiePolicy from "@/pages/information/cookies";
import GuidelinesUploadArtworks from "@/pages/information/guidelines-upload-artwork";
import LimitedEditionPolicies from "@/pages/information/limited-editions-policies";
import PrivacyPolicy from "@/pages/information/privacy-policy";
import Terms from "@/pages/information/terms";

const InformationPagesRoutes = [
  {
    path: '/terms',
    element: <Terms/>
  },

  {
    path: '/privacy-policy',
    element: <PrivacyPolicy/>
  },

  {
    path: '/cookie-policy',
    element: <CookiePolicy/>
  },

  {
    path: '/guidelines-upload-artworks',
    element: <GuidelinesUploadArtworks/>
  },

  {
    path: '/limited-edition-policies',
    element: <LimitedEditionPolicies/>
  },

  {
    path: '/artwork-agreement',
    element: <ArtworkAgreement/>
  } 
];

export default InformationPagesRoutes;