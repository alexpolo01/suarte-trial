import { useState } from 'react';

import config from '@/config';
import useQuery from '@/hooks/useQuery';
import Text from '@/shared-components/text/components/Text';

import Searchbar from './components/Searchbar';
import SkeletonLoader from './components/SkeletonLoader';
import UserTypeSelector from './components/UserTypeSelector';
import VirtualList from './virtual-list';

import './index.css';

export default function Search() {
  const [query, setQuery] = useState({ q: "", user_type: "collector" });
  const { loading, queryData, loadMoreData } = useQuery("search_users", `${config.apis.api.url}/search/${query.user_type}`, query, {
    injectToken: true
  });

  return (
    <>
      <Searchbar query={query} setQuery={setQuery}/>

      <UserTypeSelector query={query} setQuery={setQuery}/>

      {
        loading ? 
          <SkeletonLoader/> 
          : queryData.data.data.length === 0 ?
            <Text className="search-users-content__empty-text" paragraph medium>
                        No users available for your search query.
            </Text>
            :
            <VirtualList 
              key={queryData.queryString} 
              items={queryData.data} 
              onLoadMore={loadMoreData}
            />
      }
    </>
  );
}
