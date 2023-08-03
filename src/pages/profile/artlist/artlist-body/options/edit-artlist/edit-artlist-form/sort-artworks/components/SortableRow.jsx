import { useSortable } from '@dnd-kit/sortable';

import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import HandleDragListIcon from '@/shared-components/icons/components/forms/HandleDragListIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/SortableRow.css';

export default function SortableRow({ style, item, isActive, deleteArtwork }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id: item._id });

  const itemStyle = {
    ...style,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={itemStyle} 
      className="element-non-selectable" 
      {...attributes} 
      {...listeners}
    >
      <div className={`sort-artlist-artworks__artwork ${isActive ? "drag-overlay" : ""}`}>
        <RemoveButton className="sort-artlist-artworks__delete-artwork-button" onClick={deleteArtwork}/>

        <ArtworkImage 
          image={item.artwork_media.artwork_main_picture.image_id} 
          imageClassName="sort-artlist-artworks__artwork-image" 
          imageTemplateClassName="sort-artlist-artworks__artwork-image"
        />

        <div className="sort-artlist-artworks__artwork-info">
          <Text className="sort-artlist-artworks__artwork-title" paragraph medium>
            {item.artwork_about.artwork_title}
          </Text>

          <Text className="sort-artlist-artworks__artwork-artist" paragraph extraSmall>
                        by{" "}
                            
            {
              item.artwork_about.artwork_artist ?
                item.artwork_about.artwork_artist.user_name
                :
                item.artwork_about.artwork_gallery_artist.artist_name
            }
          </Text>
        </div>

        <HandleDragListIcon className="sort-artlist-artworks__artwork-drag-handle"/>
      </div>
    </div>
  );
}
