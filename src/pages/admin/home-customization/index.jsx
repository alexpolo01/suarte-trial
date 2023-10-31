// eslint-disable-next-line simple-import-sort/imports
import { useNavigate } from 'react-router-dom';
import './index.css';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import { useEffect, useState } from 'react';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import AddArtworksPopup from '../add-artworks-popup';

export default function HomeCustomization() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    setError(null); 
  }, []);

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="home-customization__container">
      <div className="home-customization__header">
        <div className="home-customization__header-back">
          <BackArrowIcon onClick={onClickBack}/>
        </div>
        <h4 className="home-customization__header-text">Home</h4>
        <div className="home-customization__header-logout">
          <ContinueButton>
            Log out
          </ContinueButton>
        </div>
      </div>
      { step === 0 && 
        <div className="home-customization__box">
          <a className="home-customization__link">Fresh Picks</a>
          <a className="home-customization__link">Human Expression</a>
          <a className="home-customization__link">Harmony</a>
          <a className="home-customization__link">Color expression</a>
          <a className="home-customization__link" onClick={() => setStep(1)}>ADD CAROUSEL</a>
        </div>
      }
      { step === 1 && 
        <div>
          <PublicFormInput className="home-customization__title-input" error={error} placeholder="Title" element="title" margin />
          <ContinueButton onClick={() => setPopupOpen(true)}>
            ADD ARTWORKS
          </ContinueButton>
        </div>
      }
      <AddArtworksPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
