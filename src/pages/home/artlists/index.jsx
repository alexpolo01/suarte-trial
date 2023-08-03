import { useState } from 'react';

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useQuery from "@/hooks/useQuery";
import HomeHeader from '@/shared-components/home/components/HomeHeader';
import ArtlistIcon from '@/shared-components/icons/components/user-profile/ArtlistIcon';
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import SkeletonPage from "./components/SkeletonPage";
import VirtualList from "./components/VirtualList";

import './index.css';

export default function HomeArtlists() {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(params ? params : { q: "" });
  const { loading, queryData, loadMoreData } = useQuery("home_artlists", `${config.apis.api.url}/search/artlist`, query, {
    invalidateWhen: ["NEW_ARTLIST", "EDIT_ARTLIST", "DELETE_ARTLIST"],
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
        <div className="home-artlists__page">
          <HomeHeader 
            onInput={onInput} 
            value={query.q} 
            icon={<ArtlistIcon className="home-artlists__header-icon"/>} 
            text="Artlists" 
            placeholder="Search for artlists..."
          />

          {
            loading ? 
              <SkeletonPage/>
              : queryData.data.data.length === 0 ?
                <Text className="home-artlists__empty-text" paragraph medium>
                                No artlists available for your search query.
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