import { useState } from 'react';

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useQuery from "@/hooks/useQuery";
import HomeHeader from '@/shared-components/home/components/HomeHeader';
import SettingsGalleryIcon from '@/shared-components/icons/components/settings/SettingsGalleryIcon';
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import SkeletonPage from "./components/SkeletonPage";
import VirtualList from "./components/VirtualList";

import './index.css';

export default function HomeGalleries() {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(params ? params : { q: "" });
  const { loading, queryData, loadMoreData } = useQuery("home_galleries", `${config.apis.api.url}/search/gallery`, query, {
    injectToken: true,
  });

  function onInput(value) {
    const newQuery = { q: value };
    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  return (
    <>
      <AppNavigationPage>
        <div className="home-galleries__page">
          <HomeHeader 
            onInput={onInput} 
            value={query.q} 
            icon={<SettingsGalleryIcon className="home-galleries__header-icon"/>} 
            text="Galleries" 
            placeholder="Search for galleries..."
          />

          {
            loading ? 
              <SkeletonPage/>
              : queryData.data.data.length === 0 ?
                <Text className="home-galleries__empty-text" paragraph medium>
                                No galleries available for your search query.
                </Text>
                :
                <VirtualList 
                  key={queryData.queryString} 
                  items={queryData.data} 
                  onLoadMore={loadMoreData}
                />
          }
        </div>
      </AppNavigationPage>
    </>
  );
}