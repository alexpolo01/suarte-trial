import config from '@/config';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import OrdersSkeleton from '@/shared-components/loaders/components/OrdersSkeleton';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function OrdersSent() {
  const { state } = useStateHandler();
  const { loading, fetchData, setFetchData, loadMoreData } = useCache(`${state.user_session._id}_orders_sent`, `${config.apis.api.url}/orders/sent`, {
    injectToken: true,
    invalidateWhen: ["PROVIDE_SHIPPING_NUMBER", "ISSUE_RESOLVED", "INVOLVE_SUARTE"],
    includeSearchQueries: { type: state.user_session.user_type === "gallery" ? "seller" : "buyer" }
  });

  if(loading) {
    return (
      <OrdersSkeleton/>
    );
  } else if(fetchData.data.length === 0) {
    return (
      <Text className="orders-sent__empty-text" paragraph small>
                There are no sent orders at this moment.
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
