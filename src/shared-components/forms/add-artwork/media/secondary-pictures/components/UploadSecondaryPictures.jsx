import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import UserService from '@/services/user.service';
import FormError from '@/shared-components/error/components/FormError';

import './styles/UploadSecondaryPictures.css';

export default function UploadSecondaryPictures({ internal, secondaryPictures, setSecondaryPictures, formError, setFormError }) {
  async function uploadSecondaryPictures(imageList) {
    if((secondaryPictures.length + imageList.length) > 4) { 
      setFormError({
        element: "artwork_secondary_pictures_error", 
        error_code: "TOO_MANY_ARTWORK_IMAGES"
      });
    } else {
      setFormError(null);

      for(let i=0; i<imageList.length; i++) {
        const newImageId = uuidv4();
        const newImage = imageList[i].file;

        setSecondaryPictures(prevValue => { 
          return [
            ...prevValue, 
            {
              loading: true,
              progress: 0,
              image_id: newImageId,
              image_original_data: {
                name: newImage.name
              }
            }
          ];
        });

        UserService.uploadImage(newImage, (progress) => {
          setSecondaryPictures(prevValue => prevValue.map(picture => {
            if(picture.image_id === newImageId) {
              return {
                ...picture,
                progress
              };
            } else {
              return picture;
            }
          }));
        }).then(({ response, data }) => {
          if(response.ok) {
            setSecondaryPictures(prevValue => prevValue.map(picture => {
              if(picture.image_id === newImageId) {
                return data;
              } else {
                return picture;
              }
            }));
          } else {
            setSecondaryPictures(prevValue => prevValue.filter(picture => picture.image_id !== newImageId));
            alert("Something went wrong. If the problem persists, contact us at contact@suarte.art.");
          }
        });
      }
    }
  }

  function handleSecondaryPicturesError(errors) {
    if(errors.maxNumber) setFormError({ element: "artwork_secondary_pictures_error", error_code: "TOO_MANY_ARTWORK_IMAGES" });
    else if(errors.acceptType) setFormError({ element: "artwork_secondary_pictures_error", error_code: "INVALID_FILE_FORMAT" });
    else if(errors.maxFileSize) setFormError({ element: "artwork_secondary_pictures_error", error_code: "FILE_EXCEEDS_SIZE" });
  }
    
  return (
    <>
      <ImageUploading 
        maxNumber={4} 
        multiple 
        onChange={uploadSecondaryPictures} 
        onError={handleSecondaryPicturesError} 
        maxFileSize={15000000}
      >
        {({ onImageUpload, isDragging, dragProps }) => (
          <div className={`add-artwork-media-form__add-secondary-pictures-button-outter ${internal ? "internal" : ""}`}>
            <div 
              className={`add-artwork-media-form__add-secondary-pictures-button element-non-selectable lt-s ${isDragging ? "dragging" : ""}`} 
              id="artwork_secondary_pictures_error"
              onClick={onImageUpload} 
              {...dragProps} 
            >
                            Add secondary picture
            </div>

            <FormError error={formError} element="artwork_secondary_pictures_error"/>
          </div>
        )}
      </ImageUploading>
    </>
  );
}
