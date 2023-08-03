import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import UserService from '@/services/user.service';
import Heading from '@/shared-components/text/components/Heading';

import './styles/UploadMainPicture.css';

export default function UploadMainPicture({ element, setFormError, setMainPictureFile }) {
  async function uploadMainPicture(image) {
    const temporalImageId = uuidv4();

    setFormError(null);
    setMainPictureFile({
      loading: true,
      progress: 0, 
      temporalImageId,
      image_original_data: {
        name: image.name
      }
    }); 

    const { response, data } = await UserService.uploadImage(image, (progress) => {
      setMainPictureFile(prevValue => {
        if(Boolean(prevValue) && prevValue.temporalImageId === temporalImageId) { /** The image might've been deleted */
          return {
            ...prevValue,
            progress
          };
        } else {
          return prevValue;
        }
      });
    });

    if(response.ok) {
      setMainPictureFile(prevValue => { 
        if(Boolean(prevValue) && prevValue.temporalImageId === temporalImageId) { /** The image might've been deleted */
          return data;
        } else {
          return prevValue;
        }
      });
    } else {
      setMainPictureFile(null);
      alert("Something went wrong. If the problem persists, contact us at contact@suarte.art.");
    }
  }

  function handlePictureError(errors) {
    if(errors.maxNumber) setFormError({ element: element, error_code: "ONLY_ONE_FILE" });
    else if(errors.acceptType) setFormError({ element: element, error_code: "INVALID_FILE_FORMAT" });
    else if(errors.maxFileSize) setFormError({ element: element, error_code: "FILE_EXCEEDS_SIZE" });
  }

  return (
    <>
      <ImageUploading 
        maxNumber={1} 
        onChange={(imagesList) => uploadMainPicture(imagesList[0].file)} 
        onError={handlePictureError} 
        maxFileSize={15000000}
      >
        {({ onImageUpload, isDragging, dragProps }) => (
          <div 
            className={`add-artwork-media-form__add-main-picture-button ${isDragging ? "dragging" : ""}`} 
            onClick={onImageUpload} 
            {...dragProps} 
          >
            <Heading className="add-artwork-media-form__add-main-picture-button-text element-non-selectable" small>
                            Add main picture
            </Heading>
          </div>
        )}
      </ImageUploading>
    </>
  );
}
