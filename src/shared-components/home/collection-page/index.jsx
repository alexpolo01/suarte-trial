import { useState } from "react";

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useNavigateToArtwork from "@/hooks/useNavigateToArtwork";
import useQuery from "@/hooks/useQuery";
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from "@/shared-components/wrappers/components/AppNavigationPage";

import HomeHeader from "../components/HomeHeader";

import SkeletonPage from "./components/SkeletonPage";
import VirtualList from "./components/VirtualList";

import './index.css';

export default function CollectionPage({ collectionEndpoint, collectionName, additionalParams={} }) {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(params ? params : { q: "", ...additionalParams });
  const { loading, queryData, loadMoreData } = useQuery(`${collectionName}_collection_page`, `${config.apis.api.url}${collectionEndpoint}`, query, {
    injectToken: true,
  });
  const navigateToArtwork = useNavigateToArtwork(`${collectionName}_collection_page`, queryData?.data, `${collectionEndpoint}${queryData?.queryString}`);

  function onInput(value) {
    const newQuery = { ...query, q: value };
    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  return (
    <>
      <AppNavigationPage>
        <div className="collection-page__page">
          <HomeHeader 
            onInput={onInput} 
            value={query.q} 
            text={collectionName} 
            placeholder="Search for artworks..."
          />

          {
            loading ? 
              <SkeletonPage/>
              : queryData.data.data.length === 0 ?
                <Text className="collection-page__empty-text" paragraph medium>
                                No artworks available for your search query.
                </Text>
                :
                <VirtualList 
                  key={queryData.queryString} 
                  items={queryData.data} 
                  onLoadMore={loadMoreData}
                  navigateToArtwork={navigateToArtwork}
                />
          }
        </div>
      </AppNavigationPage>
    </>
  );
}
