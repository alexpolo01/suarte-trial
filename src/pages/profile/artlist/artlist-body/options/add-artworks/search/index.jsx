import { useContext,useState } from 'react';

import config from '@/config';
import ArtlistDataContext from '@/context/ArtlistDataContext';
import useQuery from '@/hooks/useQuery';
import SearchBarIcon from '@/shared-components/icons/components/forms/SearchBarIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function Search() {
  const { artlistData } = useContext(ArtlistDataContext);
  const [query, setQuery] = useState({ q: "" });
  const { loading, queryData, loadMoreData } = useQuery(`${artlistData._id}_artlist_add_artworks`, `${config.apis.api.url}/search/artwork`, query, {
    injectToken: true,
  });

  return (
    <>
      <div className="artlist-add-artworks__search-bar">
        <SearchBarIcon className="artlist-add-artworks__search-icon"/>

        <input 
          type="text" 
          className="artlist-add-artworks__search-input"
          value={query.q} 
          onInput={(e)=>setQuery({ q: e.target.value })} 
          placeholder="Search artworks..." 
          spellCheck={false} 
          autoComplete="off"/>
      </div>

      <div className="artlist-add-artworks__artworks-container">
        {
          loading ? 
            <CustomSpinner className="artlist-add-artworks__spinner" thin/>
            : queryData.data.data.length === 0 ?
              <Text className="artlist-add-artworks__empty-text" paragraph small>
                            No artworks found for your search query.
              </Text>
              :
              <VirtualList 
                key={queryData.queryString} 
                items={queryData.data} 
                onLoadMore={loadMoreData}
              />
        }
      </div>
    </>
  );
}
