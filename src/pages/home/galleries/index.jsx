import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useQuery from "@/hooks/useQuery";
import HomeHeader from "@/shared-components/home/components/HomeHeader";
import SettingsGalleryIcon from "@/shared-components/icons/components/settings/SettingsGalleryIcon";
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from "@/shared-components/wrappers/components/AppNavigationPage";
import ArrayUtils from "@/utils/array.utils";
import ObjectUtils from "@/utils/object.utils";

import SkeletonPage from "./components/SkeletonPage";
import VirtualList from "./components/VirtualList";

import "./index.css";

export default function HomeGalleries() {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(params ? params : { q: "" });
  const { loading, queryData, loadMoreData } = useQuery(
    "home_galleries",
    `${config.apis.api.url}/search/gallery`,
    query,
    {
      injectToken: true,
    }
  );
  const [shuffledQueryData, setShuffledQueryData] = useState({});

  function onInput(value) {
    const newQuery = { q: value };
    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  useEffect(() => {
    if (queryData && !ObjectUtils.isEmpty(queryData)) {
      // Copy QueryData
      let copiedQueryData = JSON.parse(JSON.stringify(queryData));
      // Slice new uploaded artworks from backend
      let differentArray = copiedQueryData.data.data.slice(
        !ObjectUtils.isEmpty(shuffledQueryData)
          ? shuffledQueryData.data.data.length
          : 0
      );
      // Shuffle new artworks
      let shuffledArray = ArrayUtils.shuffleArray(differentArray);
      // set the shuffledQueryData with shuffled artworks
      setShuffledQueryData((prevData) => {
        return !ObjectUtils.isEmpty(prevData)
          ? {
            ...copiedQueryData,
            data: {
              ...copiedQueryData.data,
              data: [...prevData.data.data, ...shuffledArray],
            },
          }
          : {
            ...copiedQueryData,
            data: {
              ...copiedQueryData.data,
              data: [...shuffledArray],
            },
          };
      });
    }
  }, [queryData]);

  return (
    <>
      <Helmet>
        <title>Galleries - Suarte</title>
        <meta
          name="description"
          content="Explore a wide range of art galleries on Suarte. Discover unique artworks and artists from around the world. Collect, interact and showcase their art."
        />
      </Helmet>
      <AppNavigationPage>
        <div className="home-galleries__page">
          <HomeHeader
            onInput={onInput}
            value={query.q}
            icon={
              <SettingsGalleryIcon className="home-galleries__header-icon" />
            }
            text="Galleries"
            placeholder="Search for galleries..."
          />

          {loading ? (
            <SkeletonPage />
          ) : queryData.data.data.length === 0 ? (
            <Text className="home-galleries__empty-text" paragraph medium>
              No galleries available for your search query.
            </Text>
          ) : !ObjectUtils.isEmpty(shuffledQueryData) ? (
            <VirtualList
              key={shuffledQueryData.queryString}
              items={shuffledQueryData.data}
              onLoadMore={loadMoreData}
            />
          ) : (
            <VirtualList
              key={queryData.queryString}
              items={queryData.data}
              onLoadMore={loadMoreData}
            />
          )}
        </div>
      </AppNavigationPage>
    </>
  );
}
