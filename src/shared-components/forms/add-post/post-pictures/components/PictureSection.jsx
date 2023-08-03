import { CircularProgress } from '@mui/material';

import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import ResizableTextarea from '@/shared-components/inputs/components/ResizableTextarea';

import './styles/PictureSection.css';

export default function PictureSection({ pictureIndex, formState, setFormState, onDelete }) {
  const pictureData = formState.post_pictures[pictureIndex];

  function updatePictureSection(key, value) {
    setFormState(prevValue => ({
      ...prevValue,
      post_pictures: prevValue.post_pictures.map(postPicture => {
        if(postPicture._id === pictureData._id) {
          return {
            ...postPicture,
            [key]: value
          };
        } else {
          return postPicture;
        }
      })
    }));
  }

  return (
    <>
      <div className="picture-section__separator"/>

      <div className="picture-section__picture">
        <RemoveButton className="picture-section__delete-picture" onClick={onDelete}/>
                
        {
          pictureData.loading ? 
            <div className="picture-section__picture-loading">
              <div className="picture-section__progress-container">
                <CircularProgress
                  className="picture-section__progress-spinner"
                  variant="determinate"
                  value={pictureData.progress}
                />

                <span className="picture-section__progress-value">
                  {pictureData.progress}%
                </span>
              </div>
            </div>
            :
            <ArtworkImage
              image={pictureData.image_id}
              imageTemplateClassName="picture-section__picture-loading"
              imageClassName="picture-section__picture-image"
            />
        }
      </div>

      <PublicFormInput 
        placeholder={`Picture ${pictureIndex + 1} title`} 
        value={pictureData.picture_title} 
        onChange={(e)=>updatePictureSection("picture_title", e.target.value)}
        margin
      />

      <ResizableTextarea 
        placeholder="What's this picture about?" 
        value={pictureData.picture_description} 
        onChange={(e)=>updatePictureSection("picture_description", e.target.value)}
        ignoreError
      />
    </>
  );
}
