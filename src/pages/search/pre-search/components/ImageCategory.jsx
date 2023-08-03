import { useNavigate } from 'react-router-dom';

import { NextButton,PrevButton } from '@/shared-components/buttons/components/SliderControls';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import FHSlider from '@/shared-components/sliders/components/FHSlider';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/ImageCategory.css';

function ImageCategoryItem({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="search-image-category-item__container" onClick={()=>navigate(item.category_item_link, { state: { from: true } })}>
        <ArtworkImage 
          image={item.category_item_image} 
          imageClassName="search-image-category-item__image" 
          imageTemplateClassName="search-image-category-item__image"
          forceSmaller={300}
          forceSmallerDimension='height'
        />

        <Text className="search-image-category-item__name" small>
          {item.category_item_name}
        </Text>
      </div>
    </>
  );
}

export default function ImageCategory({ categoryName, data }) {
  return (
    <>
      <div className="search-image-category__container">
        <Heading className="search-image-category__heading" small>
          {categoryName}
        </Heading>

        <FHSlider speed={1.4} className="search-image-category__slider" customPrevButton={<PrevButton/>} customNextButton={<NextButton/>}>
          {data.map(item => <ImageCategoryItem key={item.category_item_name} item={item}/>)}
        </FHSlider>
      </div>
    </>
  );
}
