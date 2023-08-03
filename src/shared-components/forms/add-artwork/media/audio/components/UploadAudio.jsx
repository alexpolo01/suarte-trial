import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import UserService from '@/services/user.service';
import FormError from '@/shared-components/error/components/FormError';
import Heading from '@/shared-components/text/components/Heading';

import './styles/UploadAudio.css';

export default function UploadAudio({ formError, setFormError, setAudioFile }) {
  async function uploadAudio(audio) {
    const temporalAudioId = uuidv4();

    setFormError(null);
    setAudioFile({
      loading: true, 
      progress: 0,
      temporalAudioId
    }); 

    const { response, data } = await UserService.uploadAudio(audio, (progress) => {
      setAudioFile(prevValue => {
        if(prevValue && prevValue.temporalAudioId === temporalAudioId) {
          return {
            ...prevValue,
            progress
          };
        } else {
          return prevValue;
        }
      });
    });

    if(response.ok) {
      setAudioFile(prevValue => {
        if(prevValue && prevValue.temporalAudioId === temporalAudioId) {
          return data;
        } else {
          return prevValue;
        }
      });
    } else {
      setAudioFile(null);
      alert("Something went wrong. Please try again later.");
    }
  }

  function handleAudioError(errors) {
    if(errors.maxNumber) setFormError({ element: "artwork_audio_error", error_code: "ONLY_ONE_FILE" });
    else if(errors.acceptType) setFormError({ element: "artwork_audio_error", error_code: "INVALID_FILE_FORMAT" });
    else if(errors.maxFileSize) setFormError({ element: "artwork_audio_error", error_code: "FILE_EXCEEDS_SIZE" });
  }

  return (
    <>
      <ImageUploading 
        maxNumber={1} 
        allowNonImageType 
        acceptType={['mp3', 'ogg', 'wav']} 
        onChange={(imageList) => uploadAudio(imageList[0].file)} 
        onError={handleAudioError} 
        maxFileSize={10000000}
      >
        {({ onImageUpload, isDragging, dragProps })=>(
          <>
            <div className="add-artwork-media-form__audio-add-container-outter">
              <div className="add-artwork-media-form__audio-add-container">
                <div 
                  className={`add-artwork-media-form__add-audio-button${isDragging ? " dragging" : ""}`} 
                  onClick={onImageUpload} 
                  id="artwork_audio_error"
                  {...dragProps} 
                >
                  <Heading className="add-artwork-media-form__add-audio-button-text element-non-selectable" small>
                                        Add audio file
                  </Heading>
                </div>
              </div>
              <FormError error={formError} element="artwork_audio_error"/>
            </div>
          </>
        )}
      </ImageUploading>
    </>
  );
}
