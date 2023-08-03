import useScreenSize from '@/hooks/useScreenSize';
import GenericBottomSheet from '@/shared-components/popups/components/GenericBottomSheet';

import ArtworkRatings from './artwork-ratings';
import ArtworkThoughts from './artwork-thoughts';

import './index.css';

export default function Socials({ selectedSocial, closeSocial }) {
  const screenSize = useScreenSize();
  const displayMountAnimation = selectedSocial === "thoughts" || selectedSocial === "ratings";

  if(screenSize.width <= 900) {
    return (
      <>
        <GenericBottomSheet 
          className="artwork-view-socials-bottom-sheet" 
          open={selectedSocial === "thoughts" || selectedSocial === "ratings"} 
          close={closeSocial} 
          onTouchStart={e => e.stopPropagation()} 
          onTouchEnd={e => e.stopPropagation()} 
          onWheel={e => e.stopPropagation()}
        >
          <div className="artwork-view-socials-bottom-sheet__content-container">
            {selectedSocial === "thoughts" && (
              <ArtworkThoughts closeSocial={closeSocial}/>
            )}

            {selectedSocial === "ratings" && (
              <ArtworkRatings closeSocial={closeSocial}/>
            )}
          </div>
        </GenericBottomSheet>
      </>
    );
  } else {
    return (
      <>
        <div className={`artwork-view-socials__outter-container ${displayMountAnimation ? "mount-animation" : ""}`}>
          <div className="artwork-view-socials__inner-container">
            {(selectedSocial === "thoughts" || selectedSocial === "initial-thoughts") && (
              <ArtworkThoughts closeSocial={closeSocial}/>
            )}
    
            {(selectedSocial === "ratings" || selectedSocial === "initial-ratings") && (
              <ArtworkRatings closeSocial={closeSocial}/>
            )}
          </div>
        </div>
      </>
    );
  }
}
