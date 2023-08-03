import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

import ShippingItem from './ShippingItem';

import './styles/ShippingDataContent.css';

export default function ShippingDataContent({ shippingData, onSelectShippingData, onUpdateShippingData, onRemoveShippingData, close }) {
  return (
    <>
      <div className="shipping-data-content__container remove-scrollbar">
        <div className="shipping-data-content__header">
          <Text className="shipping-data-content__header-text" medium>
                        Saved shipping info
          </Text>

          <XIcon className="shipping-data-content__close" onClick={close}/>
        </div>

        <Text className="shipping-data-content__text" paragraph small>
                    Select a saved shipping info from below. 
                    You will be able to make some changes when selecting it.
        </Text>

        {shippingData.map(item => (
          <ShippingItem 
            key={item._id} 
            data={item}
            onSelectShippingData={onSelectShippingData}
            onUpdateShippingData={onUpdateShippingData}
            onRemoveShippingData={onRemoveShippingData}
          />
        ))}
      </div>
    </>
  );
}
