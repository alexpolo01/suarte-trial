import Artist from './components/Artist';
import Color from './components/Color';
import Emotion from './components/Emotion';
import FilterCategory from './components/FilterCategory';
import Gallery from './components/Gallery';
import Medium from './components/Medium';
import Price from './components/Price';
import Size from './components/Size';
import Theme from './components/Theme';

import './index.css';

export default function SearchFiltersContent({ query, setQuery, isMobile=false }) {
  return (
    <>
      <div className="search-filters-content">
        <FilterCategory 
          className="default-height-animation" 
          category="Artist" 
          hasItems={query.artist && query.artist.length > 0} 
          numberOfItems={query.artist?.length} isMobile={isMobile}
        >
          <Artist query={query} setQuery={setQuery}/>
        </FilterCategory>

        <FilterCategory 
          className="default-height-animation" 
          category="Gallery" 
          hasItems={query.gallery && query.gallery.length > 0} 
          numberOfItems={query.gallery?.length} 
          isMobile={isMobile}
        >
          <Gallery query={query} setQuery={setQuery}/>
        </FilterCategory>

        <Price 
          query={query} 
          setQuery={setQuery} 
          isMobile={isMobile}
        />

        <Size 
          query={query} 
          setQuery={setQuery} 
          isMobile={isMobile}
        />

        <FilterCategory 
          className="default-height-animation" 
          category="Theme" 
          hasItems={query.theme && query.theme.length > 0} 
          numberOfItems={query.theme?.length} 
          isMobile={isMobile}
        >
          <Theme query={query} setQuery={setQuery}/>
        </FilterCategory>

        <FilterCategory 
          className="default-height-animation" 
          category="Emotion" 
          hasItems={query.emotion && query.emotion.length > 0} 
          numberOfItems={query.emotion?.length} 
          isMobile={isMobile}
        >
          <Emotion query={query} setQuery={setQuery}/>
        </FilterCategory>

        <FilterCategory 
          className="default-height-animation" 
          category="Medium" 
          hasItems={query.medium && query.medium.length > 0} 
          numberOfItems={query.medium?.length} 
          isMobile={isMobile}
        >
          <Medium query={query} setQuery={setQuery}/>
        </FilterCategory>

        <FilterCategory 
          className="default-height-animation" 
          category="Color" 
          hasItems={query.color && query.color.length > 0} 
          numberOfItems={query.color?.length} 
          isMobile={isMobile}
        >
          <Color query={query} setQuery={setQuery}/>
        </FilterCategory>
      </div>
    </>
  );
}
