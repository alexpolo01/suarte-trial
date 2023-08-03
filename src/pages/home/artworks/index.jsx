import { useState } from 'react';

import config from '@/config';
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useNavigateToArtwork from "@/hooks/useNavigateToArtwork";
import useQuery from "@/hooks/useQuery";
import HomeHeader from '@/shared-components/home/components/HomeHeader';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import SkeletonPage from './components/SkeletonPage';
import VirtualList from './components/VirtualList';

import './index.css';

export default function HomeArtworks() {
  const [params, setParams] = useGetSearchParams();
  const [query, setQuery] = useState(params ? params : { q: "" });
  const { loading, queryData, loadMoreData } = useQuery("home_artworks", `${config.apis.api.url}/search/artwork`, query, {
    injectToken: true,
  });
  const navigateToArtwork = useNavigateToArtwork(`home_artworks`, queryData?.data, `/search/artwork${queryData?.queryString}`);

  function onInput(value) {
    const newQuery = { q: value };
    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  return (
    <>
      <AppNavigationPage>
        <div className="home-artworks__page">
          <HomeHeader 
            onInput={onInput} 
            value={query.q} 
            icon={<ArtworkIcon className="home-artworks__header-icon"/>} 
            text="Artworks" 
            placeholder="Search for artworks..."
          />

          {
            loading ? 
              <SkeletonPage/>
              : queryData.data.data.length === 0 ?
                <Text className="home-artworks__empty-text" paragraph medium>
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
