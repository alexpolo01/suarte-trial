import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import './styles/AudioLoading.css';

export default function AudioLoading({ audioFile, setAudioFile }) {
  return (
    <>
      <div className="add-artwork-media-form__audio-loading-container">
        <CustomSpinner defaultColor thin className="add-artwork-media-form__audio-loading-spinner"/>

        <Text className="add-artwork-media-form__audio-loading-text" paragraph medium>
                    Uploading audio file... ({audioFile.progress}%)
        </Text>

        <Text className="add-artwork-media-form__audio-loading-delete" medium onClick={()=>setAudioFile(null)}>
                    Delete
        </Text>
      </div>
    </>
  );
}
