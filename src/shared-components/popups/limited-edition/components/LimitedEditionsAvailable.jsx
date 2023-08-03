import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import LimitedEditionForm from './LimitedEditionForm';

import './styles/LimitedEditionsAvailable.css';

export default function LimitedEditionsAvailable({ limitedEditions, close, onRequest, loading, requested }) {
  return (
    <>
      <div className="limited-edition-popup-content__container remove-scrollbar">
        <div className="limited-edition-popup-content__header">
          <Text className="limited-edition-popup-content__header-text" medium>
                        Limited edition options
          </Text>

          <XIcon className="limited-edition-popup-content__close" onClick={close}/>
        </div>

        <div className="limited-edition-popup-content__summary">
          {limitedEditions.editions.map((item, index) => (
            <Text key={index} className="limited-edition-popup-content__limited-option" medium paragraph justify>
              <span className="hightlight">{item.unidades}</span> pieces of <span className="hightlight">{item.width} cm</span> x <span className="hightlight">{item.height} cm</span>
            </Text>
          ))}

          <div className="limited-edition-popup-content__summary-separator"/>

          <Text className="limited-edition-popup-content__limited-option end" medium paragraph>
                        max. benefit: <span className="hightlight">€{Utils.numberWithCommas(limitedEditions.maxBenefit)}</span><span className="special-char">*</span> 
          </Text>
        </div>

        <Text className="limited-edition-popup-content__limited-option" medium paragraph justify>
          <span className="special-char">* </span>Galleries must reach an agreement with the artist on how to distribute these proceeds.
        </Text>

        <LimitedEditionForm 
          onRequest={onRequest} 
          loading={loading} 
          requested={requested}
        />
      </div>
    </>
  );
}
