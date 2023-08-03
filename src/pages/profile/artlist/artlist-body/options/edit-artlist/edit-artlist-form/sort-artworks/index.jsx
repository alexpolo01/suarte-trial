import { closestCenter, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement,restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { AutoSizer,List } from 'react-virtualized';

import SortableRow from './components/SortableRow';

import './index.css';

export default function SortArtworks({ formState, updateFormState }) {
  const [activeArtworkId, setActiveArtworkId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 0 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  function handleSortEnd(sortedArtworks) {
    updateFormState("artlist_artworks", sortedArtworks);
  }
  
  function deleteArtwork(artworkToDelete) {
    const newArtlistArtworks = formState.artlist_artworks.filter(artwork=>artwork._id !== artworkToDelete._id);

    updateFormState("artlist_artworks", newArtlistArtworks);

    if(newArtlistArtworks.length === 0) {
      updateFormState("artlist_image", null);
    } else if(formState.artlist_image.image_id === artworkToDelete.artwork_media.artwork_main_picture.image_id) {
      updateFormState("artlist_image", newArtlistArtworks[0].artwork_media.artwork_main_picture);
    }
  }

  function handleDragStart(event) {
    const { active } = event;
    setActiveArtworkId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    setActiveArtworkId(null);

    if (active?.id !== over?.id) {
      const oldIndex = formState.artlist_artworks.findIndex(artwork => artwork._id === active.id);
      const newIndex = formState.artlist_artworks.findIndex(artwork => artwork._id === over.id);

      handleSortEnd(arrayMove(formState.artlist_artworks, oldIndex, newIndex));
    }
  }

  return (
    <>
      <div className="sort-artlist-artworks__container remove-scrollbar">
        <DndContext 
          sensors={sensors} 
          modifiers={[restrictToVerticalAxis, restrictToParentElement]} 
          collisionDetection={closestCenter} 
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={formState.artlist_artworks.map(artwork => artwork._id)} strategy={verticalListSortingStrategy}>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  className="remove-scrollbar"
                  overscanRowCount={3}
                  rowCount={formState.artlist_artworks.length}
                  rowHeight={76}
                  rowRenderer={({ key, index, style }) => (
                    <SortableRow 
                      key={key} 
                      style={style} 
                      item={formState.artlist_artworks[index]} 
                      deleteArtwork={()=>deleteArtwork(formState.artlist_artworks[index])}
                    />
                  )}
                />
              )}
            </AutoSizer>
          </SortableContext>

          <DragOverlay>
            {
              activeArtworkId ? 
                <SortableRow item={formState.artlist_artworks.find(artwork=>artwork._id === activeArtworkId)} isActive/> 
                :
                null
            }
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
