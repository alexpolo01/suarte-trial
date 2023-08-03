import { useContext,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import ArtworkDataContext from '@/context/ArtworkDataContext';
import useQuery from '@/hooks/useQuery';
import useScreenSize from '@/hooks/useScreenSize';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import Mention from './components/Mention';

import './index.css';

export default function MentionVirtualList({ mention, setMention }) {
  const { loading, queryData, loadMoreData } = useQuery("user_mention", `${config.apis.api.url}/search/user`, { q: mention.value });
  const { artworkData } = useContext(ArtworkDataContext);
  const screenSize = useScreenSize();
  const listRef = useRef();

  function selectMention(mentionSelected) {
    const thoughtInput = document.getElementById(`artwork_${artworkData._id}_thought_input`);
    const thoughtText = thoughtInput.value;
    const newThoughtText = thoughtText.substring(0, mention.start) + `@${mentionSelected.user_username}` + thoughtText.substring(mention.end);

    thoughtInput.value = newThoughtText;
    thoughtInput.focus();
    setMention(null);
  }

  return (
    <>
      <div className="thought-mention-search__container">
        {
          loading ?
            <div className="thought-mention-search__spinner-container">
              <CustomSpinner className="thought-mention-search__spinner" thin/> 
            </div>
            : queryData.data.data.length === 0 ?
              <Text className="thought-mention-search__no-results" paragraph small>
                            No results found for <span>"{mention.value}"</span>
              </Text>
              :
              <InfiniteScroll 
                className="thought-mention-search__virtual-list-container remove-scrollbar" 
                onLoadMore={loadMoreData} 
                shouldLoadMore={queryData.data.data.length < queryData.data.totalDocs} 
                offsetElements={3} 
                listLength={queryData.data.data.length} 
                defaultInfiniteLoaderClassName="thought-mention-search__virtual-spinner"
              >
                {({ infiniteScrollAssigner, infiniteScrollParent }) => (
                  <WindowScroller scrollElement={infiniteScrollParent ? infiniteScrollParent : window}>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                      <AutoSizer disableHeight onResize={()=>listRef.current.recomputeRowHeights()}>
                        {({ width }) => (
                          <List
                            autoHeight
                            width={width}
                            height={height}
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            rowCount={queryData.data.data.length}
                            rowHeight={screenSize.width <= 550 ? 58 : 62}
                            scrollTop={scrollTop}
                            overscanRowCount={3}
                            ref={listRef}
                            rowRenderer={({ index, key, style }) => (
                              <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                                <Mention mentionData={queryData.data.data[index]} selectMention={()=>selectMention(queryData.data.data[index])}/>
                              </div>
                            )}
                          />
                        )}
                      </AutoSizer>
                    )}
                  </WindowScroller>
                )}
              </InfiniteScroll>
        }
      </div>
    </>
  );
}
