import { useState } from 'react';

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useQuery from "@/hooks/useQuery";
import HomeHeader from '@/shared-components/home/components/HomeHeader';
import ArtistIcon from "@/shared-components/icons/components/user-profile/ArtistIcon";
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import SkeletonPage from "./components/SkeletonPage";
import VirtualList from "./components/VirtualList";

import './index.css';

export default function HomeArtists() {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(params ? params : { q: "" });
  const { loading, queryData, loadMoreData } = useQuery("home_artists", `${config.apis.api.url}/search/artist`, query, {
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
        <div className="home-artists__page">
          <HomeHeader 
            onInput={onInput} 
            value={query.q} 
            icon={<ArtistIcon className="home-artists__header-icon"/>} 
            text="Artists" 
            placeholder="Search for artists..."
          />

          {
            loading ? 
              <SkeletonPage/>
              : queryData.data.data.length === 0 ?
                <Text className="home-artists__empty-text" paragraph medium>
                                No artists available for your search query.
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
