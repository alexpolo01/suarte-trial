import { useEffect,useState } from "react";
import { Helmet } from "react-helmet";

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useNavigateToArtwork from "@/hooks/useNavigateToArtwork";
import useQuery from "@/hooks/useQuery";
import HomeHeader from "@/shared-components/home/components/HomeHeader";
import ArtworkIcon from "@/shared-components/icons/components/user-profile/ArtworkIcon";
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from "@/shared-components/wrappers/components/AppNavigationPage";
import ArrayUtils from "@/utils/array.utils";
import ObjectUtils from "@/utils/object.utils";

import SkeletonPage from "./components/SkeletonPage";
import VirtualList from "./components/VirtualList";

import "./index.css";

export default function HomeArtworks() {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(params ? params : { q: "" });
  const { loading, queryData, loadMoreData } = useQuery(
    "home_artworks",
    `${config.apis.api.url}/search/artwork`,
    query,
    {
      injectToken: true,
    }
  );

  const [shuffledQueryData, setShuffledQueryData] = useState({});

  const navigateToArtwork = useNavigateToArtwork(
    `home_artworks`,
    queryData?.data,
    `/search/artwork${queryData?.queryString}`
  );

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
        <title>Artworks - Suarte</title>
        <meta
          name="description"
          content="Discover, interact and collect top and diverse collections of artworks from the best galleries and artists around the world on Suarte."
        />
      </Helmet>
      <AppNavigationPage>
        <div className="home-artworks__page">
          <HomeHeader
            onInput={onInput}
            value={query.q}
            icon={<ArtworkIcon className="home-artworks__header-icon" />}
            text="Artworks"
            placeholder="Search for artworks..."
          />

          {loading ? (
            <SkeletonPage />
          ) : queryData.data.data.length === 0 ? (
            <Text className="home-artworks__empty-text" paragraph medium>
              No artworks available for your search query.
            </Text>
          ) : !ObjectUtils.isEmpty(shuffledQueryData) ? (
            <VirtualList
              key={shuffledQueryData.queryString}
              items={shuffledQueryData.data}
              onLoadMore={loadMoreData}
              navigateToArtwork={navigateToArtwork}
            />
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
