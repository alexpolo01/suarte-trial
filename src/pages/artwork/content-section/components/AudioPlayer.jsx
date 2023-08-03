import config from '@/config';
import AudioPlaylist from '@/shared-components/audio/components/AudioPlaylist';
import PauseIcon from '@/shared-components/icons/components/actions/PauseIcon';
import PlayIcon from '@/shared-components/icons/components/actions/PlayIcon';
import CustomInputRange from '@/shared-components/inputs/components/CustomInputRange';
import Text from '@/shared-components/text/components/Text';

import './styles/AudioPlayer.css';

export default function AudioPlayer({ audio }) {
  return (
    <>
      <AudioPlaylist audioTracks={[`${config.app.audioServiceDomain}/${audio}`]}>
        {({ loading, currentTime, duration, sliderProps, togglePlayPause, audioState }) => (<>
          <div className="artwork-view-audio__container">
            <div className="artwork-view-audio__play-pause-container" onClick={togglePlayPause}>
              {audioState === "AUDIO_PAUSED" ? <PlayIcon className="artwork-view-audio__play-button"/> : <PauseIcon className="artwork-view-audio__pause-button"/>}
            </div>

            <div className="artwork-view-audio__info-container">
              <CustomInputRange 
                className="artwork-view-audio__track" 
                defaultValue={sliderProps.defaultValue}
                maxValue={sliderProps.max}
                reference={sliderProps.ref}
                onInput={sliderProps.onInput}
                onMouseUp={sliderProps.onMouseUp}
                onTouchEnd={sliderProps.onTouchEnd}
                onKeyDown={sliderProps.onKeyDown}
                thumb
              />
              <Text className="artwork-view-audio__timer left" extraSmallPlus>{loading ? "-:-" : currentTime}</Text>
              <Text className="artwork-view-audio__timer right" extraSmallPlus>{loading ? "-:-" : duration}</Text>
            </div>
          </div>
        </>)}
      </AudioPlaylist>
    </>
  );
}
