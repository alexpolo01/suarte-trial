import Utils from '@/utils';

import './styles/ChatTimestamp.css';

export default function ChatTimestamp({ timestamp }) {
  return (
    <>
      <span className="chat-timestamp__container mt-s">
        {Utils.getChatTimestamp(timestamp)}
      </span>
    </>
  );
}
