import { useState } from 'react';

import config from '@/config';
import useGetSearchParams from '@/hooks/useGetSearchParams';
import useQuery from '@/hooks/useQuery';
import SearchBarIcon from '@/shared-components/icons/components/forms/SearchBarIcon';
import OrdersSkeleton from '@/shared-components/loaders/components/OrdersSkeleton';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function InventoryAvailable() {
  const [params, setParams] = useGetSearchParams({ validParams: ["q"] });
  const [query, setQuery] = useState(params ? params : { q: "" });
  const { loading, queryData, setQueryData, loadMoreData } = useQuery("inventory_available_artworks", `${config.apis.api.url}/inventory/available`, query, {
    invalidateWhen: ["BUY_ARTWORK", "EDIT_ARTWORK"],
    injectToken: true,
  });

  function onInput(value) {
    const newQuery = { q: value };

    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  return (
    <>
      <div className="inventory-available__search-bar-container-outter">
        <div className="inventory-available__search-bar-container">
          <SearchBarIcon className="inventory-available__search-bar-icon"/>

          <input 
            type="text" 
            className="inventory-available__search-bar mt-m"
            value={query.q} 
            onInput={(e)=>onInput(e.target.value)} 
            placeholder='Search available artworks...' 
            spellCheck={false} 
            autoComplete="off"
          />
        </div>
      </div>

      {
        loading ?
          <OrdersSkeleton hideHeader/>
          : queryData.data.data.length === 0 ?
            <Text className="inventory-available__empty-text" paragraph small>
                        No available artworks found for your search query.
            </Text>
            :
            <VirtualList
              key={queryData.queryString}
              fetchData={queryData.data}
              setFetchData={setQueryData}
              loadMoreData={loadMoreData}
            />
      }
    </>
  );
}
