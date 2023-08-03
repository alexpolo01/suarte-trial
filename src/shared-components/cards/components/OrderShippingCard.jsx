import AddressIcon from '@/shared-components/icons/components/new-icons/AddressIcon';

import './styles/OrderShippingCard.css';

export default function OrderShippingCard({ shippingData }) {
  return (
    <>
      <div className="order-shipping-card__container">
        <AddressIcon className="order-shipping-card__icon"/>

        <div className="order-shipping-card__info">
          <span className="order-shipping-card__main-text mt-m" style={{ fontWeight: "600" }}>
            {shippingData.address_name} {shippingData.address_surname}
          </span>

          <span className="order-shipping-card__main-text mt-m">
            {shippingData.address_phone.address_phone_prefix} {shippingData.address_phone.address_phone_number}
          </span>

          <span className="order-shipping-card__text mt-m">
            {shippingData.address_street}
          </span>

          <span className="order-shipping-card__text mt-m">
            {shippingData.address_city}{", "}
            {shippingData.address_region}{", "}
            {shippingData.address_country}{", "}
            {shippingData.address_zip_code}
          </span>
        </div>
      </div>
    </>
  );
}
