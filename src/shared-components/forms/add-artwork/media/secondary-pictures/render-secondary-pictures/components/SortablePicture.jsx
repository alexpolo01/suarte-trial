import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CircularProgress } from '@mui/material';

import config from '@/config';
import useStateHandler from '@/hooks/useStateHandler';
import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import HandleDragListIcon from '@/shared-components/icons/components/forms/HandleDragListIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/SortablePicture.css';

export default function SortablePicture({ picture, deletePicture, previewMode, isActive }) {
  const { state } = useStateHandler();
  const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useSortable({ id: picture.image_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if(previewMode) {
    return (
      <div className="add-artwork-media-form__secondary-pictures-picture element-non-selectable">
        <img 
          src={`${config.app.imageServiceDomain}/${picture.image_id}/w=200`} 
          alt="secondary preview of artwork" 
          className="add-artwork-media-form__secondary-pictures-picture-image"
        />

        <div className="add-artwork-media-form__secondary-pictures-picture-details">
          <Text className="add-artwork-media-form__secondary-pictures-picture-name dots-on-overflow" medium paragraph>
            {picture.image_original_data.name}
          </Text>

          {(state.user_session.user_type === "admin" && picture.image_id) && (
            <a href={`https://imagedelivery.net/hAeIC__6Aj746x0RFU1joA/${picture.image_id}/gamma=0`} target="_blank" rel="noopener noreferrer">
                            Download image
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className={`add-artwork-media-form__secondary-pictures-picture element-non-selectable ${isDragging ? "preview" : ""} ${isActive ? "active" : ""}`} 
        style={style} 
        ref={setNodeRef} 
        {...attributes} 
        {...listeners}
      >
        <RemoveButton className="add-artwork-media-form__secondary-pictures-delete-picture" onClick={()=>deletePicture(picture)}/>

        {
          picture.loading ? 
            <div className="add-artwork-media-form__secondary-pictures-picture-loading-container">
              <div className="add-artwork-secondary-pictures__progress-container">
                <CircularProgress
                  className="add-artwork-secondary-pictures__progress-spinner"
                  variant="determinate"
                  value={picture.progress}
                />

                <span className="add-artwork-secondary-pictures__progress-value">
                  {picture.progress}%
                </span>
              </div>
            </div>
            :
            <img 
              src={`${config.app.imageServiceDomain}/${picture.image_id}/w=200`} 
              alt="secondary preview of artwork" 
              className="add-artwork-media-form__secondary-pictures-picture-image"
            />
        }

        <div className="add-artwork-media-form__secondary-pictures-picture-details">
          <Text className="add-artwork-media-form__secondary-pictures-picture-name dots-on-overflow" medium paragraph>
            {picture.image_original_data.name}
          </Text>
        </div>

        <HandleDragListIcon className="add-artwork-media-form__secondary-pictures-picture-handle-drag-icon"/>
      </div>
    </>
  );
}
