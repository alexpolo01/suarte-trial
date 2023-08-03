import { useEffect, useRef,useState } from 'react';

import FormError from '@/shared-components/error/components/FormError';
import CreateArtist from '@/shared-components/forms/create-artist';
import PublicSuccessCheck from '@/shared-components/icons/components/public/PublicSuccessCheck';
import Text from '@/shared-components/text/components/Text';

import CompleteArtist from './components/CompleteArtist';
import Suggestions from './suggestions';

import './index.css';

export default function SearchArtist({ error, element, typeOfArtwork, value, onChange }) {
  const [openCreateArtist, setOpenCreateArtist] = useState(false);
  const [artistToComplete, setArtistToComplete] = useState(null);
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [query, setQuery] = useState({ user_name: "" });
  const searchContainer = useRef();
  const artistInputRef = useRef();

  useEffect(()=>{
    if(typeOfArtwork === "Work of Artist" && Boolean(value) && value.artist_should_request_email) {
      setArtistToComplete(value);
    }
  }, [typeOfArtwork]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleClickOutside(e) {
    if(!searchContainer.current.contains(e.target)) {
      setOpenSuggestions(false);
    }
  }

  function selectArtist(artist) {
    onChange(artist);

    if(artist.gallery_artist) {
      artistInputRef.current.value = artist.user_name;
    } else {
      artistInputRef.current.value = artist.artist_name;
    }
  }

  function handleSelectArtist(artist) {
    setOpenSuggestions(false);

    if(Boolean(artist.gallery_artist) || !artist.artist_should_request_email || typeOfArtwork === "Gallery owned") {
      selectArtist(artist);
    } else {
      setArtistToComplete(artist);
    }
  }

  function handleArtistSuggestions() { 
    const searchQuery = artistInputRef.current.value;

    if(searchQuery !== value?.artist_name && searchQuery !== value?.user_name) {
      onChange(null);
    }
        
    if (searchQuery.length > 1) {
      setOpenSuggestions(true);
      setQuery({ user_name: searchQuery });
    } else {
      setOpenSuggestions(false);
    }
  }

  return (
    <>
      <div className="add-artwork__search-artist-container" ref={searchContainer}>
        <div className={`add-artwork__search-artist-search-bar ${openSuggestions ? "active" : ""}`} id={`${element}_error`}>
          <label htmlFor={`${element}_visible`} className="add-artwork__search-artist-search-bar-label">
            <Text medium>
                            Artist
            </Text>
          </label>

          <div className="add-artwork__search-artist-search-bar-container">
            <input 
              type="text" 
              className="add-artwork__search-artist-search-bar-input" 
              id={`${element}_visible`} 
              name={`${element}_visible`} 
              spellCheck={false} 
              defaultValue={value?.gallery_artist ? value.user_name : value?.artist_name} 
              autoComplete="off"
              onFocus={handleArtistSuggestions}
              onChange={handleArtistSuggestions}
              ref={artistInputRef}
            />

            {value ? <PublicSuccessCheck className="add-artwork-search-artist__artist-selected-check"/> : ""}
          </div>
        </div>

        {openSuggestions && (
          <Suggestions 
            query={query} 
            currentArtist={value} 
            selectArtist={handleSelectArtist} 
            openArtistForm={()=>{setOpenCreateArtist(true); setOpenSuggestions(false);}} 
          />
        )}  

        <FormError 
          error={error} 
          alternativeElement={`${element}_error`} 
          errorClassName="public-form-input__input-error" 
          element={element}
        /> 
      </div>

      <CreateArtist 
        open={openCreateArtist} 
        close={()=>setOpenCreateArtist(false)}
        onCreate={selectArtist} 
        createMode={typeOfArtwork}
      />

      <CompleteArtist
        open={Boolean(artistToComplete)}
        close={()=>setArtistToComplete(null)} 
        onClose={() => {
          onChange(null); 
          artistInputRef.current.value = "";
        }}
        artistToComplete={artistToComplete}
        onComplete={selectArtist}
      />
    </>
  );
}
