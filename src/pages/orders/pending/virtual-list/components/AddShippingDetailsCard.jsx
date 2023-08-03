import { useState } from 'react';

import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import OrderCard from '@/shared-components/cards/components/OrderCard';
import TimeLeft from '@/shared-components/common/components/TimeLeft';
import AddShippingAddress from '@/shared-components/forms/components/AddShippingAddress';
import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';

import './styles/AddShippingDetailsCard.css';

export default function AddShippingDetailsCard({ orderData, onAddShippingDetails }) {
  const [openCollectorShipping, setOpenCollectorShipping] = useState(false);
  const [formState, setFormState] = useState({
    tracking_number: "",
    shipping_courier_company: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  async function submitShippingDetails(e) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const { response, data } = await GalleryService.submitShippingDetails(orderData.order_number, formState);
        
    if(response.ok) {
      setFormLoading(false);
      onAddShippingDetails(orderData._id);
    } else if(response.status === 400) {
      setFormLoading(false);
      setFormError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  function getTimeLeft() {
    const initialTimestamp = new Date(orderData.createdAt).getTime();
    const offset = (7 * 24 * 60 * 60 * 1000);

    return new Date(initialTimestamp + offset).getTime();
  }

  return (
    <>
      <OrderCard orderData={orderData} navigateToView>
        <span className="add-shipping-details-card__button element-non-selectable mt-s" onClick={()=>setOpenCollectorShipping(true)}>
                    View collector's shipping information

          <ForwardArrowIcon className="add-shipping-details-card__button-enter"/>
        </span>

        <form onSubmit={submitShippingDetails} className="add-shipping-details-card__form">
          <div className="add-shipping-details-card__tracking">
            <PublicFormInput 
              value={formState.tracking_number} 
              onChange={e=>setFormState({ ...formState, tracking_number: e.target.value })} 
              readOnly={formLoading} 
              error={formError} 
              placeholder="Tracking number" 
              element="tracking_number" 
            />

            <TimeLeft endsIn={getTimeLeft()}>
              {({ timeLeft })=>(
                <span className="add-shipping-details-card__time-left mt-m">
                  {timeLeft.days} d{" "}
                  {timeLeft.hours} h{" "}
                  {timeLeft.minutes} m
                </span>
              )}
            </TimeLeft>
          </div>

          <div className="add-shipping-details-card__submit-section">
            <PublicFormInput 
              value={formState.shipping_courier_company} 
              onChange={e=>setFormState({ ...formState, shipping_courier_company: e.target.value })} 
              readOnly={formLoading} 
              error={formError} 
              placeholder="Shipping courier company" 
              element="shipping_courier_company" 
            />

            <ContinueButton 
              className="add-shipping-details-card__submit-button mt-m" 
              turnOff={!formState.tracking_number || !formState.shipping_courier_company}
              loading={formLoading}
            >
                            Submit
            </ContinueButton>
          </div>
        </form>
      </OrderCard>

      <AddShippingAddress
        open={openCollectorShipping}
        close={()=>setOpenCollectorShipping(false)}
        addressData={orderData.order_shipping_address}
        previewMode
      />
    </>
  );
}
