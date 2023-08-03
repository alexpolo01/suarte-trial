import { AutoSizer, List,WindowScroller } from 'react-virtualized';

import config from '@/config';
import useCache from '@/hooks/useCache';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import LimitedEditionRequest from './components/LimitedEditionRequest';

import './index.css';

export default function LimitedEditionRequests() {
  const { loading, fetchData, loadMoreData } = useCache("admin_limited_editions_requests", `${config.apis.api.url}/inventory/limited-editions`, {
    type: "@cache/dynamic", 
    injectToken: true, 
    invalidateWhen: ["LIMITED_EDITION_REQUEST_ACCEPTED", "LIMITED_EDITION_REQUEST_DENIED"]
  });

  if(loading) {
    return <Text className="admin-limited-editions-requests__loading-text" paragraph justify large>Cargando las solicitudes...</Text>;
  }

  return (
    <>
      <div className="admin-limited-editions-requests__container">
        <h2 className="admin-limited-editions-requests__heading">
          <Heading medium>
                        Solicitudes de cuadros que han solicitado tener ediciones limitadas
          </Heading>
        </h2>

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
                      rowHeight={200}
                      scrollTop={scrollTop}
                      overscanRowCount={3}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <LimitedEditionRequest data={fetchData.data[index]}/>
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
