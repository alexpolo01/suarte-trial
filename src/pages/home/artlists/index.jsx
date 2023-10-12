import { useEffect,useState } from 'react';
import { Helmet } from 'react-helmet';

import config from "@/config";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useQuery from "@/hooks/useQuery";
import HomeHeader from '@/shared-components/home/components/HomeHeader';
import ArtlistIcon from '@/shared-components/icons/components/user-profile/ArtlistIcon';
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';
import ArrayUtils from "@/utils/array.utils";
import ObjectUtils from "@/utils/object.utils";

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
        <title>Artlists - Suarte</title>
        <meta name="description" content="Explore curated lists of artworks by collectors, artists, and galleries. Discover play mode and share the artlists to any screen in your home enhancing your meals and meetings with the best artworks." />
      </Helmet>
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
                !ObjectUtils.isEmpty(shuffledQueryData) ? (
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
                )
          }
        </div>
      </AppNavigationPage>
    </>
  );
}