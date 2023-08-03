import { Navigate,useLocation } from 'react-router-dom';

import AddArtworkForm from '@/shared-components/forms/add-artwork';

export default function EditArtwork() {
  const location = useLocation();

  if(!location.state?.artworkData) {
    return (
      <Navigate to="/inventory/available" replace/>
    );
  } else {
    return (
      <>
        <AddArtworkForm artworkData={location.state.artworkData} editMode/>
      </>
    );
  }
}
