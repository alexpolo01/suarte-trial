import { Helmet } from 'react-helmet';

import config from '@/config';
import searchConfig from '@/config/search.config';
import useNavigateToArtwork from '@/hooks/useNavigateToArtwork';
import useQuery from '@/hooks/useQuery';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import SearchSkeleton from './components/SearchSkeleton';
import SearchVirtualList from './components/SearchVirtualList';

import './index.css';

export default function SearchResults({ query }) {
  const { loading, queryData, loadMoreData } = useQuery("main_search", `${config.apis.api.url}/search/artwork`, query, {
    injectToken: true,
    customKeyGetter: {
      artist: (currentValue) => currentValue.map(item => item._id),
      gallery: (currentValue) => currentValue.map(item => item._id),
      price: (currentValue) => currentValue ? [currentValue.minPrice, currentValue.maxPrice === 50000 ? Number.MAX_SAFE_INTEGER : currentValue.maxPrice] : null,
    }
  });
  const navigateToArtwork = useNavigateToArtwork(`main_search`, queryData?.data, `/search/artwork${queryData?.queryString}`);

  console.log("query:", query, "searchConfig.search:", searchConfig.search.main_search.search_categories);

let categoryData;
if (query.category && searchConfig.search.main_search.search_categories[query.category]) {
  categoryData = searchConfig.search.main_search.search_categories[query.category].find(item => item.category_item_name === query.q);
}

  console.log(categoryData);
  
  if(loading) {
    return (
      <SearchSkeleton/>
    );
  } else {
    return (
      <>
        <Helmet> 
          <title>{categoryData?.title || 'Search - Suarte'}</title>
          <meta name="description" content={categoryData?.metaDescription || 'Explore artworks on Suarte.'} />
        </Helmet>
      
        <Text className="search-results__results-count" medium>
          {Utils.numberWithCommas(queryData.data.totalDocs)} 

          {" "}results{" "} 

          {query.q && (
            <span>
                            for "<span className="search-results__results-count-query">{query.q}</span>"
            </span>
          )}
        </Text>
    
        {
          queryData.data.data.length === 0 ? 
            <Text className="search-results__no-results" small>
                            We're sorry, but we couldn't find any artworks that match your search query. 
                            Please try again with different keywords or filters.
            </Text>
            :
            <SearchVirtualList 
              key={queryData.queryString} 
              items={queryData.data} 
              onLoadMore={loadMoreData}
              navigateToArtwork={navigateToArtwork}
            />
        }
      </>
    );
  }
}