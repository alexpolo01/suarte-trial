import { CircularProgress } from '@mui/material';
import { useState } from 'react';

import config from '@/config';
import useStateHandler from '@/hooks/useStateHandler';
import Text from '@/shared-components/text/components/Text';

import RemovePicturePopup from '../../components/RemovePicturePopup';

import './styles/MainPictureCard.css';

export default function MainPictureCard({ mainPictureFile, setMainPictureFile, previewMode }) {
  const { state } = useStateHandler();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  function deletePicture() {
    if(mainPictureFile.loading) { /* If the image is still loading, we delete the image without popup */
      setMainPictureFile(null); 
    } else {
      setOpenDeleteConfirmation(true);
    }
  }

  return (
    <>
      <div className="add-artwork-media-form__main-picture-container">
        {!previewMode && (
          <div className="add-artwork-media-form__main-picture-delete-button" onClick={deletePicture}>
            <div/>
          </div>
        )}

        {
          mainPictureFile.loading ? 
            <div className="add-artwork-media-form__main-picture-loading-container">
              <div className="add-artwork-main-picture__progress-container">
                <CircularProgress
                  className="add-artwork-main-picture__progress-spinner"
                  variant="determinate"
                  value={mainPictureFile.progress}
                />

                <span className="add-artwork-main-picture__progress-value">
                  {mainPictureFile.progress}%
                </span>
              </div>
            </div>
            :
            <img 
              src={`${config.app.imageServiceDomain}/${mainPictureFile.image_id}/w=200`} 
              alt="main preview of artwork" 
              className="add-artwork-media-form__main-picture-image"
            />
        }

        <div className="add-artwork-media-form__main-picture-details">
          <Text className="add-artowrk-media-form__main-picture-file-name dots-on-overflow" medium paragraph>
            {mainPictureFile.image_original_data.name}
          </Text>

          {(state.user_session.user_type === "admin" && mainPictureFile.image_id) && (
            <a href={`https://imagedelivery.net/hAeIC__6Aj746x0RFU1joA/${mainPictureFile.image_id}/gamma=0`} target="_blank" rel="noopener noreferrer">
                            Download image
            </a>
          )}
        </div>
      </div>

      <RemovePicturePopup 
        open={openDeleteConfirmation} 
        close={()=>setOpenDeleteConfirmation(false)}
        pictureData={mainPictureFile} 
        removePicture={()=>{
          setMainPictureFile(null); 
          setOpenDeleteConfirmation(false);
        }}
      />
    </>
  );
}
