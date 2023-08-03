import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import UserService from '@/services/user.service';
import Text from '@/shared-components/text/components/Text';

import './styles/UploadCover.css';

export default function UploadCover({ formState, setFormState, element, setFormError }) {
  async function uploadPostCover(image) {
    const temporalImageId = uuidv4();

    setFormError(null);
    setFormState(prevValue => ({
      ...prevValue,
      post_cover: {
        loading: true,
        progress: 0, 
        temporalImageId
      }
    }));

    const { response, data } = await UserService.uploadImage(image, (progress) => {
      setFormState(prevValue => {
        if(Boolean(prevValue.post_cover) && prevValue.post_cover.temporalImageId === temporalImageId) { 
          return {
            ...prevValue,
            post_cover: {
              ...prevValue.post_cover,
              progress
            }
          };
        } else {
          return prevValue;
        }
      });
    });

    if(response.ok) {
      setFormState(prevValue => { 
        if(Boolean(prevValue.post_cover) && prevValue.post_cover.temporalImageId === temporalImageId) { 
          return {
            ...prevValue,
            post_cover: data
          };
        } else {
          return prevValue;
        }
      });
    } else {
      setFormState(prevValue => ({
        ...prevValue,
        post_cover: null
      }));
      alert("Something went wrong. If the problem persists, contact us at contact@suarte.art.");
    }
  }

  function handleCoverError(errors) {
    if(errors.maxNumber) setFormError({ element: element, error_code: "ONLY_ONE_FILE" });
    else if(errors.acceptType) setFormError({ element: element, error_code: "INVALID_FILE_FORMAT" });
    else if(errors.maxFileSize) setFormError({ element: element, error_code: "FILE_EXCEEDS_SIZE" });
  }

  return (
    <>
      <ImageUploading 
        maxNumber={1} 
        onChange={(imagesList)=>uploadPostCover(imagesList[0].file)} 
        onError={handleCoverError} 
        maxFileSize={15000000}
      >
        {({ onImageUpload }) => (
          <Text className="post-cover__add-cover-button element-non-selectable" onClick={onImageUpload} large>
            {
              formState.post_cover ? 
                "Change cover picture" 
                : 
                "Add a cover picture"
            }
          </Text>
        )}
      </ImageUploading>
    </>
  );
}
