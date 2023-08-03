import { MdPause } from "react-icons/md";

import config from '@/config';
import AudioPlaylist from '@/shared-components/audio/components/AudioPlaylist';
import PlayIcon from '@/shared-components/icons/components/actions/PlayIcon';
import CustomInputRange from '@/shared-components/inputs/components/CustomInputRange';
import Text from '@/shared-components/text/components/Text';

import './styles/AudioPlayer.css';

export default function AudioPlayer({ audioId, deleteAudio, previewMode }) {
  return (
    <>
      <AudioPlaylist audioTracks={[`${config.app.audioServiceDomain}/${audioId}`]}>
        {({ loading, currentTime, sliderProps, togglePlayPause, audioState }) => (<>
          {
            <div className="add-artwork-audio-player__container">
              <div className="add-artwork-audio-player__play-pause-button" onClick={togglePlayPause}>
                {audioState === "AUDIO_PAUSED" ? <PlayIcon className="add-artwork-audio-player__play-pause-icon play"/> : <MdPause className="add-artwork-audio-player__play-pause-icon pause"/>}
              </div>

              <Text className="add-artwork-audio-player__currentTime" medium>{loading ? "-:-" : currentTime}</Text>                       

              <CustomInputRange 
                className="add-artwork-audio-player__slider" 
                defaultValue={sliderProps.defaultValue}
                maxValue={sliderProps.max}
                reference={sliderProps.ref}
                onInput={sliderProps.onInput}
                onMouseUp={sliderProps.onMouseUp}
                onTouchEnd={sliderProps.onTouchEnd}
                onKeyDown={sliderProps.onKeyDown}
                thumb
              />

              {!previewMode && <Text className="add-artwork-audio-player__delete-audio" medium onClick={deleteAudio}>Delete</Text>}
            </div>
          }
        </>)}
      </AudioPlaylist>
    </>
  );
}
