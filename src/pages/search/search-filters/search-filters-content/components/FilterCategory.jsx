import { useState } from 'react';

import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import QuestionsIcon from '@/shared-components/icons/components/public/QuestionsIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/FilterCategory.css';

export default function FilterCategory({ className="", category, children, hasItems, numberOfItems, isMobile }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`search-filter-category__container element-non-selectable ${className} ${open ? "active" : ""}`}>
        <div className="search-filter-category__header" onClick={()=>setOpen(!open)}>
          <Text className="search-filter-category__header-text" large>
            {category}
                        
            {hasItems && (
              <>
                <div className="search-filter-category__has-items"/>

                <Text className="search-filter-category__number-of-items" extraSmallPlus>
                  {numberOfItems}
                </Text>
              </>
            )}                       
          </Text>

          {
            isMobile ? 
              <ForwardArrowIcon className="search-filter-category__header-mobile-icon"/> 
              : 
              <QuestionsIcon className="search-filter-category__header-icon"/>
          }
        </div>

        {
          isMobile ? 
            <div className="search-filter-category__mobile-content">
              <div className="search-filter-category__mobile-content-header" onClick={()=>setOpen(false)}>
                <BackArrowIcon className="search-filter-category__mobile-content-back-button"/>

                <Text className="search-filter-category__mobile-content-header-text" large>
                  {category}
                </Text>
              </div>

              <div className="search-filter-category__mobile-content-content">
                {children}
              </div>
            </div>
            :
            <div className="search-filter-category__content">
              {children}
            </div>
        }
      </div>
    </>
  );
}
