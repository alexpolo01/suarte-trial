import useStateHandler from '@/hooks/useStateHandler';
import Utils from '@/utils';

import UserProfileImage from './UserProfileImage';

import './styles/ChatMessage.css';

export default function ChatMessage({ messageData }) {
  const { state } = useStateHandler();

  return (
    <>
      <div className={`chat-message__container ${state.user_session._id === messageData.message_sender._id ? "is-mine" : ""}`}>
        <UserProfileImage
          image={messageData.message_sender.user_image?.image_id} 
          typeOfProfile={messageData.message_sender.user_type}
          className="chat-message__user-image"
        />

        <div className="chat-message__message-container">
          <p className="chat-message__message mt-s">
            {messageData.message_text}
          </p>

          <span className="chat-message__time st-l">
            {Utils.getTimeOfMessageFromTimestamp(new Date(messageData.createdAt).getTime())}
          </span>
        </div>
      </div>
    </>
  );
}
