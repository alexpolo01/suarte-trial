import { useContext,useEffect, useRef } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useProtectAction from '@/hooks/useProtectAction';
import ThoughtIcon from '@/shared-components/icons/components/artwork/ThoughtIcon';

import './styles/ThoughtInput.css';

export default function ThoughtInput({ reply, setReply, setMention, publishThought }) {
  const { artworkData } = useContext(ArtworkDataContext);
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  const textarea = useRef();

  useEffect(()=>{
    if(reply) {
      textarea.current.value = `@${reply.thought_creator.user_username} `;
      textarea.current.focus();
    } else {
      textarea.current.value = "";
    }

    resizeTextarea();
  }, [reply]);

  function submitThought() {
    const newThoughtText = textarea.current.value.trim();

    if(newThoughtText.length === 0) return;

    publishThought(newThoughtText, reply);

    textarea.current.value = "";
    resizeTextarea();
    setMention(null);
    setReply(null);
  }

  function resizeTextarea() {
    textarea.current.setAttribute('rows', '1');
    const lineHeight = parseInt(window.getComputedStyle(textarea.current).lineHeight);
    const numRows = Math.ceil(textarea.current.scrollHeight / lineHeight);
    textarea.current.setAttribute('rows', numRows);       
  }

  function getCurrentWord() {
    const text = textarea.current.value;
    const cursorPosition = textarea.current.selectionStart;
    let start = cursorPosition - 1;
    while (start >= 0 && text[start] !== ' ' && text[start] !== '\n') {
      start--;
    }
    start++;
    let end = cursorPosition;
    while (end < text.length && text[end] !== ' ' && text[end] !== '\n') {
      end++;
    }
    return { value: text.substring(start, end), start, end };
  }
      
  function onInput() {
    resizeTextarea();

    const currentWord = getCurrentWord();
    const mentionRegex = /^@[a-zA-Z][a-zA-Z0-9_]*$/;

    if(mentionRegex.test(currentWord.value) && currentWord.value.length > 3) {
      setMention({ ...currentWord, value: currentWord.value.substring(1) });
    } else {
      setMention(null);
    }
  }

  return (
    <>
      <form onSubmit={e=>{e.preventDefault(); privateActionHandler(submitThought);}} className="artwork-view-thoughts__input-container">
        <div className="artwork-view-thoughts__textarea-outter-container">
          <div className="artwork-view-thoughts__textarea-container">
            <textarea 
              placeholder="Add a thought..."
              className="artwork-view-thoughts__textarea remove-scrollbar" 
              rows="1" 
              onInput={onInput} 
              ref={textarea} 
              spellCheck={false} 
              id={`artwork_${artworkData._id}_thought_input`}
            />
          </div>
        </div>

        <button className="artwork-view-thoughts__publish-thought">
          <ThoughtIcon/>
        </button>
      </form>
    </>
  );
}
