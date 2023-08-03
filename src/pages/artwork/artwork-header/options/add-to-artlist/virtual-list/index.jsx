import { useState } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import CreateNewArtlist from '@/shared-components/forms/components/CreateNewArtlist';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import ArtlistItem from './components/ArtlistItem';

import './index.css';

export default function VirtualList({ close }) {
  const { state } = useStateHandler();
  const { loading, fetchData, setFetchData, loadMoreData } = useCache(`${state.user_session._id}_artwork_view_artlists`, `${config.apis.api.url}/artlist/user/${state.user_session._id}`, {
    injectToken: true,
    type: "@cache/dynamic"
  });
  const [openCreateArtlist, setOpenCreateArtlist] = useState(false);

  function onCreateNewArtlist(newArtlist) {
    setFetchData({
      ...fetchData,
      totalDocs: fetchData.totalDocs + 1,
      data: [
        newArtlist,
        ...fetchData.data
      ]
    });
  }

  if(loading) {
    return (
      <CustomSpinner className="artwork-view-add-to-artlist__spinner" thin/>
    );
  } else {
    return (
      <>
        <div className="artwork-view-add-to-artlist__content">
          {
            fetchData.data.length === 0 ? 
              <div>
                <Text className="artwork-view-add-to-artlit__create-artlist element-non-selectable" onClick={()=>setOpenCreateArtlist(true)} medium>
                                    New artlist
                </Text>
    
                <Text className="artwork-view-add-to-artlist__no-artlist" small>
                                    You don't have any artlists yet. You can create one using the button above.
                </Text>
              </div>
              :
              <InfiniteScroll 
                className="artwork-view-add-to-artlist__virtual-container remove-scrollbar" 
                onLoadMore={loadMoreData} 
                shouldLoadMore={fetchData.data.length < fetchData.totalDocs} 
                offsetElements={3} l
                istLength={fetchData.data.length}
              >
                {({ infiniteScrollAssigner, infiniteScrollParent }) => (
                  <>
                    <Text className="artwork-view-add-to-artlit__create-artlist element-non-selectable" onClick={()=>setOpenCreateArtlist(true)} medium>
                                            New artlist
                    </Text>
    
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
                              rowCount={fetchData.data.length}
                              rowHeight={105}
                              scrollTop={scrollTop}
                              overscanRowCount={5}
                              rowRenderer={({ index, key, style }) => (
                                <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                                  <ArtlistItem artlistData={fetchData.data[index]} close={close}/>
                                </div>
                              )}
                            />
                          )}
                        </AutoSizer>
                      )}
                    </WindowScroller>
                  </>
                )}
              </InfiniteScroll>
          }
    
          <CreateNewArtlist 
            open={openCreateArtlist} 
            close={()=>setOpenCreateArtlist(false)} 
            onCreateNewArtlist={onCreateNewArtlist}
          />
        </div>
      </>
    );
  }
}
