import { useEffect, useRef,useState } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import useQuery from '@/hooks/useQuery';
import useScreenSize from '@/hooks/useScreenSize';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import CategoryItem from './CategoryItem';

import './styles/Gallery.css';

function VirtualList({ items, onLoadMore, query, setQuery }) {
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(()=>{
    listRef.current?.recomputeRowHeights();
  }, [screenSize]);

  function selectItem(item) {
    if(query.gallery) {
      setQuery({ ...query, gallery: [...query.gallery, item] });
    } else {
      setQuery({ ...query, gallery: [item] });
    }
  }

  function removeItem(item) {
    setQuery({ ...query, gallery: query.gallery.filter(gallery => gallery._id !== item._id) });
  }
    
  return (
    <>
      <InfiniteScroll 
        className="search-filters-content-gallery-virtual-list" 
        onLoadMore={onLoadMore} 
        shouldLoadMore={items.data.length < items.totalDocs} 
        offsetElements={3} 
        listLength={items.data.length}
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
                      rowCount={items.data.length}
                      rowHeight={screenSize.width <= 550 ? 33 : screenSize.width <= 1004 ? 34.5 : 36}
                      scrollTop={scrollTop}
                      overscanRowCount={5}
                      ref={listRef}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <CategoryItem 
                            displayText={items.data[index].user_name}
                            isSelected={query.gallery?.some(gallery => gallery._id === items.data[index]._id)}
                            selectItem={()=>selectItem(items.data[index])}
                            removeItem={()=>removeItem(items.data[index])}
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

export default function Gallery({ query, setQuery }) {
  const [searchQuery, setSearchQuery] = useState({ q: "", sort: "name" });
  const { loading, queryData, loadMoreData } = useQuery("search_gallery", `${config.apis.api.url}/search/gallery`, searchQuery);

  return (
    <>
      <div className="search-filters-content-gallery__container">
        <div className="search-filters-content-gallery__search">
          <input 
            onInput={(e)=>setSearchQuery({ ...searchQuery, q: e.target.value })} 
            type="text" 
            className="search-filters-content-gallery__search-input" 
            placeholder="Search..." 
            spellCheck={false} 
            autoComplete="off"
          />
        </div>

        {
          loading ? 
            <CustomSpinner className="search-filters-content-gallery__spinner" thin/> 
            : 
            <VirtualList 
              key={queryData.queryString} 
              items={queryData.data} 
              onLoadMore={loadMoreData} 
              query={query} 
              setQuery={setQuery}
            />
        }
      </div>
    </>
  );
}
