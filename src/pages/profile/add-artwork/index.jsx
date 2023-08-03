import { useLocation } from 'react-router-dom';

import AddArtworkForm from '@/shared-components/forms/add-artwork';

export default function AddArtwork() {
  const location = useLocation();

  return (
    <>
      <AddArtworkForm 
        artworkData={location.state?.draftData} 
        changesRequired={location.state?.draftData?.draft_changes}
      />
    </>
  );
}
