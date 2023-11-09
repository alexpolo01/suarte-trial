import { useEffect, useState } from 'react';

import config from '@/config';
import useGetSearchParams from '@/hooks/useGetSearchParams';
import useQuery from '@/hooks/useQuery';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import SearchNavbarIcon from '@/shared-components/icons/components/navigation/SearchNavbarIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';

import ArtworksList from '../artworks-list';

import './index.css';

function AddArtworksPopupContent({ close, addArtworks, artworks }) {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(
    params ? params: { q: "" }
  );
  const { loading, queryData, loadMoreData } = useQuery("artworks-list", `${config.apis.api.url}/search/artwork`, query, {
    injectToken: true,
  });
  const [addedItems, setAddedItems] = useState([]);

  function onInput(value) {
    const newQuery = { ...query, q: value };
    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  function onClickAddItem(item) {
    const newItems = [...addedItems];
    if(addedItems.indexOf(item) === -1)
      newItems.push(item);
    setAddedItems(newItems);
  }

  useEffect(() => {
    setAddedItems(artworks);
  }, [artworks]);
  
  return (
    <>
      <div className="add-artworks-popup-content">
        <div className="add-artworks-popup-content__header">
          <h5 className="add-artworks-popup-content__header-text">Add artworks</h5>
          <XIcon className="add-artworks-popup-content__header-close" onClick={close}/>
        </div>
        <div className="add-artworks-popup__search-container">
          <SearchNavbarIcon className="add-artworks-popup__search-icon"/>
          <input 
            type="text" 
            className="add-artworks-popup__search-input"
            placeholder="Search"
            spellCheck={false} 
            value={query.q}
            onChange={(e) => onInput(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="add-artworks-popup__artworks-container">
          { 
            loading ? "loading" :
              <ArtworksList
                key={queryData.queryString} 
                items={queryData.data} 
                onLoadMore={loadMoreData}
                onClickAddItem={onClickAddItem}
                addedItems={addedItems}
              />
          }
        </div>
        <div className="add-artworks-popup__button-container">
          <ContinueButton onClick={() => addArtworks(addedItems)}>
            ADD ARTWORKS
          </ContinueButton>
        </div>
      </div>
    </>
  );
}

export default function AddArtworksPopup({ open, onClose, addArtworks, artworks }) {
  return (
    <>
      <PopupToBottomSheet
        className="add-artworks-popup-container" 
        open={open} 
        close={onClose} 
        popupOptions={{ opacity: true }}
      >
        <AddArtworksPopupContent close={onClose} artworks={artworks} addArtworks={addArtworks} />
      </PopupToBottomSheet>
    </>
  );
}
