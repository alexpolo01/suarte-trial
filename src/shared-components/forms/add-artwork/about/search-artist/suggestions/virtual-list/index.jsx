import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';

import ArtistSuggestion from './components/ArtistSuggestion';

export default function VirtualList({ items, currentArtist, selectArtist, scrollElement }) {
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  return (
    <>
      <WindowScroller scrollElement={scrollElement ? scrollElement : window}>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                autoHeight
                width={width}
                height={height ? height : 0}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                rowCount={items.length}
                rowHeight={screenSize.width <= 550 ? 54 : screenSize.width <= 1004 ? 58 : 62}
                scrollTop={scrollTop}
                overscanRowCount={3}
                ref={listRef}
                rowRenderer={({ index, key, style }) => (
                  <div key={key} style={style}>
                    <ArtistSuggestion 
                      artistData={items[index]} 
                      currentArtist={currentArtist} 
                      selectArtist={selectArtist}
                    />
                  </div>
                )}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </>
  );
}
