import './styles/SizeOption.css';

export default function SizeOption({ data, isSelected, selectOption }) {
  return (
    <>
      {Boolean(data) && (
        <div className={`purchase-size-option__container element-non-selectable ${isSelected ? "selected" : ""}`} onClick={selectOption}>
          <div className="purchase-size-option__size">
            <div className="purchase-size-option__displayer"/>

            <span className="purchase-size-option__size-text mt-m">
              {data.width} cm x {data.height} cm
            </span>
          </div>

          <span className="purchase-size-option__size-edition-text st-l">
                        Edition of {data.quantity}
          </span>

          <span className="purchase-size-option__size-text mt-m">
                        €{data.price}
          </span>
        </div>
      )}
    </>
  );
}
