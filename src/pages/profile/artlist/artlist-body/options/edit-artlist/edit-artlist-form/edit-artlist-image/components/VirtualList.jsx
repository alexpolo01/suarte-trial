import { useRef } from 'react';
import { AutoSizer,List } from 'react-virtualized';

import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';

import './styles/VirtualList.css';

export default function VirtualList({ formState, updateFormState }) {
  const listRef = useRef();

  return (
    <>
      <AutoSizer onResize={()=>listRef.current.recomputeRowHeights()}>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowCount={formState.artlist_artworks.length}
            overscanRowCount={5}
            ref={listRef}
            className="remove-scrollbar"
            rowHeight={({ index }) => {
              if(width <= 528) {
                return (150 / formState.artlist_artworks[index].artwork_media.artwork_main_picture.image_original_data.aspect_ratio) + 15;
              } else {
                return (180 / formState.artlist_artworks[index].artwork_media.artwork_main_picture.image_original_data.aspect_ratio) + 15;
              }
            }}
            rowRenderer={({ index, key, style }) => (
              <div key={key} style={style}>
                <ArtworkImage 
                  image={formState.artlist_artworks[index].artwork_media.artwork_main_picture.image_id} 
                  onClick={()=>updateFormState("artlist_image", formState.artlist_artworks[index].artwork_media.artwork_main_picture)} 
                  imageClassName={`edit-artlist__change-image-item ${formState.artlist_image.image_id === formState.artlist_artworks[index].artwork_media.artwork_main_picture.image_id ? " active" : ""}`} 
                  imageTemplateClassName="edit-artlist__change-image-item"
                  style={{ aspectRatio: formState.artlist_artworks[index].artwork_media.artwork_main_picture.image_original_data.aspect_ratio }}
                />
              </div>
            )}
          />
        )}
      </AutoSizer>
    </>
  );
}