import { useEffect, useState } from 'react';

import config from '@/config';
import useQuery from '@/hooks/useQuery';
import useStateHandler from '@/hooks/useStateHandler';
import SearchBarIcon from '@/shared-components/icons/components/forms/SearchBarIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function SearchFollowing({ userId, currentPage, setFollowingCount }) {
  const [query, setQuery] = useState({ username: "" });
  const { cacheHandler } = useStateHandler();
  let cacheVal = cacheHandler.getCacheValue(`${userId}_following`);
  const { loading, queryData, loadMoreData } = useQuery(`${userId}_following`, `${config.apis.api.url}/user/followees/${userId}`, query, {
    injectToken: true,
    invalidateWhen: [`FOLLOW_ACTION_ON_${userId}`]
  });

  useEffect(() => {
    !loading && loadMoreData();
  }, [currentPage]);

  setFollowingCount(cacheVal ? cacheVal["?"].data.data.data.length: 0);

  return (
    <>
      <div className="search-bar-following__search-bar-container">
        <SearchBarIcon className="search-bar-following__search-bar-icon"/>

        <input 
          type="text" 
          className="search-bar-following__search-bar" 
          onInput={(e)=>setQuery({ username: e.target.value })} 
          placeholder='Search' 
          spellCheck={false} 
          autoComplete="off"
        />
      </div>

      <div className="search-bar-following__search-bar-content">
        {
          loading ? 
            <CustomSpinner className="search-bar-following__search-loading" thin/>
            : queryData.data.data.length === 0 ?
              <Text className="search-bar-following__empty" paragraph small>
                {/* No users available for your search query. */}
                            This is Search Following Page
              </Text>
              :
              <VirtualList 
                key={queryData.queryString} 
                items={queryData.data} 
                onLoadMore={loadMoreData}
              />
        }
      </div>
    </>
  );
}
