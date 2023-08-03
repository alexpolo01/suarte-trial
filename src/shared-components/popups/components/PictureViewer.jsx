import { FaMinus, FaPlus, FaRedo } from 'react-icons/fa';
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";

import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import XIcon from '@/shared-components/icons/components/public/XIcon';

import GenericPopup from './GenericPopup';

import './styles/PictureViewer.css';

function ViewerControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <>
      <div className="picture-viewer__controls">
        <FaMinus className="picture-viewer__control" onClick={()=>zoomOut()}/>
        <FaPlus className="picture-viewer__control" onClick={()=>zoomIn()}/>
        <FaRedo className="picture-viewer__control" onClick={()=>resetTransform()}/>
      </div>
    </>
  );
}

export default function PictureViewer({ picture, close }) {
  return (
    <>
      <GenericPopup 
        open={picture !== null} 
        className="picture-viewer__container" 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
      >
        <XIcon className="picture-viewer__close-button" onClick={close}/>
        <TransformWrapper centerOnInit={true} maxScale={5}>
          <TransformComponent>
            <ArtworkImage 
              image={picture} 
              imageClassName="picture-viewer__picture" 
              imageTemplateClassName="picture-viewer__picture"
            />
          </TransformComponent>
          <ViewerControls/>
        </TransformWrapper>
      </GenericPopup>
    </>
  );
}
