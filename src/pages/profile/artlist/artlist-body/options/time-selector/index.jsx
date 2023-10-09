import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import Popup from '@/shared-components/popups/components/Popup';
import Utils from '@/utils';

import PersonalizedTime from './components/PersonalizedTime';
import TimeOption from './components/TimeOption';

import './index.css';

export default function TimeSelector({ open, close }) {
  const { artlistData } = useContext(ArtlistDataContext);
  const [formState, setFormState] = useState({
    time_quantity: "",
    time_unit: "seconds",
    time_selected: "Personalized"
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function updateFormState(quantity, unit, selected) {
    setFormState({
      time_quantity: quantity,
      time_unit: unit,
      time_selected: selected
    });

    setError(null);
  }

  function onPlayArtlist() {
    const parsedValue = Number(formState.time_quantity);

    if(!Number.isInteger(parsedValue) || (parsedValue < 3 && formState.time_unit === "seconds")) {
      setError({ element: "time_quantity", error_code: "INVALID_ARTLIST_PERSONALIZED_TIME" });
    } else {
      navigate("/artlist/play", {
        state: {
          slideDuration: Utils.getMSFromTimeUnit([formState.time_quantity, formState.time_unit]), 
          artlistArtworks: artlistData.artlist_artworks
        }
      });
    }
  }

  return (
    <>
      <Popup 
        open={open} 
        close={close} 
        className="time-selector-popup" 
        title={`Lapse between artworks`} 
        opacity
      >
        <TimeOption
          text="15 seconds"
          isSelected={formState.time_selected === "15 seconds"}
          selectOption={()=>updateFormState("15", "seconds", "15 seconds")}
        />

        <TimeOption
          text="1 minute"
          isSelected={formState.time_selected === "1 minute"}
          selectOption={()=>updateFormState("1", "minutes", "1 minute")}
        />

        <TimeOption
          text="5 minutes"
          isSelected={formState.time_selected === "5 minutes"}
          selectOption={()=>updateFormState("5", "minutes", "5 minutes")}
        />

        <TimeOption
          text="1 hour"
          isSelected={formState.time_selected === "1 hour"}
          selectOption={()=>updateFormState("1", "hours", "1 hour")}
        />

        <TimeOption
          text="Personalized"
          isSelected={formState.time_selected === "Personalized"}
          selectOption={()=>updateFormState("", "", "Personalized")}
        />

        <PersonalizedTime 
          formState={formState} 
          setFormState={setFormState}
          error={error}
        />

        <ContinueButton 
          className="time-selector__button mt-m" 
          onClick={onPlayArtlist}
          turnOff={
            !formState.time_quantity || 
                        !formState.time_unit
          }
        >
                    Play artlist
        </ContinueButton>
      </Popup>
    </>
  );
}
