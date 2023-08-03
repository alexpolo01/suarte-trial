import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import UserService from '@/services/user.service';
import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import Text from '@/shared-components/text/components/Text';

import './styles/ProfileImage.css';

export default function ProfileImage({ userType, formState, setFormState }) {
  async function uploadProfileImage(image) {
    const temporalImageId = uuidv4();

    setFormState({
      ...formState,
      user_image: {
        loading: true, 
        temporalImageId,
        image_original_data: {
          name: image.name
        }
      }
    });

    const { response, data } = await UserService.uploadImage(image);

    if(response.ok) {
      setFormState(prevValue => {
        if(Boolean(prevValue.user_image) && prevValue.user_image.temporalImageId === temporalImageId) {
          return {
            ...prevValue,
            user_image: data
          };
        } else {
          return prevValue;
        } 
      });
    } else {
      setFormState({
        ...formState,
        user_image: null
      });
            
      alert("Something went wrong. If the problem persists, contact us at contact@suarte.art.");
    }
  }

  function handleProfilePictureError(errors) {
    if(errors.maxNumber) alert("You are only allowed to upload one image.");
    else if(errors.acceptType) alert("Invalid image type.");
    else if(errors.maxFileSize) alert("File exceeds size limit (15 MB). Try uploading another.");
  }

  return (
    <>
      <ImageUploading 
        maxNumber={1} 
        onChange={(imagesList) => uploadProfileImage(imagesList[0].file)} 
        onError={handleProfilePictureError} 
        maxFileSize={15000000}
      >
        {({ onImageUpload })=>(
          <>
            <div className="profile-image__container">
              <UserProfileImage 
                className="profile-image__image" 
                image={formState.user_image?.image_id} 
                typeOfProfile={userType} 
                loading={formState.user_image?.loading}
              />
                            
              {Boolean(formState.user_image) && <RemoveButton className="profile-image__delete-image" onClick={()=>setFormState({ ...formState, user_image: null })}/>}
            </div>

            <Text className="profile-image__upload-image element-non-selectable" onClick={onImageUpload} medium>
              {
                formState.user_image ? 
                  "Change picture" 
                  : 
                  "Add picture"
              }
            </Text>
          </>
        )}
      </ImageUploading>
    </>
  );
}
