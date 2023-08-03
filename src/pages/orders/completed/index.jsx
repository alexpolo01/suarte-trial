import config from '@/config';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import OrdersSkeleton from '@/shared-components/loaders/components/OrdersSkeleton';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './components/VirtualList';

import './index.css';

export default function OrdersCompleted() {
  const { state } = useStateHandler();
  const { loading, fetchData, loadMoreData } = useCache(`${state.user_session._id}_orders_completed`, `${config.apis.api.url}/orders/completed`, {
    injectToken: true,
    invalidateWhen: ["CONFIRM_RECEPTION"],
    includeSearchQueries: { type: state.user_session.user_type === "gallery" ? "seller" : "buyer" }
  });

  if(loading) {
    return (
      <OrdersSkeleton/>
    );
  } else if(fetchData.data.length === 0) {
    return (
      <Text className="orders-completed__empty-text" paragraph small>
                You currently have no orders that have been completed.
      </Text>
    );
  } else {
    return (
      <>
        <VirtualList fetchData={fetchData} loadMoreData={loadMoreData}/>
      </>
    );
  }
}
