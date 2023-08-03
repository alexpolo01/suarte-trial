import { useState } from 'react';

import ArtlistImage from '@/shared-components/cards/components/ArtlistImage';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './components/VirtualList';

import './index.css';

export default function EditArtlistImage({ formState, updateFormState, scrollableDiv, readOnly }) {
  const [openArtworkImages, setOpenArtworkImages] = useState(false);

  return (
    <>
      <div className={`edit-artlist-image__wrap ${readOnly ? "read-only" : ""}`}>
        <ArtlistImage className="edit-artlist-image__image" image={formState.artlist_image?.image_id}/>

        {Boolean(formState.artlist_image) && (
          <Text 
            className="edit-artlist__change-image-button element-non-selectable" 
            onClick={() => {
              scrollableDiv.current.scrollTo({ top: 0, behavior: "smooth" }); 
              setOpenArtworkImages(true);
            }} 
            medium
          >
                        Change cover picture
          </Text>
        )}

        {openArtworkImages && (
          <div className="edit-artlist__change-image-bottom-sheet">
            <div className="edit-artlist__change-image-bottom-sheet-header">
              <Text className="edit-artlist__change-image-bottom-sheet-header-text" small>
                                Change artlist cover
              </Text>

              <XIcon className="edit-artlist__change-image-bottom-sheet-close" onClick={()=>setOpenArtworkImages(false)}/>
            </div>

            <div className="edit-artlist__change-image-bottom-sheet-content-container">
              <VirtualList formState={formState} updateFormState={updateFormState}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
