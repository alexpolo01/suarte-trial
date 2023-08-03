import { useEffect,useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import useStateHandler from '@/hooks/useStateHandler';
import Text from '@/shared-components/text/components/Text';

import './styles/TemporalPopup.css';

export default function TemporalPopup() {
  const { state } = useStateHandler();
  const [temporalPopupStatus, setTemporalPopupStatus] = useState(null);
  const [active, setActive] = useState(false);
  const currentTimeout = useRef(null);

  useEffect(()=>{
    if(state.temporalPopup) {
      setTemporalPopupStatus(state.temporalPopup);
      setActive(true);

      if(currentTimeout.current) {
        clearTimeout(currentTimeout.current);
      }

      currentTimeout.current = setTimeout(()=>setActive(false), 2000);
    }
  }, [state.temporalPopup]);

  return createPortal(
    <div className={`temporal-popup__container${active ? " active" : ""}${temporalPopupStatus?.type === "no-navigation" ? "" : " app-navigation"}`}>
      <Text className="temporal-popup__text" small paragraph>
        {temporalPopupStatus?.text}
      </Text>
    </div>, document.getElementById("portal-temporal-popup")
  );
}
