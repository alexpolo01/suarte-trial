import { useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import config from '@/config';
import useCache from '@/hooks/useCache';
import useGoBack from '@/hooks/useGoBack';
import useStateHandler from '@/hooks/useStateHandler';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import OrderInfo from './components/OrderInfo';
import OrderSkeleton from './components/OrderSkeleton';
import VariableContent from './components/VariableContent';
import Conversation from './conversation';
import IssueDetails from './issue-details';

import './index.css';

export default function OrderDetails() {
  const { orderNumber } = useParams();
  const { loading, fetchData, setFetchData } = useCache(`order_details_of_${orderNumber}`, `${config.apis.api.url}/order/${orderNumber}`, {
    injectToken: true,
    expiresIn: ["0", "seconds"]
  });
  const { state } = useStateHandler();
  const [openIssueDetails, setOpenIssueDetails] = useState(false);
  const [openConversation, setOpenConversation] = useState(false);
  const goBackHandler = useGoBack("/profile");

  return (
    <>
      <div className={`order-details__page ${(openIssueDetails || openConversation) ? "remove-header" : ""}`}>
        <header className="order-details__header">
          <span className="order-details__header-text lt-s">
                        Order #{orderNumber}
          </span>

          <BackArrowIcon className="order-details__back-button" onClick={goBackHandler}/>
        </header>

        {
          loading ?
            <OrderSkeleton/>
            : fetchData.error_type === "NOT_FOUND" ?
              <div className="order-details__not-found-page">
                <span className="order-details__not-found-oops">
                                Oops!
                </span>

                <span className="order-details__empty-text mt-m">
                                We couldn't find an order for the order number you entered. 
                                If you believe this is a mistake, please contact our support team for assistance.
                </span>
              </div> 
              :
              <main className="order-details__main">
                <ArtworkImage 
                  image={fetchData.order_artwork.artwork_media.artwork_main_picture.image_id}
                  imageClassName="order-details__image"
                  imageTemplateClassName="order-details__image"
                />

                <div className="order-details__section">
                  {
                    openConversation ?
                      <Conversation close={()=>setOpenConversation(false)} orderData={fetchData}/>
                      : openIssueDetails ?
                        <IssueDetails close={()=>setOpenIssueDetails(false)} orderData={fetchData} setOrderData={setFetchData}/>
                        :
                        <>
                          <OrderInfo fetchData={fetchData} setOpenIssueDetails={setOpenIssueDetails}/>

                          {!fetchData.order_limited_edition_data && (
                            <div className="order-details__open-conversation-container element-non-selectable" onClick={()=>setOpenConversation(true)}>
                              <BsChat className="order-details__conversation-icon"/>

                              <span className="mt-m">
                                                        Conversation with{" "}

                                <span style={{ color: "var(--app-normal_text)", fontWeight: 500 }}>
                                  {
                                    state.user_session._id === fetchData.order_buyer._id ?
                                      fetchData.order_seller.user_name 
                                      :
                                      fetchData.order_buyer.user_username
                                  }
                                </span>
                              </span>
                            </div>
                          )}

                          <VariableContent fetchData={fetchData}/>
                        </>
                  }
                </div>
              </main>
        }
      </div>
    </>
  );
}
