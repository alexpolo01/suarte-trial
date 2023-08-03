import useStateHandler from '@/hooks/useStateHandler';

import './styles/VariableContent.css';

export default function VariableContent({ fetchData }) {
  const { state } = useStateHandler();

  return (
    <>
      {
        fetchData.order_status === "pending" ?
          fetchData.order_limited_edition_data ?
            <p className="order-variable-content__text mt-m">
                            Congratulations on your new order! Suarte will provide the shipping details 
                            for your Limited Edition in the coming days.
            </p>
            : state.user_session._id === fetchData.order_seller._id ?
              <p className="order-variable-content__text mt-m">
                            Congratulations on your new order! Please note that you have 7 days to 
                            provide the shipping details; otherwise, the order will be canceled.
              </p>
              :
              <p className="order-variable-content__text mt-m">
                            Congratulations on your new order! Please note that the gallery has 7 days to 
                            provide the shipping details; otherwise, the order will be canceled.
              </p>
          : fetchData.order_status === "sent" ?
            <>
              <div className="order-variable-content__shipping-details">
                <p className="order-variable-content__gray-text mt-s">
                                Tracking number:
                </p>

                <p className="order-variable-content__big-text" style={{ marginBottom: "10px" }}>
                  {fetchData.order_tracking.tracking_number}
                </p>

                <p className="order-variable-content__gray-text mt-s">
                                Courier company:
                </p>

                <p className="order-variable-content__big-text">
                  {fetchData.order_tracking.shipping_courier_company}
                </p>
              </div>

              <p className="order-variable-content__gray-text mt-s">
                            Introduce the tacking number in the courier company's website.
              </p>
            </>
            :
            <></>
      }
    </>
  );
}
