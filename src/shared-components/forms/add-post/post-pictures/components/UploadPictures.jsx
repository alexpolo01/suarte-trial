import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import UserService from '@/services/user.service';
import Text from '@/shared-components/text/components/Text';

import './styles/UploadPictures.css';

export default function UploadPictures({ setFormState }) {
  async function uploadPostPicture(image) {
    const newPictureId = uuidv4();

    setFormState(prevValue => ({
      ...prevValue,
      post_pictures: [
        ...prevValue.post_pictures,
        {
          _id: newPictureId, 
          loading: true,
          progress: 0,
          picture_title: "", 
          picture_description: ""
        }
      ]
    }));

    const { response, data } = await UserService.uploadImage(image, (progress) => {
      setFormState(prevValue => ({
        ...prevValue,
        post_pictures: prevValue.post_pictures.map(postPicture => {
          if(postPicture._id === newPictureId) {
            return {
              ...postPicture,
              progress
            };
          } else {
            return postPicture;
          }
        })
      }));
    });

    if(response.ok) {
      setFormState(prevValue => ({
        ...prevValue,
        post_pictures: prevValue.post_pictures.map(postPicture => {
          if(postPicture._id === newPictureId) {
            return {
              ...postPicture,
              loading: false, 
              ...data
            };
          } else {
            return postPicture;
          }
        })
      }));
    }
  }

  function handlePostPictureError(errors) {
    if(errors.maxNumber) alert("You can only upload one file");
    else if(errors.acceptType) alert("Invalid file format");
    else if(errors.maxFileSize) alert("File exceeds size limit (15 MB). Try uploading another");
  }

  return (
    <>
      <ImageUploading 
        maxNumber={1} 
        onChange={(imagesList) => uploadPostPicture(imagesList[0].file)} 
        onError={handlePostPictureError} 
        maxFileSize={15000000}
      >
        {({ onImageUpload }) => (
          <Text className="post-pictures__add-picture element-non-selectable" onClick={onImageUpload} large>
                        Add picture
          </Text>
        )}
      </ImageUploading>
    </>
  );
}
