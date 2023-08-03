import { useEffect,useRef, useState } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import useScreenSize from '@/hooks/useScreenSize';

import CategoryItem from './CategoryItem';

import './styles/Emotion.css';

export default function Emotion({ query, setQuery }) {
  const [scrollElement, setScrollElement] = useState(null);
  const items = config.search.main_search.artwork_filters.emotion;
  const scrollElementRef = useRef();
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(()=>{
    setScrollElement(scrollElementRef.current);
  }, []); 

  useEffect(()=>{
    listRef.current?.recomputeRowHeights();
  }, [screenSize]);

  function selectItem(item) {
    if(query.emotion) {
      setQuery({ ...query, emotion: [...query.emotion, item] });
    } else {
      setQuery({ ...query, emotion: [item] });
    }
  }

  function removeItem(item) {
    setQuery({ ...query, emotion: query.emotion.filter(emotion => emotion !== item) });
  }

  return (
    <>
      <div className="search-filters-content-emotion-virtual-list" ref={scrollElementRef}>
        {scrollElement && <WindowScroller scrollElement={scrollElement}>
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
                    <div key={key} style={style}>
                      <CategoryItem 
                        displayText={items[index]}
                        isSelected={query.emotion?.some(emotion => emotion === items[index])}
                        selectItem={()=>selectItem(items[index])}
                        removeItem={()=>removeItem(items[index])}
                      />
                    </div>
                  )}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>}
      </div>
    </>
  );
}
