import { useState } from 'react';

import useScreenSize from '@/hooks/useScreenSize';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericBottomSheet from '@/shared-components/popups/components/GenericBottomSheet';
import Text from '@/shared-components/text/components/Text';

import SearchFiltersContent from './search-filters-content';

import './index.css';

function SearchFiltersMobile({ query, setQuery, close }) {
  const [localQuery, setLocalQuery] = useState(query);

  function applyFilters() {
    setQuery(localQuery);
    close();
  }

  return (
    <>
      <div className="search-filters-mobile__container">
        <div className="search-filters-mobile__header">
          <Text className="search-filters-mobile__header-text" small>
                        Filter by
          </Text>

          <XIcon className="search-filters-mobile__header-close" onClick={close}/>
        </div>

        <div className="search-filter-mobile__content-outter">
          <div className="search-filters-mobile__content remove-scrollbar">
            <SearchFiltersContent 
              query={localQuery} 
              setQuery={setLocalQuery} 
              isMobile
            />
          </div>
        </div>

        <div className="search-filters-mobile__apply-container">
          <ContinueButton className="search-filters-mobile__apply-button" onClick={applyFilters}>
                        Apply filters
          </ContinueButton>
        </div>
      </div>
    </>
  );
}

export default function SearchFilters({ query, setQuery, open, close }) {
  const screenSize = useScreenSize();

  if(screenSize.width > 900) {
    return (
      <SearchFiltersContent query={query} setQuery={setQuery}/>
    );
  } else {
    return (
      <>
        <GenericBottomSheet 
          className="search-filters-bottom-sheet element-non-selectable" 
          open={open} 
          close={close}
        >
          <SearchFiltersMobile 
            query={query} 
            setQuery={setQuery} 
            close={close}
          />
        </GenericBottomSheet>
      </>
    );
  }
}
