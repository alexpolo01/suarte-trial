import { useState } from 'react';

import useScreenSize from '@/hooks/useScreenSize';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericBottomSheet from '@/shared-components/popups/components/GenericBottomSheet';
import Text from '@/shared-components/text/components/Text';
import TextHandler from '@/shared-components/text/components/TextHandler';

import './styles/Description.css';

export default function Description({ artworkData }) {
  const [showText, setShowText] = useState(false);
  const screenSize = useScreenSize();
  const threshold = calculateThreshold();

  function calculateThreshold() {
    if(screenSize.width <= 370) return 90;
    if(screenSize.width <= 400) return 100;
    if(screenSize.width <= 450) return 115;
    if(screenSize.width <= 485) return 130;
    if(screenSize.width <= 520) return 140;
    if(screenSize.width <= 610) return 153;
    if(screenSize.width <= 680) return 170;
    if(screenSize.width <= 730) return 182;
    if(screenSize.width <= 815) return 205;
    if(screenSize.width <= 900) return 225;
    else return 200;
  }

  return (
    <>
      <TextHandler 
        className="artwork-view-artwork-description__text" 
        controlsClassName="artwork-view-artwork-description__more-button" 
        text={artworkData.artwork_about.artwork_description} 
        maxCharactersWhenCollapsed={threshold} 
        moreControlClick={()=>setShowText(true)} 
        small
      />
            
      <GenericBottomSheet 
        open={showText} 
        close={() => setShowText(false)} 
        className="artwork-view-artwork-description-bottom-sheet" 
        onTouchStart={e => e.stopPropagation()} 
        onTouchEnd={e => e.stopPropagation()} 
        onWheel={e => e.stopPropagation()}
      >
        <div className="artwork-view-artwork-description-bottom-sheet__content remove-scrollbar">
          <div className="artwork-view-artwork-description-bottom-sheet__content-header">
            <Text className="artwork-view-artwork-description-bottom-sheet__content-header-text dots-on-overflow" small paragraph>
              {artworkData.artwork_about.artwork_title}
            </Text>
            <XIcon className="artwork-view-artwork-description-bottom-sheet__close" onClick={() => setShowText(false)}/>
          </div>

          <Text className="artwork-view-artwork-description-bottom-sheet__text" medium paragraph justify>
            {artworkData.artwork_about.artwork_description}
          </Text>
        </div>
      </GenericBottomSheet>
    </>
  );
}
