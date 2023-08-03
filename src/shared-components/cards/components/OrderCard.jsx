import { useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import GalleryCoolerIcon from '@/shared-components/icons/components/new-icons/GalleryCoolerIcon';
import Utils from '@/utils';

import ArtworkImage from './ArtworkImage';

import './styles/OrderCard.css';

export default function OrderCard({ orderData, children, navigateToView=false }) {
  const { state } = useStateHandler();
  const navigate = useNavigate();

  return (
    <>
      <div className="order-card__container">
        <div 
          className={`order-card__clickable ${(Boolean(navigateToView) && orderData.order_status !== "payment_pending") ? "pointer" : ""}`} 
          onClick={
            (Boolean(navigateToView) && orderData.order_status !== "payment_pending") ? 
              ()=>navigate(`/order/${orderData.order_number}`, {
                state: { from: true }
              }) 
              : 
              null
          }
        >
          <div className="order-card__header">
            {
              orderData.order_status === "cancelled" ?
                <span className="order-card__header-text canceled dots-on-overflow mt-m">
                                    Order canceled
                </span>
                : orderData.order_status === "payment_pending" ?
                  <span className="order-card__header-text dots-on-overflow mt-m">
                                    Payment in progress
                  </span>
                  : state.user_session._id === orderData.order_buyer._id ?
                    orderData.order_limited_edition_data ?
                      <>
                        <LimitedEditionIcon className="order-card__icon"/>

                        <span className="order-card__header-text dots-on-overflow mt-m">
                                            Suarte
                        </span>
                      </>
                      : 
                      <>
                        <GalleryCoolerIcon className="order-card__icon"/>

                        <span className="order-card__header-text dots-on-overflow mt-m">
                          {orderData.order_seller.user_name}
                        </span>
                      </>
                    : orderData.order_issue ?
                      <span className="order-card__header-text theme dots-on-overflow mt-m">
                                    An issue has been reported
                      </span>
                      :   
                      <span className="order-card__header-text dots-on-overflow mt-m">
                        {
                          orderData.order_status === "pending" ?
                            "Pending shipment"
                            : orderData.order_status === "sent" ?
                              "On its way"
                              :
                              "Completed"
                        }
                      </span>
            }

            <span className="order-card__date mt-s">
              {Utils.getDateInStringFromTimestamp(new Date(orderData.createdAt).getTime())}
            </span>
          </div>

          <div className="order-card__content">
            <ArtworkImage
              image={orderData.order_artwork.artwork_media.artwork_main_picture.image_id}
              imageClassName="order-card__image"
              imageTemplateClassName="order-card__image"
              forceSmaller={300}
            />

            <div className="order-card__info">
              <div className="order-card__title-section">
                <span className="order-card__big-text dots-on-overflow --title mt-m">
                  {orderData.order_artwork.artwork_about.artwork_title}

                  <span>
                    {
                      orderData.order_limited_edition_data ? 
                        " - Limited Edition" 
                        : 
                        " - Original"
                    }
                  </span>
                </span>

                <span className="order-card__date mt-s hidden">
                  {Utils.getDateInStringFromTimestamp(new Date(orderData.createdAt).getTime())}
                </span>
              </div>

              <div>
                <span className="order-card__small-text dots-on-overflow mt-s">
                                    by{" "}

                  {
                    orderData.order_artwork.artwork_about.artwork_artist ?
                      orderData.order_artwork.artwork_about.artwork_artist.user_name
                      :
                      orderData.order_artwork.artwork_about.artwork_gallery_artist.artist_name
                  }
                </span>

                <span className="order-card__small-text dots-on-overflow mt-s">
                  {orderData.order_artwork.artwork_about.artwork_medium}
                </span>

                <span className="order-card__small-text dots-on-overflow mt-s">
                  {orderData.order_artwork.artwork_about.artwork_size.length}{" "}
                  {orderData.order_artwork.artwork_about.artwork_size.unit}{" x "}
                  {orderData.order_artwork.artwork_about.artwork_size.height}{" "}
                  {orderData.order_artwork.artwork_about.artwork_size.unit}
                </span>
              </div>

              <span className="order-card__big-text dots-on-overflow mt-m">
                                Total:{" "}

                {Utils.getArtworkPrice(orderData.order_payment.total, orderData.order_payment.currency)}
              </span>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
}
