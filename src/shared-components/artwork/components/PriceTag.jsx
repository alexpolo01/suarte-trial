import { useMemo } from 'react';

import PriceTagHead from '@/shared-components/icons/components/artwork/PriceTagHead';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/PriceTag.css';

/**
 * For styling the tag: you should only give height to the taghead and everythin will grow accordingly. You can do it using the className prop (it's assigned to the tag head element)
 */
export default function PriceTag({ currency, price, className="" }) {
  const priceTagText = useMemo(()=>Utils.getArtworkPrice(price, currency), [price, currency]);

  return (
    <>
      <div className="price-tag__container">
        <PriceTagHead className={`price-tag__tag-head ${className}`}/>

        <div className="price-tag__price">
          <Text small>
            {priceTagText}
          </Text>
        </div>                
      </div>
    </>
  );
}
