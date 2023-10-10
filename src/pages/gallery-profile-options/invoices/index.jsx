import config from '@/config';
import useCache from '@/hooks/useCache';
import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import Text from '@/shared-components/text/components/Text';

import Info from './components/Info';
import Skeleton from './components/Skeleton';
import VirtualList from './virtual-list';

import './index.css';

export default function Invoices() {
  const { loading, fetchData, loadMoreData } = useCache("user_invoices", `${config.apis.api.url}/invoices`, {
    injectToken: true
  });
  const goBackHandler = useGoBack("/profile");

  return (
    <>
      <div className="invoices__page">
        <div className="invoices__wrapper">
          <div className="invoices__header">
            <span className="invoices__header-text lt-s">
                            Invoices
            </span>

            <BackArrowIcon className="invoices__back-button" onClick={goBackHandler}/>
          </div>

          {
            loading ?
              <Skeleton/>
              :
              <>
                <Info fetchData={fetchData}/>

                {
                  fetchData.data.length === 0 ?
                    <Text className="invoices__text" paragraph medium>
                                            No invoices are available.
                    </Text>
                    :
                    <VirtualList items={fetchData} onLoadMore={loadMoreData}/>
                }
              </>
          }
        </div>
      </div>
    </>
  );
}
