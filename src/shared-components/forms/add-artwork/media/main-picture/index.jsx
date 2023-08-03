import { useEffect,useState } from 'react';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import FormError from '@/shared-components/error/components/FormError';
import Text from '@/shared-components/text/components/Text';

import MainPictureCard from './components/MainPictureCard';
import UploadMainPicture from './components/UploadMainPicture';

import './index.css';

export default function MainPicture({ element, formError, setFormError, previewMode, fillWith, onChange }) {
  const [mainPictureFile, setMainPictureFile] = useState(fillWith); 
  const isFirstRender = useIsFirstRender();

  useEffect(()=>{
    if(!isFirstRender) {
      if(!mainPictureFile?.loading) {
        onChange(mainPictureFile);
      } else {
        onChange(null);
      }
    }
  }, [mainPictureFile]);

  return (
    <>
      <h2 className="add-artwork-media-form__heading lt-m">
                Main picture
      </h2>

      <div className="add-artwork-media-form__main-picture" id={`${element}_error`}>
        {
          mainPictureFile ?
            <MainPictureCard
              previewMode={previewMode}
              mainPictureFile={mainPictureFile}
              setMainPictureFile={setMainPictureFile}
            />
            :
            <UploadMainPicture
              element={element}
              setFormError={setFormError}
              setMainPictureFile={setMainPictureFile}
            />
        }

        <FormError 
          error={formError} 
          alternativeElement={`${element}_error`} 
          element={element}
        />
      </div>
            
      <Text className="add-artwork-media-form__text" medium paragraph justify>
                It must be a quality photo of the entire artwork, without any spaces behind it and preserving its original format.
      </Text>
    </>
  );
}
