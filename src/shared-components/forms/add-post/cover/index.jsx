import { CircularProgress } from '@mui/material';

import config from '@/config';
import FormError from '@/shared-components/error/components/FormError';

import UploadCover from './components/UploadCover';

import './index.css';

export default function Cover({ formState, setFormState, element, formError, setFormError }) {
  function focusOnTitle() {
    const titleContainer = document.getElementById("post_title_error");
    const titleInput = document.getElementById("post_title");

    titleContainer.scrollIntoView({
      behavior: "smooth"
    });
    titleInput.focus({ preventScroll: true });
  }

  return (
    <>
      <div 
        className={`post-cover__container ${formState.post_cover?.image_id ? "template-background" : ""} ${formState.post_cover?.loading ? "loading" : ""}`} 
        style={{ backgroundImage: `url(${config.app.imageServiceDomain}/${formState.post_cover?.image_id}/w=600)` }} 
        id={`${element}_error`}
      >
        <div className="post-cover__backdrop">
          {
            formState.post_cover?.loading ?
              <div className="post-cover__progress-container">
                <CircularProgress
                  className="post-cover__progress-spinner"
                  variant="determinate"
                  value={formState.post_cover.progress}
                />

                <span className="post-cover__progress-value">
                  {formState.post_cover.progress}%
                </span>
              </div>
              : formState.post_title ? 
                <p className="post-cover__title">
                  {formState.post_title}
                </p> 
                : 
                <p className="post-cover__title element-non-selectable click" onClick={focusOnTitle}>
                                Click here to enter a title for this post
                </p>
          }
        </div>
      </div>

      <FormError 
        error={formError} 
        alternativeElement={`${element}_error`} 
        errorClassName="post-cover__error-classname" 
        element={element}
      />

      <UploadCover
        formState={formState}
        setFormState={setFormState}
        element={element}
        setFormError={setFormError}
      />
    </>
  );
}
