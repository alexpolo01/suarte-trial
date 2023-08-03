import { useEffect, useRef,useState } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import useQuery from '@/hooks/useQuery';
import useScreenSize from '@/hooks/useScreenSize';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import CategoryItem from './CategoryItem';

import './styles/Artist.css';

function VirtualList({ items, query, setQuery }) {
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(()=>{
    listRef.current?.recomputeRowHeights();
  }, [screenSize]);

  function selectItem(item) {
    if(query.artist) {
      setQuery({ ...query, artist: [...query.artist, item] });
    } else {
      setQuery({ ...query, artist: [item] });
    }
  }

  function removeItem(item) {
    setQuery({ ...query, artist: query.artist.filter(artist => artist._id !== item._id) });
  }
    
  return (
    <>
      <InfiniteScroll 
        className="search-filters-content-artist-virtual-list" 
        onLoadMore={null} 
        shouldLoadMore={false} 
        offsetElements={3} 
        listLength={items.length}
      >
        {({ infiniteScrollAssigner, infiniteScrollParent }) => (
          !infiniteScrollParent ? <></> :
            <WindowScroller scrollElement={infiniteScrollParent ? infiniteScrollParent : window}>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      autoHeight
                      width={width ? width : 0.1}
                      height={height ? height : 0} 
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      rowCount={items.length}
                      rowHeight={screenSize.width <= 550 ? 33 : screenSize.width <= 1004 ? 34.5 : 36}
                      scrollTop={scrollTop}
                      overscanRowCount={5}
                      ref={listRef}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <CategoryItem 
                            displayText={items[index].gallery_artist ? items[index].user_name : items[index].artist_name}
                            isSelected={query.artist?.some(artist => artist._id === items[index]._id)}
                            selectItem={()=>selectItem(items[index])}
                            removeItem={()=>removeItem(items[index])}
                          />
                        </div>
                      )}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
        )}
      </InfiniteScroll> 
    </>
  );
}

export default function Artist({ query, setQuery }) {
  const [searchQuery, setSearchQuery] = useState({ user_name: "" });
  const { loading, queryData } = useQuery("search_artist", `${config.apis.api.url}/search/artist/both`, searchQuery);

  return (
    <>
      <div className="search-filters-content-artist__container">
        <div className="search-filters-content-artist__search">
          <input 
            onInput={(e)=>setSearchQuery({ user_name: e.target.value })} 
            type="text" 
            className="search-filters-content-artist__search-input" 
            placeholder="Search..." 
            spellCheck={false} 
            autoComplete="off"
          />
        </div>

        {
          loading ? 
            <CustomSpinner className="search-filters-content-artist__spinner" thin/> 
            : 
            <VirtualList 
              key={queryData.queryString} 
              items={queryData.data} 
              query={query} 
              setQuery={setQuery}
            />
        }
      </div>
    </>
  );
}
