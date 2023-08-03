import { useState } from 'react';

import GalleryService from '@/services/gallery.service';
import LimitedEditionPopup from '@/shared-components/popups/limited-edition';

import './styles/RequestLimitedEditions.css';

export default function RequestLimitedEditions({ open, close, artworkData, onActivateLimitedEdition }) {
  const [formLoading, setFormLoading] = useState();

  async function requestLimitedEditions() {
    setFormLoading(true);

    const { response } = await GalleryService.requestLimitedEditions(artworkData._id);

    if(response.ok) {
      setFormLoading(false);
      onActivateLimitedEdition(artworkData._id);
    }
  }

  return (
    <>
      <LimitedEditionPopup
        open={open}
        close={close}
        onRequest={requestLimitedEditions}
        loading={formLoading}
        requested={artworkData.artwork_about.artwork_limited_edition}
        dataNeeded={{
          typeOfArtwork: artworkData.artwork_about.artwork_type,
          length: artworkData.artwork_about.artwork_size.length,
          height: artworkData.artwork_about.artwork_size.height,
          unit: artworkData.artwork_about.artwork_size.unit,
          price: artworkData.artwork_about.artwork_price
        }}
      />
    </>
  );
}
