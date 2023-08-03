import { useEffect,useState } from 'react';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import Text from '@/shared-components/text/components/Text';

import UploadSecondaryPictures from './components/UploadSecondaryPictures';
import RenderSecondaryPictures from './render-secondary-pictures';

import './index.css';

export default function SecondaryPictures({ formError, setFormError, previewMode, fillWith, onChange }) {
  const [secondaryPictures, setSecondaryPictures] = useState(fillWith); 
  const isFirstRender = useIsFirstRender();

  useEffect(()=>{
    if(!isFirstRender) {
      onChange(secondaryPictures.filter(picture => !picture.loading));
    }
  }, [secondaryPictures]);

  return (
    <>
      {(!previewMode || secondaryPictures.length > 0) && (
        <h2 className="add-artwork-media-form__heading lt-s">
                    Secondary pictures{" "}

          <Text className="add-artwork-media-form__optional-text" small>
                        (Recommended)
          </Text>
        </h2>
      )}

      {
        secondaryPictures.length > 0 ?
          <div className="add-artwork-media-form__secondary-pictures-container">
            <RenderSecondaryPictures
              pictures={secondaryPictures} 
              setPictures={setSecondaryPictures} 
              pictureIds={secondaryPictures.map(picture => picture.image_id)} 
              previewMode={previewMode}
            />

            {(!previewMode && secondaryPictures.length < 4) && (
              <UploadSecondaryPictures
                secondaryPictures={secondaryPictures}
                setSecondaryPictures={setSecondaryPictures}
                formError={formError}
                setFormError={setFormError}
                internal
              />
            )}
          </div>
          :
          !previewMode && (
            <UploadSecondaryPictures
              secondaryPictures={secondaryPictures}
              setSecondaryPictures={setSecondaryPictures}
              formError={formError}
              setFormError={setFormError}
            />
          )
      }

      {(!previewMode || secondaryPictures.length.length > 0) && (
        <Text className="add-artwork-media-form__text" medium paragraph justify>
                    They should allow the spectator to focus on certain details and viewpoints of the artwork. Upload up to four secondary pictures.
        </Text>
      )}
    </>
  );
}
