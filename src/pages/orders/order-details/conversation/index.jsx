import { useEffect, useRef } from 'react';
import { Virtuoso } from "react-virtuoso";

import useMessages from '@/hooks/useMessages';
import useStateHandler from '@/hooks/useStateHandler';
import ChatMessage from '@/shared-components/cards/components/ChatMessage';
import ChatTimestamp from '@/shared-components/cards/components/ChatTimestamp';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Utils from '@/utils';

import ConversationInput from './components/ConversationInput';
import ConversationSkeleton from './components/ConversationSkeleton';
import EmptyConversation from './components/EmptyConversation';

import './index.css';

export default function Conversation({ close, orderData }) {
  const { loading, messages, loadMoreMessages, sendMessage, sendMessageTrigger } = useMessages(orderData._id);
  const { state } = useStateHandler();
  const chatRef = useRef();

  useEffect(() => {
    if(chatRef.current) {
      /* Without the setTimeout it does not work haha. Could be because virtuoso might trigger some asynchronous operations */
      setTimeout(()=>{
        chatRef.current.scrollToIndex(messages.totalDocs);
      }, 5);
    }
  }, [sendMessageTrigger]);

  function shouldRenderTimestamp(index) {
    const positionInFakeIndex = (messages.totalDocs-1)-index;

    if(positionInFakeIndex < 0) return false;

    const realIndex = (messages.data.length-1) - positionInFakeIndex;

    if(index === 0) {
      return true;
    } else if(messages.data[realIndex-1]) {
      const dayOfCurrentMessage = new Date(messages.data[realIndex].createdAt).getTime();
      const dayOfPreviousMessage = new Date(messages.data[realIndex-1].createdAt).getTime();

      return !Utils.isSameDay(dayOfCurrentMessage, dayOfPreviousMessage);
    } else {
      return false;
    }
  }

  return (
    <>
      <div className="order-conversation__container">
        <header className="order-conversation__header element-non-selectable" onClick={close}>
          <BackArrowIcon className="order-conversation__header-icon"/>
                    
          <span className="order-conversation__header-text dots-on-overflow mt-l">
                        Conversation with{" "}

            {
              state.user_session._id === orderData.order_buyer._id ?
                orderData.order_seller.user_name 
                :
                orderData.order_buyer.user_username
            }
          </span>
        </header>

        <div className="order-conversation__main">
          {
            loading ? 
              <ConversationSkeleton/>
              : messages.data.length === 0?
                <EmptyConversation orderData={orderData}/>
                :
                <Virtuoso
                  className="remove-scrollbar"
                  style={{ width: "100%", height: "100%" }}
                  data={messages.data}
                  firstItemIndex={Math.max(0, messages.totalDocs - messages.data.length)}
                  components={{
                    Header: messages.data.length < messages.totalDocs ? 
                      () => (
                        <div style={{ padding: "12px 0px" }}>
                          <CustomSpinner className="order-conversation__more-messages-spinner" thin/>
                        </div>
                      )
                      :
                      null
                  }}
                  startReached={messages.data.length < messages.totalDocs ? loadMoreMessages : null}
                  increaseViewportBy={200}
                  initialTopMostItemIndex={messages.totalDocs-1}
                  ref={chatRef}
                  itemContent={(index, message) => (
                    <div style={{ padding: "0px 2px", paddingBottom: "15px" }}>
                      {shouldRenderTimestamp(index) && (
                        <div style={{ paddingBottom: "15px" }}>
                          <ChatTimestamp timestamp={new Date(message.createdAt).getTime()}/>
                        </div>
                      )}
                                        
                      <ChatMessage messageData={message}/>
                    </div>
                  )}
                />
          }
        </div>

        <ConversationInput sendMessage={sendMessage}/>
      </div>
    </>
  );
}
