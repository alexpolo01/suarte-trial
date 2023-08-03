import { useRef } from 'react';

import './styles/ConversationInput.css';

export default function ConversationInput({ sendMessage }) {
  const textarea = useRef();

  function resizeTextarea() {
    textarea.current.setAttribute('rows', '1');
    const lineHeight = parseInt(window.getComputedStyle(textarea.current).lineHeight);
    const numRows = Math.ceil((textarea.current.scrollHeight-26) / lineHeight); /** WE NEED TO SUBSTRACT SOMETHING TO CALIBRATE IT */
    textarea.current.setAttribute('rows', numRows);       
  }

  function onSendMessage() {
    const newMessage = textarea.current.value.trim();

    if(newMessage.length === 0) return;

    sendMessage(newMessage);
    textarea.current.value = "";
    resizeTextarea();
  }

  return (
    <>
      <div className="conversation-input__container">
        <textarea 
          className="conversation-input__textarea mt-m"
          rows="1" 
          onInput={resizeTextarea} 
          ref={textarea} 
          spellCheck={false}
          placeholder="Write a message..."
        />

        <span className="conversation-input__send-button element-non-selectable mt-m" onClick={onSendMessage}>
                    Send
        </span>
      </div>
    </>
  );
}
