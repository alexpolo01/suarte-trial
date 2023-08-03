import config from '@/config';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import OrdersSkeleton from '@/shared-components/loaders/components/OrdersSkeleton';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function OrdersPending() {
  const { state } = useStateHandler();
  const { loading, fetchData, setFetchData, loadMoreData } = useCache(`${state.user_session._id}_orders_pending`, `${config.apis.api.url}/orders/pending`, {
    injectToken: true,
    invalidateWhen: ["BUY_ARTWORK"],
    includeSearchQueries: { type: state.user_session.user_type === "gallery" ? "seller" : "buyer" }
  });

  if(loading) {
    return (
      <OrdersSkeleton/>
    );
  } else if(fetchData.data.length === 0) {
    return (
      <Text className="orders-pending__empty-text" paragraph small>
                You don't have any pending orders right now.
      </Text>
    );
  } else {
    return (
      <>
        <VirtualList
          fetchData={fetchData}
          setFetchData={setFetchData}
          loadMoreData={loadMoreData}
        />
      </>
    );
  }
}
