import { useMemo } from 'react';

import calculateLimitedEditions from '@/services/limited_editions.service';

import PopupToBottomSheet from '../components/PopupToBottomSheet';

import LimitedEditionsAvailable from './components/LimitedEditionsAvailable';
import LimitedEditionsNotAvailable from './components/LimitedEditionsNotAvailable';

import './index.css';

function LimitedEditionPopupContent({ close, onRequest, dataNeeded, loading, requested }) {
  const limitedEditions = useMemo(() => {
    return calculateLimitedEditions(parseUnit(dataNeeded.height, dataNeeded.unit), parseUnit(dataNeeded.length, dataNeeded.unit), dataNeeded.price);
  }, []);

  function parseUnit(value, unit) {
    return unit === "inches" ? value * 2.54 : value;
  }

  if(limitedEditions.error || dataNeeded.typeOfArtwork === "Gallery owned") {
    return (
      <LimitedEditionsNotAvailable close={close}/>
    );
  } else {
    return (
      <LimitedEditionsAvailable
        limitedEditions={limitedEditions}
        close={close} 
        onRequest={onRequest}
        loading={loading}
        requested={requested}
      />
    );
  }
}

export default function LimitedEditionPopup({ open, close, onRequest, loading=false, requested=false, dataNeeded }) {
  return (
    <>
      <PopupToBottomSheet 
        className="limited-edition-popup-to-bottom-sheet" 
        open={open} 
        close={close} 
        popupOptions={{ opacity: true }}
      >
        <LimitedEditionPopupContent 
          close={close} 
          onRequest={onRequest} 
          dataNeeded={dataNeeded} 
          loading={loading} 
          requested={requested}
        />
      </PopupToBottomSheet>
    </>
  );
}
