import './styles/ShippingCard.css';

export default function ShippingCard({ data, isSelected, selectShipping, setAddressToEdit }) {
  return (
    <>
      <div className="purchase-shipping-card__container element-non-selectable">
        <div className={`purchase-shipping-card__selector ${isSelected ? "active" : ""}`} onClick={selectShipping}/>

        <div className="purchase-shipping-card__info">
          <span className="purchase-shipping-card__big-text mt-m">
            {data.address_name} {data.address_surname}
          </span>

          <span className="purchase-shipping-card__text mt-s">
            {data.address_street}
          </span>

          <span className="purchase-shipping-card__text mt-s">
            {data.address_city}{", "}
            {data.address_region}{", "}
            {data.address_country}{", "}
            {data.address_zip_code}
          </span>

          <span className="purchase-shipping-card__text mt-s">
            {data.address_phone.address_phone_prefix} {data.address_phone.address_phone_number}
          </span>
        </div>

        <span className="purchase-shipping-card__edit-button mt-s" onClick={()=>setAddressToEdit(data)}>
                    Edit
        </span>
      </div>
    </>
  );
}
