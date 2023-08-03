import ContinueButton from '@/shared-components/buttons/components/ContinueButton';

import LimitedEditionsInfo from './components/LimitedEditionsInfo';
import SizeOption from './components/SizeOption';

import './index.css';

export default function SelectSize({ artworkData, formState, setFormState, continueToShipping }) {
  function selectLimitedEditionSize(key, value) {
    setFormState({
      ...formState,
      limited_edition_size: {
        size: key,
        size_data: value
      }
    });
  }

  return (
    <>
      <div className="purchase-select-size__container">
        <span className="purchase-select-size__heading mt-l">
                    Select size
        </span>

        {Object.keys(artworkData.artwork_limited_editions).map(size => (
          (Boolean(artworkData.artwork_limited_editions[size]) && artworkData.artwork_limited_editions[size].sold < artworkData.artwork_limited_editions[size].quantity) && (
            <SizeOption
              key={size}
              data={artworkData.artwork_limited_editions[size]}
              isSelected={formState.limited_edition_size?.size === size}
              selectOption={()=>selectLimitedEditionSize(size, artworkData.artwork_limited_editions[size])}
            />
          )
        ))}

        <p className="purchase-select-size__small-text st-l">
                    Listed dimensions exclude the 4.5 cm border included for framing
        </p>

        <LimitedEditionsInfo/>

        <ContinueButton 
          className="purchase-select-size__button mt-m" 
          turnOff={!formState.limited_edition_size}
          onClick={continueToShipping}
        >
                    Continue
        </ContinueButton>
      </div>
    </>
  );
}
