import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import Artworks from './artworks';

import './index.css';

export default function ArtworksOfArtist({ open, close, artist, profileData, internal }) {
  return (
    <>
      <PopupToBottomSheet 
        className="artworks-of-artist-popup-bottom-sheet" 
        open={open} 
        close={close} 
        popupOptions={{ opacity: true }}
      >
        <div className="artworks-of-artist__container remove-scrollbar">
          <div className="artworks-of-artist__header">
            <Text className="artworks-of-artist__header-text dots-on-overflow" medium paragraph>
              {profileData.user_name}
            </Text>

            <XIcon className="artworks-of-artist__close" onClick={close}/>
          </div>

          <Artworks
            artist={artist}
            profileData={profileData}
            internal={internal}
          />
        </div>
      </PopupToBottomSheet>
    </>
  );
}
