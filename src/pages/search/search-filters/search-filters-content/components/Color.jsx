import { useEffect,useRef, useState } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import useScreenSize from '@/hooks/useScreenSize';

import CategoryItem from './CategoryItem';

import './styles/Color.css';

export default function Color({ query, setQuery }) {
  const [scrollElement, setScrollElement] = useState(null);
  const items = config.search.main_search.artwork_filters.color;
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
    if(query.color) {
      setQuery({ ...query, color: [...query.color, item] });
    } else {
      setQuery({ ...query, color: [item] });
    }
  }

  function removeItem(item) {
    setQuery({ ...query, color: query.color.filter(color => color !== item) });
  }

  return (
    <>
      <div className="search-filters-content-color-virtual-list" ref={scrollElementRef}>
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
                        isSelected={query.color?.some(color => color === items[index])}
                        selectItem={() => selectItem(items[index])}
                        removeItem={() => removeItem(items[index])}
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
