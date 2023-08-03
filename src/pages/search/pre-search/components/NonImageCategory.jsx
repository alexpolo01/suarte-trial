import { useNavigate } from 'react-router-dom';

import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/NonImageCategory.css';

function NonImageCategoryItem({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="search-non-image-category-item__container" onClick={()=>navigate(item.category_item_link, { state: { from: true } })}>
        <Text className="search-non-image-category-item__name" small>{item.category_item_name}</Text>
      </div>
    </>
  );
}

export default function NonImageCategory({ categoryName, data }) {
  return (
    <>
      <div className="search-non-image-category__container">
        <Heading className="search-non-image-category__heading" small>{categoryName}</Heading>
        <div className="search-non-image-category__categories remove-scrollbar">
          {data.map(item => <NonImageCategoryItem key={item.category_item_name} item={item}/>)}
        </div>
      </div>
    </>
  );
}
