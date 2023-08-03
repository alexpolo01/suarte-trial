import useStateHandler from '@/hooks/useStateHandler';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';

import './styles/EmptyConversation.css';

export default function EmptyConversation({ orderData }) {
  const { state } = useStateHandler();

  return (
    <>
      {
        state.user_session._id === orderData.order_seller._id ?
          <p className="empty-conversation__buyer-text mt-s">
                        No messages found for this conversation.
          </p>
          :
          <div className="empty-conversation__seller-container">
            <UserProfileImage
              image={orderData.order_seller.user_image?.image_id}
              typeOfProfile={orderData.order_seller.user_type}
              className="empty-conversation__seller-image"
            />

            <span className="empty-conversation__seller-name mt-l">
              {orderData.order_seller.user_name}
            </span>

            <p className="empty-conversation__seller-text mt-s">
                            Start a conversation with {orderData.order_seller.user_name} and 
                            learn more about your recent acquisition.
            </p>
          </div>
      }
    </>
  );
}
