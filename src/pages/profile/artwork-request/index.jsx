import { Navigate,useLocation } from "react-router-dom";

import AddArtworkForm from "@/shared-components/forms/add-artwork";

export default function ArtworkRequest() {
  const location = useLocation();
    
  if(!location.state?.draftData) {
    return (
      <Navigate to="/inventory/pending" replace/>
    );
  } else if(location.state.draftData.draft_status === "changes_required") {
    return (
      <Navigate to="/profile/add-artwork" state={location.state} replace/>
    );
  } else {
    return (
      <AddArtworkForm artworkData={location.state.draftData} previewMode/>
    );
  }
}
