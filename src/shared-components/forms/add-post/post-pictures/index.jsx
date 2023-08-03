import { useState } from 'react';

import ConfirmationDialog from '@/shared-components/popups/components/ConfirmationDialog';

import PictureSection from './components/PictureSection';
import UploadPictures from './components/UploadPictures';

import './index.css';

export default function PostPictures({ formState, setFormState }) {
  const [pictureToDelete, setPictureToDelete] = useState(null);

  function deletePicture(picture) {
    setFormState(prevValue => ({
      ...prevValue,
      post_pictures: prevValue.post_pictures.filter(postPicture => postPicture._id !== picture._id)
    }));
  }

  return (
    <>
      {formState.post_pictures.map((postPicture, index) => (
        <PictureSection 
          key={postPicture._id} 
          pictureIndex={index}
          formState={formState}
          setFormState={setFormState}
          onDelete={()=>{
            if(postPicture.loading) {
              deletePicture(postPicture);
            } else {
              setPictureToDelete(postPicture);
            }
          }}
        />
      ))}

      <div className="add-post__section-end-separator"/>

      <UploadPictures formState={formState} setFormState={setFormState}/>

      <ConfirmationDialog 
        open={Boolean(pictureToDelete)} 
        onClose={()=>setPictureToDelete(null)} 
        onConfirm={() => {
          deletePicture(pictureToDelete); 
          setPictureToDelete(null);
        }} 
        className="post-pictures__delete-picture-dialog" 
        title="Delete picture"
        closeButtonText="Keep it" 
        confirmButtonText="Delete" 
        dialogText="Are you sure you want to delete this picture? All the text regarding the picture will be lost."
        opacity
      />
    </>
  );
}
