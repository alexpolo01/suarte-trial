import OnboardingNotCompletedRequired from "@/layouts/auth/components/OnboardingNotCompletedRequired";
import TypeOfAccountRequired from "@/layouts/auth/components/TypeOfAccountRequired";
import VerifyGallery from "@/layouts/navigation/verify-gallery";
import AddArtwork from "@/pages/onboarding/add-artwork";
import ArtworkPreview from "@/pages/onboarding/artwork-preview";
import Drafts from "@/pages/onboarding/drafts";
import OnBoarding from "@/pages/onboarding/onboarding";
import UploadedArtworks from "@/pages/onboarding/uploaded-artworks";
import VerifiedArtworks from "@/pages/onboarding/verified-artworks";

/**
 * This are some special routes outside the App. This is only for accounts that are not completed.
 * You will require an uncompleted user account (guests are not allowed) to see these routes.
 */
const OnboardingRoutes = [
  {
    element: <OnboardingNotCompletedRequired/>,
    children: [
      { path: '/onboarding/collector',element: <OnBoarding user_type="collector"/> },
      { path: '/onboarding/artist', element: <OnBoarding user_type="artist"/> },
      { path: '/onboarding/gallery', element: <OnBoarding user_type="gallery"/> },

      {
        element: <TypeOfAccountRequired allowedTypes={["gallery"]}/>,
        children: [
          { path: '/verify-gallery/add-artwork', element: <AddArtwork/> }, 
          { path: '/verify-gallery/preview', element: <ArtworkPreview/> },
          {
            element: <VerifyGallery/>,
            children: [
              { path: '/verify-gallery/uploaded-artworks', element: <UploadedArtworks/> },
              { path: '/verify-gallery/verified-artworks', element: <VerifiedArtworks/> },
              { path: '/verify-gallery/uploaded-artworks/drafts', element: <Drafts/> },
            ]
          },
        ]
      }
    ]
  }
];

export default OnboardingRoutes;