import { useMemo,useRef, useState } from 'react';

import Utils from '@/utils';

import './styles/AudioPlaylist.scss';

// TODO: CLEAN THIS CODE AND SEE IF WE CAN DO IT CONTROLLED STATE (THE SLIDER PART). CLEAN THOSE PROPS. FOR EXAMPLE THE "TYPE: RANGE IS USELESS". REVISE EVERYTHING FROM TOP TO DOWN (FIRST WITHOUT SLIDER AND THEN WITH SLIDER)
// AND WE WILL LEAVE EVERYTHING REALLY CLEAN

/**
 * 
 * This can be used for multiple and single audio files.
 * 
 * Default mode will be RESET_MODE. This is for single audio files. Doesnt make sense to use this one in multiple audio files.
 * 
 * If you want to loop the current audio file, you can use LOOP_SONG_MODE.
 * 
 * If you want to loop the whole playlist, YOU CAN USE LOOP_PLAYLIST_MODE.
 * 
 * If you are in NORMAL_MODE, it will stop at the end of the playlist. If we have a single file it will just stop at the end of the song.
 * 
 * onNextTrack and onPrevTrack are called before downloading the new data. 
 */
export default function AudioPlaylist({ children, mode="RESET_MODE", audioTracks=[], onNextTrack=null, onPrevTrack=null }) {
  /** Audio Playlist States */
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(0); 

  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [sliderMax, setSliderMax] = useState(100);

  const [audioState, setAudioState] = useState("AUDIO_PAUSED");
  const [playListMode, setPlayListMode] = useState(mode);

  /** Audio Playlist Refs */
  const audioPlaylist = useRef(null);
  const audioControlsSlider = useRef(null);
  const isSliderControlSliding = useRef(false); // Prevents slider from updating while sliding, we use a ref to avoid re-rendering!
  const didSliderChangeTime = useRef(false); 

  /** Props for controlling the audio with an slider */
  const sliderProps = { // we calculate the new slider props on every render phase because we want the functions to have the updated state value
    type: "range",
    defaultValue: 0,
    ref: audioControlsSlider,
    onInput: onInputOnSliderControl,
    onMouseUp: onReleaseSliderInSliderControl, /** React onChange event works the same as onInput. We want to change the audio time only when the user releases the slider. */
    onTouchEnd: onReleaseSliderInSliderControl,
    onKeyDown: (e) => {e.preventDefault();},
    max: sliderMax,
  };

  const playListState = useMemo(()=>({
    isLastTrack: currentAudio === (audioTracks.length - 1),
    isFirstTrack: currentAudio === 0,
  }), [currentAudio]);

  /** Audio Playlist functions */
  function initAudioPlaylistControls() {
    setLoading(false);
    setDuration(Utils.timeParserMMSS(audioPlaylist.current.duration));
    setCurrentTime("0:00");
    setSliderMax(Math.floor(audioPlaylist.current.duration));  /** React batches all these states, they all count as one re-render */

    if(audioState === "AUDIO_PLAYING") {
      audioPlaylist.current.play();
    }
  }

  function onAudioTimeUpdate() {
    if(didSliderChangeTime.current === true) { /** If we changed time using the slider control, there's nothing to do here */
      didSliderChangeTime.current = false;
      return;
    }

    if(isSliderControlSliding.current === false) {
      const newCurrentTime = audioPlaylist.current.currentTime;
      changeCurrentTime(newCurrentTime);

      if(audioControlsSlider.current) {
        audioControlsSlider.current.value = Math.floor(newCurrentTime);
      }
    }
  }

  // TODO: LA LOGICA ES MUCHO MAS SENCILLA QUE COMO HICE AQUI. AL FINAL NO DEBEMOS DE DIFERENCIAR LO DE IF IS PLAYLIST. DEBEMOS DE HACER ALGO GENERICO. LAS FUNCIONES RESTART AUDIO Y DEMAS ESTA BIEN PROPORCIONARLAS AL USUARIO FINAL PARA QUE TENGA MUCHO MAS PERSONALIZACION.
  // COMO AL FINAL ES UNA PLAYLIST, ES TAN SENCILLO COMO HACER LA SIGUIENTE: SI ESTAMOS EN MODO NORMAL, DEBEMOS DE AVANZAR AL SIGUIENTE SI HAY MAS O RESETEAR EL CURRENT TRACK SI ES EL FINAL.
  // SI ESTAMOS EN LOOP MODE, AVANZAMOS AL SIGUIENTE SI HAY O REINICIAMOS AL 0 AGAIN.
  // Y SI ESTAMOS EN LOOP TRACK MODE, SIMPLEMENTE REINICIAMOS EL CURRENT TRACK. ASI, EVITAMOS TENER QUE HACER UNA COMPROBACION DE SI ES PLAYLIST O NO. PORQUE ESTE OCMPONENTE LO CREE PARA CREAR PLAYLISTS. PUEDE SER USADO PARA UN SOLO AUDIO, PERO PARA MI ESO ES UNA PLAYLIST DE UN SOLO TRACK.
  function onAudioEnd() {
    if(playListMode === "RESET_MODE") { 
      resetAudio();
    } else if(playListMode === "LOOP_SONG_MODE") { 
      restartAudio();
    } else if(playListMode === "NORMAL_MODE" && playListState.isLastTrack) {
      setAudioState("AUDIO_PAUSED");
    } else if(playListMode === "LOOP_PLAYLIST_MODE" && playListState.isLastTrack) { 
      if(isPlaylist()) {
        restartPlaylist();
      } else {
        restartAudio();
      }
    } else { /** This will trigger if we are in a playlist and we are not on the last track, so we just go to the next one */
      goToNextTrack();
    }
  }

  function isPlaylist() {
    return audioTracks.length > 1;
  }

  function changeCurrentTime(secs) {
    const newCurrentTime =  Utils.timeParserMMSS(secs);

    if(newCurrentTime !== currentTime) { /** Sometimes React executes the render phase again when bailing out. This prevents it. */
      setCurrentTime(newCurrentTime);
    }
  }

  /** Slider Controls Functions */
  function onInputOnSliderControl() {
    isSliderControlSliding.current = true;
    changeCurrentTime(audioControlsSlider.current.value);
  }

  function onReleaseSliderInSliderControl() {
    isSliderControlSliding.current = false;
    didSliderChangeTime.current = true;
    audioPlaylist.current.currentTime = audioControlsSlider.current.value;
  }

  /** HANDLER (FOR THE FINAL USER TO ASSIGN THEM ON ONCLICK EVENTS) */
  function togglePlayPause() {
    if (audioState === "AUDIO_PAUSED") {
      audioPlaylist.current.play();
      setAudioState("AUDIO_PLAYING");
    } else {
      audioPlaylist.current.pause();
      setAudioState("AUDIO_PAUSED");
    }        
  }

  function resetAudio() {
    audioPlaylist.current.currentTime = 0;
    setAudioState("AUDIO_PAUSED");
  }

  function restartAudio() {
    audioPlaylist.current.currentTime = 0;
    audioPlaylist.current.play();
  }

  function goToNextTrack() {
    setCurrentAudio(currentAudio + 1);
    setLoading(true);

    if(onNextTrack) {
      onNextTrack();
    }
  }

  function goToPrevTrack() {
    setCurrentAudio(currentAudio - 1);
    setLoading(true);

    if(onPrevTrack) {
      onPrevTrack();
    }
  }

  function restartPlaylist() {
    setCurrentAudio(0);
    setLoading(true);
  }

  function changeModeInPlaylist(newMode) {
    if(newMode !== playListMode) { /** PREVENT RENDER PHASE FROM EXECUTING DUE TO BAIL OUT */
      setPlayListMode(newMode);
    }
  }

  return (
    <>
      <audio 
        src={audioTracks[currentAudio]} 
        className="custom-audio-playlist__audio"
        ref={audioPlaylist}

        preload="metadata" 
        onLoadedMetadata={initAudioPlaylistControls}

        onTimeUpdate={onAudioTimeUpdate}
        onEnded={onAudioEnd}
      ></audio> 

      {children({
        currentTime, 
        duration, 
        sliderProps, 
        togglePlayPause, 
        audioState, 
        playListState, 
        goToNextTrack, 
        goToPrevTrack, 
        changeModeInPlaylist, 
        resetAudio, 
        restartAudio, 
        restartPlaylist, 
        playListMode, 
        loading
      })}
    </>
  );
}
