import _ from "lodash";
import { useEffect, useState } from "react";

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useNavigateToArtwork from "@/hooks/useNavigateToArtwork";
import useQuery from "@/hooks/useQuery";
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from "@/shared-components/wrappers/components/AppNavigationPage";

import HomeHeader from "../components/HomeHeader";

import SkeletonPage from "./components/SkeletonPage";
import VirtualList from "./components/VirtualList";

import "./index.css";

export default function CollectionPage({
  collectionEndpoint,
  collectionName,
  additionalParams = {},
}) {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(
    params ? params : { q: "", ...additionalParams }
  );
  const { loading, queryData, loadMoreData } = useQuery(
    `${collectionName}_collection_page`,
    `${config.apis.api.url}${collectionEndpoint}`,
    query,
    {
      injectToken: true,
    }
  );
  const [limitedEditionData, setLimitedEditionData] = useState(queryData);
  const navigateToArtwork = useNavigateToArtwork(
    `${collectionName}_collection_page`,
    queryData?.data,
    `${collectionEndpoint}${queryData?.queryString}`
  );

  function onInput(value) {
    const newQuery = { ...query, q: value };
    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  console.log("outside:", queryData);

  useEffect(() => {
    if (collectionName === "Limited Editions" && queryData) {
      let deepCopiedQueryData = _.cloneDeep(queryData);
      deepCopiedQueryData.data.data = deepCopiedQueryData.data.data.map(
        (item) => {
          let newItem = { ...item };
          
          newItem.artwork_about.artwork_price =
            config.variables.LIMITED_EDITION_SMALL_PRICE;
          newItem.artwork_about.artwork_currency = "EUR";
          return newItem;
        }
      );
      setLimitedEditionData(deepCopiedQueryData);
    }
  }, [queryData, collectionName]);

  console.log("Limited Edition:", limitedEditionData);

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

          {loading ? (
            <SkeletonPage />
          ) : queryData.data.data.length === 0 ? (
            <Text className="collection-page__empty-text" paragraph medium>
              No artworks available for your search query.
            </Text>
          ) : collectionName === "Limited Editions" ? (
            limitedEditionData && (
              <VirtualList
                key={limitedEditionData.queryString}
                items={limitedEditionData.data}
                onLoadMore={loadMoreData}
                navigateToArtwork={navigateToArtwork}
                collectionName={collectionName}
              />
            )
          ) : (
            <VirtualList
              key={queryData.queryString}
              items={queryData.data}
              onLoadMore={loadMoreData}
              navigateToArtwork={navigateToArtwork}
            />
          )}
        </div>
      </AppNavigationPage>
    </>
  );
}
