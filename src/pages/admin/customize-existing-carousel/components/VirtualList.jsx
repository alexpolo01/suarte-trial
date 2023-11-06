import update from 'immutability-helper';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import ArtworkRow from './ArtworkRow';

import './styles/VirtualList.css';

export default function VirtualList({ items, onLoadMore, onClickRemove, onChangeMade }) {
  const screenSize = useScreenSize();
  const listRef = useRef();
  const [cards, setCards] = useState(items.data);

  useEffect(() => {
    /* let temp = [...cards];
    if(temp.length < items.data.length) temp.concat(items.data.slice(cards.length));
    else temp = [...items.data];
    console.log(temp); */
    setCards(items.data);
  }, [items]);

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  const moveCard = (dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    );
  };

  useEffect(() => {
    onChangeMade(cards);
  }, [cards]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <InfiniteScroll 
          className="render-inspiring-results__container remove-scrollbar" 
          onLoadMore={onLoadMore} 
          shouldLoadMore={cards.length < items.totalDocs} 
          offsetElements={3} 
          listLength={cards.length}
        >
          {({ infiniteScrollAssigner, infiniteScrollParent }) => (
            <WindowScroller scrollElement={infiniteScrollParent ? infiniteScrollParent : window}>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      autoHeight
                      width={width}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      rowCount={cards.length}
                      rowHeight={screenSize.width <= 550 ? 63 : 65}
                      scrollTop={scrollTop}
                      overscanRowCount={5}
                      ref={listRef}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <ArtworkRow index={index} id={key} artwork={cards[index]} onClickRemove={onClickRemove} moveCard={moveCard} />
                        </div>
                      )}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteScroll>
      </DndProvider>
    </>
  );
}
