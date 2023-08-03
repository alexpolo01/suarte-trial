import { AutoSizer, List,WindowScroller } from 'react-virtualized';

import config from '@/config';
import useCache from '@/hooks/useCache';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import ArtworkRequestCard from './components/ArtworkRequestCard';

import './index.css';

export default function ArtworkRequests() {
  const { loading, fetchData, loadMoreData } = useCache("admin_artwork_requests", `${config.apis.api.url}/draft/status/pending`, { type: "@cache/dynamic", injectToken: true, invalidateWhen: ["ARTWORK_REQUEST_DENIED", "ARTWORK_REQUEST_ACCEPTED"] });

  if(loading) {
    return <Text className="admin-artwork-requests__loading-text" paragraph justify large>Cargando las solicitudes...</Text>;
  }

  return (
    <>
      <div className="admin-artwork-requests__container">
        <h2 className="admin-artwork-requests__heading"><Heading medium>Solicitudes de cuadros</Heading></h2>

        <InfiniteScroll 
          onLoadMore={loadMoreData} 
          shouldLoadMore={fetchData.data.length < fetchData.totalDocs} 
          offsetElements={3} 
          listLength={fetchData.data.length} 
        >
          {({ infiniteScrollAssigner }) => (
            <WindowScroller>
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
                      rowHeight={240}
                      scrollTop={scrollTop}
                      overscanRowCount={3}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <ArtworkRequestCard draftData={fetchData.data[index]}/>
                        </div>
                      )}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}
