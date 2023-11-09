import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function Carousel({
  data,
  index,
  id,
  moveItem,
  onClick
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
      moveItem(dragIndex, hoverIndex);
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

  drag(drop(ref));
  
  return (
    <a 
      key={data.collection_id} 
      ref={ref} 
      data-handler-id={handlerId} 
      style={{ opacity }} 
      onClick={onClick} 
      className="home-customization__link"
    >
      {data.banner && "Banner - "}{data.collection_name}
    </a> 
  );
}