import { closestCenter, DndContext, DragOverlay,MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement,restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

import RemovePicturePopup from '../../components/RemovePicturePopup';

import SortablePicture from './components/SortablePicture';

import './index.css';

export default function RenderSecondaryPictures({ pictures, setPictures, pictureIds, previewMode }) {
  const [pictureToDelete, setPictureToDelete] = useState(null);
  const [activePicture, setActivePicture] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 0 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  function handleDragStart(event) {
    const { active } = event;

    setActivePicture(pictures.find(picture => picture.image_id === active.id));
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if(active.id !== over.id) {
      setPictures(prevValue => {
        const oldIndex = pictureIds.indexOf(active.id);
        const newIndex = pictureIds.indexOf(over.id);

        return arrayMove(prevValue, oldIndex, newIndex);
      });
    }

    setActivePicture(null);
  }

  function handleSecondaryPictureDelete(secondaryPicture) {
    if(secondaryPicture.loading) { // If the image is still loading, we delete the image without popup
      deletePicture(secondaryPicture.image_id);
    } else {
      setPictureToDelete(secondaryPicture);
    }
  }

  function deletePicture(pictureId) {
    setPictures(prevValue => prevValue.filter(picture => picture.image_id !== pictureId));
  }

  return (
    <>
      <div className="add-artwork-media-form-secondary-pictures__sortable-pictures-container">
        <DndContext 
          sensors={sensors} 
          modifiers={[restrictToVerticalAxis, restrictToParentElement]} 
          collisionDetection={closestCenter} 
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={pictureIds} strategy={verticalListSortingStrategy}>
            {pictures.map(picture => (
              <SortablePicture 
                key={picture.image_id} 
                picture={picture} 
                deletePicture={handleSecondaryPictureDelete} 
                previewMode={previewMode}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {activePicture ? <SortablePicture picture={activePicture} isActive/> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <RemovePicturePopup 
        open={pictureToDelete !== null} 
        close={()=>setPictureToDelete(null)} 
        pictureData={pictureToDelete} 
        removePicture={()=>{
          deletePicture(pictureToDelete.image_id);
          setPictureToDelete(null);
        }}
      />
    </>
  );
}
