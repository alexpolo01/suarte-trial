import config from '@/config';
import useQuery from '@/hooks/useQuery';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function Suggestions({ query, addTag, formState }) {
  const { loading, queryData, loadMoreData } = useQuery("post_search_users", `${config.apis.api.url}/search/user`, query, {
    injectToken: true,
  });

  return (
    <>
      <div className="post-tags__search-suggestions">
        {
          loading ? 
            <CustomSpinner className="post-tags__search-spinner" thin/>
            : queryData.data.data.length === 0 ? 
              <Text className="post-tags__search-no-suggestions" paragraph small>
                            No results found for "<span>{query.q}</span>".
              </Text>
              : 
              <VirtualList 
                key={queryData.queryString} 
                items={queryData.data} 
                onLoadMore={loadMoreData} 
                addTag={addTag}
                formState={formState}
              />
        }
      </div>
    </>
  );
}
