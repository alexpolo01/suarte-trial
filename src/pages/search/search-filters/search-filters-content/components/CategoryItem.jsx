import Text from '@/shared-components/text/components/Text';

import './styles/CategoryItem.css';

export default function CategoryItem({ displayText, isSelected, selectItem, removeItem }) {
  return (
    <>
      <div className="search-filters-category-item__container" onClick={isSelected ? removeItem : selectItem}>
        <div className={`search-filters-category-item__select-display ${isSelected ? "active" : ""}`}/>
                
        <Text className="search-filters-category-item__display-text dots-on-overflow" small>
          {displayText}
        </Text>
      </div>
    </>
  );
}
