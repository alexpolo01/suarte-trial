import { useEffect,useRef, useState } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from "@/hooks/useScreenSize";
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import CollectionCard from "./components/CollectionCard";
import ConfirmVisibilityChange from "./components/ConfirmVisibilityChange";

import './index.css';

export default function VirtualList({ items, onLoadMore, changeArtworkVisibility }) {
  const [artworkToChangeVisibility, setArtworkToChangeVisibility] = useState(null);
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(()=>{
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  return (
    <>
      <InfiniteScroll 
        onLoadMore={onLoadMore} 
        shouldLoadMore={items.data.length < items.totalDocs} 
        offsetElements={3} 
        listLength={items.data.length} 
      >
        {({ infiniteScrollAssigner }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => {
                  return (
                    <List
                      autoHeight
                      width={width === 0 ? 0.1 : width}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}
                      ref={listRef}
                      overscanRowCount={3}
                      rowCount={items.data.length}
                      rowHeight={screenSize.width <= 550 ? 174 : screenSize.width <= 1004 ? 193 : 226}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <CollectionCard 
                            data={items.data[index]} 
                            setArtworkToChangeVisibility={setArtworkToChangeVisibility}
                          />
                        </div>
                      )}
                    />
                  );
                }}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteScroll>

      <ConfirmVisibilityChange 
        artwork={artworkToChangeVisibility} 
        close={()=>setArtworkToChangeVisibility(null)}
        changeArtworkVisibility={changeArtworkVisibility}
      />
    </>
  );
}