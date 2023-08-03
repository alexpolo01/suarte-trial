import { useEffect,useState } from 'react';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import Text from '@/shared-components/text/components/Text';

import AudioLoading from './components/AudioLoading';
import AudioPlayer from './components/AudioPlayer';
import UploadAudio from './components/UploadAudio';

export default function Audio({ formError, setFormError, previewMode, fillWith, onChange }) {
  const [audioFile, setAudioFile] = useState(fillWith);
  const isFirstRender = useIsFirstRender();

  useEffect(()=>{
    if(!isFirstRender) {
      if(!audioFile?.loading) {
        onChange(audioFile);
      } else {
        onChange(null);
      }
    }
  }, [audioFile]);

  return (
    <>
      {(!previewMode || audioFile) && (
        <h2 className="add-artwork-media-form__heading lt-s">
                    Audio {" "}

          <Text className="add-artwork-media-form__optional-text" small>
                        (Recommended)
          </Text>
        </h2>
      )}

      {
        audioFile?.loading ?
          <AudioLoading audioFile={audioFile} setAudioFile={setAudioFile}/>
          : audioFile?.audio_id ?
            <AudioPlayer 
              audioId={audioFile?.audio_id} 
              deleteAudio={()=>setAudioFile(null)} 
              previewMode={previewMode}
            />
            : 
            !previewMode && (
              <UploadAudio
                formError={formError}
                setFormError={setFormError}
                setAudioFile={setAudioFile}
              />
            )
      }

      {(!previewMode || audioFile) && (
        <Text className="add-artwork-media-form__text" medium paragraph justify>
                    Upload or record an audio file where you walk them through the piece as you would in your gallery. 
                    Likewise galleries can encourage artists to send them audio files discussing their pieces.
        </Text>
      )}
    </>
  );
}
