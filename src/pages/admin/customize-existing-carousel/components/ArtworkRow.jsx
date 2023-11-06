import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import config from "@/config";
import Text from "@/shared-components/text/components/Text";

import "./styles/ArtworkRow.css";

export default function ArtworkRow({
  artwork,
  onClickRemove,
  index,
  id,
  moveCard
}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'Card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if(!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'Card',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 1 : 1;
  const image = artwork.artwork_media.artwork_main_picture.image_id;

  drag(drop(ref));

  const onRemove = () => {
    const res = confirm('Are you sure to remove this artwork from the collection?');
    if(res)
      onClickRemove(artwork);
  };
  
  return (
    <div className="customize-existing-carousel__artwork-row" ref={ref} data-handler-id={handlerId} style={{ opacity }}>
      <div className="customize-existing-carousel__artwork-add" onClick={onRemove}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9.25" stroke="#FFBA00" strokeWidth="1.5"/>
          <path d="M6 10H14" stroke="#FFBA00" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <img
        src={`${config.app.imageServiceDomain}/${image}/w=200`}
        srcSet={
          `${config.app.imageServiceDomain}/${image}/w=200 200w,
                        ${config.app.imageServiceDomain}/${image}/w=400 400w,
                        ${config.app.imageServiceDomain}/${image}/w=600 600w,
                        ${config.app.imageServiceDomain}/${image}/w=800 800w,
                        ${config.app.imageServiceDomain}/${image}/w=1000 1000w,
                        ${config.app.imageServiceDomain}/${image}/w=1200 1200w,
                        ${config.app.imageServiceDomain}/${image}/w=1400 1400w,
                        ${config.app.imageServiceDomain}/${image}/w=1600 1600w,
                        ${config.app.imageServiceDomain}/${image}/w=1800 1800w,
                        ${config.app.imageServiceDomain}/${image}/w=2000 2000w,
                        ${config.app.imageServiceDomain}/${image}/w=2200 2200w`
        }
        alt="artwork main preview"
        className="customize-existing-carousel__artwork-img"
      />
      <div className="customize-existing-carousel__artwork-text">
        <Text small paragraph>{artwork.artwork_about.artwork_title}</Text>
        <Text small paragraph>by {artwork.artwork_about.artwork_gallery_artist.artist_name}</Text>
      </div>
      <div className="customize-existing-carousel__artwork-move">
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L12.2347 1" stroke="#9B9DAF" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M1 6L12.2347 6" stroke="#9B9DAF" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M1 11L12.2347 11" stroke="#9B9DAF" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}