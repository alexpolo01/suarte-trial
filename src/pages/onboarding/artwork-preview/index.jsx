import { Navigate,useLocation } from "react-router-dom";

import AddArtworkForm from "@/shared-components/forms/add-artwork";

export default function ArtworkPreview() {
  const location = useLocation();
    
  if(!(location.state?.draftData)) {
    return <Navigate to="/verify-gallery/uploaded-artworks" replace/>;
  }

  if(location.state.draftData.draft_status === "changes_required") {
    return <Navigate to="/verify-gallery/add-artwork" state={location.state} replace/>;
  }

  return <AddArtworkForm artworkData={location.state.draftData} previewMode/>;
}
