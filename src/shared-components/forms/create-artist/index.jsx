import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import ArtistForm from './artist-form';

import './index.css';

export default function CreateArtist({ open, close, onCreate, artistData, createMode, editMode=false }) {
  return (
    <>
      <GenericPopup open={open} className="create-artist__popup remove-scrollbar" opacity>
        <div className="create-artist__header">
          <Text className="create-artist__header-text" medium>
            {
              editMode ?
                "Edit artist profile"
                :
                "Create an artist profile"
            }
          </Text>
                    
          <XIcon className="create-artist__close" onClick={close}/>
        </div>

        <ArtistForm
          artistData={artistData}
          onCreate={onCreate}
          createMode={createMode}
          editMode={editMode}
          close={close}
        />
      </GenericPopup>
    </>
  );
}
