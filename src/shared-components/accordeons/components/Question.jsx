import { useRef, useState } from 'react';

import QuestionsIcon from '@/shared-components/icons/components/public/QuestionsIcon';

import './styles/Question.scss';

export default function Question({ question, answer, className="", heightClassName="question-default-active-height" }) {
  const answerRef = useRef();
  const [active, setActive] = useState(false);

  return (
    <>
      <div className={`contact-artist-gallery__question-container element-non-selectable ${className} ${active ? "active" : ""}`}>
        <div className="contact-artist-gallery__question-header" onClick={()=>{
          if(!active) answerRef.current.scrollTop = 0;
          setActive(!active);
        }}>
          <p className="contact-artist-gallery__question-question">{question}</p>
          <QuestionsIcon className="contact-artist-gallery__question-icon"/>
        </div>

        <div className={`contact-artist-gallery__question-answer-container ${active ? heightClassName : ""}`} ref={answerRef}>
          <p className="contact-artist-gallery__question-answer">{answer}</p>
        </div>
      </div>
    </>
  );
}
