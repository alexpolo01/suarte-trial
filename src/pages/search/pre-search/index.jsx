import config from '@/config';

import ImageCategory from './components/ImageCategory';
import NonImageCategory from './components/NonImageCategory';
import SearchUsers from './search-users';

import './index.css';

export default function PreSearch() {
  return (
    <>
      <div className="pre-search__container">
        <SearchUsers/>

        <ImageCategory 
          categoryName="Themes" 
          data={config.search.main_search.search_categories.themes}
        />

        <ImageCategory 
          categoryName="Emotions" 
          data={config.search.main_search.search_categories.emotions}
        />

        <ImageCategory 
          categoryName="Colors" 
          data={config.search.main_search.search_categories.colors}
        />

        <NonImageCategory 
          categoryName="Size" 
          data={config.search.main_search.search_categories.size}
        />

        <NonImageCategory 
          categoryName="Price" 
          data={config.search.main_search.search_categories.price}
        />
      </div>
    </>
  );
}
