import useStateHandler from '@/hooks/useStateHandler';
import OrderCard from '@/shared-components/cards/components/OrderCard';
import OrderShippingCard from '@/shared-components/cards/components/OrderShippingCard';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import GalleryCoolerIcon from '@/shared-components/icons/components/new-icons/GalleryCoolerIcon';

import './styles/OrderInfo.css';

export default function OrderInfo({ fetchData, setOpenIssueDetails }) {
  const { state } = useStateHandler();

  return (
    <>
      <div className="order-info__header">
        {
          fetchData.order_status === "cancelled" ?
            <span className="order-info__text canceled dots-on-overflow mt-l">
                            Order canceled
            </span>
            : fetchData.order_issue ?
              <span className="order-info__text theme dots-on-overflow element-non-selectable mt-l" onClick={()=>setOpenIssueDetails(true)}>
                            An issue has been reported
              </span>
              : state.user_session._id === fetchData.order_buyer._id ?
                fetchData.order_limited_edition_data ?
                  <>
                    <LimitedEditionIcon className="order-info__icon"/>

                    <span className="order-info__text dots-on-overflow mt-l">
                                    Suarte
                    </span>
                  </>
                  : 
                  <>
                    <GalleryCoolerIcon className="order-info__icon"/>

                    <span className="order-info__text dots-on-overflow mt-l">
                      {fetchData.order_seller.user_name}
                    </span>
                  </>
                :   
                <span className="order-info__text dots-on-overflow mt-l">
                  {
                    fetchData.order_status === "pending" ?
                      "Pending shipment"
                      : fetchData.order_status === "sent" ?
                        "On its way"
                        :
                        "Completed"
                  }
                </span>
        }
      </div>

      <div className="order-info__order-card">
        <OrderCard orderData={fetchData}/>
      </div>

      <OrderShippingCard shippingData={fetchData.order_shipping_address}/>
    </>
  );
}
