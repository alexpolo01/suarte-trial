import { useEffect,useRef, useState } from 'react';

import config from '@/config';
import useQuery from '@/hooks/useQuery';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function Suggestions({ query, currentArtist, selectArtist, openArtistForm }) {
  const { loading, queryData } = useQuery("artwork_artist", `${config.apis.api.url}/search/artist/both`, query, {
    injectToken: true,
    invalidateWhen: ["NEW_ARTIST"]
  });
  const [scrollElement, setScrollElement] = useState(null);
  const scrollElementRef = useRef();

  useEffect(()=>{
    setScrollElement(scrollElementRef.current);
  }, []);

  return (
    <>
      <div className="add-artwork-search-artist__artists-suggestions-container">
        <div className="add-artwork-search-artist__artists-suggestions" ref={scrollElementRef}>
          {
            loading ? 
              <CustomSpinner className="add-artwork-search-artist__spinner" thin/>
              : queryData.data.length === 0 ? 
                <Text className="add-artwork-search-artist__no-results dots-on-overflow" paragraph small>
                                No results found for "<span>{query.user_name}</span>".
                </Text>
                :
                <VirtualList 
                  key={queryData.queryString} 
                  items={queryData.data} 
                  currentArtist={currentArtist} 
                  selectArtist={selectArtist} 
                  scrollElement={scrollElement}
                />
          }
        </div>

        <div className="add-artwork-search-artist__add-artist-button-container">
          <Text className="add-artwork-search-artist__add-artist-text" paragraph justify small>
                        Cannot find the artist?
          </Text>

          <div className="add-artwork-search-artist__add-artist-button" onClick={openArtistForm}>
            <Text className="add-artwork-search-artist__add-artist-button-text" large>
                            Create a new artist profile
            </Text>
          </div>
        </div>
      </div>     
    </>
  );
}
