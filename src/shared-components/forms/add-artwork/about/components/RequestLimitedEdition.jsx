import { useEffect,useState } from 'react';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import LimitedEditionPopup from '@/shared-components/popups/limited-edition';
import Text from '@/shared-components/text/components/Text';

import './styles/RequestLimitedEdition.css';

export default function RequestLimitedEdition({ value, previewMode, unit, height, length, price, typeOfArtwork, onChange }) {
  const [open, setOpen] = useState(false);
  const isFirstRender = useIsFirstRender();

  useEffect(()=>{
    if(!isFirstRender && value) onChange(false);
  }, [unit, height, length, price, typeOfArtwork]);

  if(previewMode) {
    return (
      <>
        <div className="request-limited-edition__container">
          <LimitedEditionIcon className="request-limited-edition__limited-edition-icon"/>

          <Text className="request-limited-edition__text" medium>
            {
              value ? 
                "You have requested Limited Editions for this artwork." 
                : 
                "You have not requested Limited Editions for this artwork."
            }
          </Text>
        </div>
      </>
    );
  } else if(typeOfArtwork === "Gallery owned") {
    return (
      <>
        <div className="request-limited-edition__container">
          <LimitedEditionIcon className="request-limited-edition__limited-edition-icon"/>

          <Text className="request-limited-edition__text" medium>
                        Gallery owned artworks can't request Suarte's Limited Editions.
          </Text>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`request-limited-edition__container element-non-selectable ${(!height || !length || !price) ? "disabled" : ""}`}>
          <LimitedEditionIcon className="request-limited-edition__limited-edition-icon"/>
    
          {
            value ?
              <>
                <Text className="request-limited-edition__text" medium>
                                    Requested
                </Text> 
    
                <XIcon className="request-limited-edition__cancel-request-icon" onClick={()=>onChange(false)}/>
              </> 
              : 
              <Text className="request-limited-edition__clickable-text" onClick={()=>setOpen(true)} medium>
                                Request Limited Editions
              </Text>
          }
        </div>
    
        <LimitedEditionPopup 
          open={open} 
          close={()=>setOpen(false)} 
          onRequest={()=>{onChange(true); setOpen(false);}} 
          dataNeeded={{ unit, height, length, price, typeOfArtwork }}
        />
      </>
    );
  }
}
