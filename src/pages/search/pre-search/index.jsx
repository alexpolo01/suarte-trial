import searchConfig from '@/config/search.config';

import ImageCategory from './components/ImageCategory';
import NonImageCategory from './components/NonImageCategory';
import SearchUsers from './search-users';

import './index.css';

export default function PreSearch() {
  const themes = searchConfig.search.main_search.search_categories.themes; // Corrected to use 'searchConfig'
  const emotions = searchConfig.search.main_search.search_categories.emotions; // Corrected to use 'searchConfig'
  const colors = searchConfig.search.main_search.search_categories.colors; // Corrected to use 'searchConfig'
  const size = searchConfig.search.main_search.search_categories.size; // Corrected to use 'searchConfig'
  const price = searchConfig.search.main_search.search_categories.price; // Corrected to use 'searchConfig'

  return (
    <>
      <div className="pre-search__container">
        <SearchUsers />

        <ImageCategory
          categoryName="Themes"
          data={themes.map((item) => ({
            ...item,
            title: item.title,
            metaDescription: item.metaDescription,
          }))}
        />

        <ImageCategory
          categoryName="Emotions"
          data={emotions.map((item) => ({
            ...item,
            title: item.title,
            metaDescription: item.metaDescription,
          }))}
        />

        <ImageCategory
          categoryName="Colors"
          data={colors.map((item) => ({
            ...item,
            title: item.title,
            metaDescription: item.metaDescription,
          }))}
        />

        <NonImageCategory
          categoryName="Size"
          data={size.map((item) => ({
            ...item,
            title: item.title,
            metaDescription: item.metaDescription,
          }))}
        />

        <NonImageCategory
          categoryName="Price"
          data={price.map((item) => ({
            ...item,
            title: item.title,
            metaDescription: item.metaDescription,
          }))}
        />
      </div>
    </>
  );
}