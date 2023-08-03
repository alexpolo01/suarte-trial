import { useRef } from 'react';

import useNavigateWithTransition from '@/hooks/useNavigateWithTransition';
import ArtlistImage from '@/shared-components/cards/components/ArtlistImage';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtlistCard.css';

export default function ArtlistCard({ data, style={}, infiniteScrollObserver }) {
  const navigateWithTransition = useNavigateWithTransition();
  const imageWrapperRef = useRef(null);

  return (
    <>
      <div 
        className="artlist-card__container"
        style={style} 
        ref={infiniteScrollObserver} 
        onClick={() => {
          imageWrapperRef.current.style.viewTransitionName = `artlist_${data._id}_animation`;
          navigateWithTransition(`/artlist/${data._id}`, { state: { from: true } });
        }}
      >
        <div className="artist-card__artlist-image-wrapper" ref={imageWrapperRef}>
          <ArtlistImage className="artlist-card__artlist-image" image={data.artlist_image?.image_id} />
        </div>

        <div className="artlist-card__info-container">
          <div className="artlist-card__info-text">
            <Text className="artlist-card__artlist-name" paragraph small>
              {data.artlist_title}
            </Text>

            <Text className="artlist-card__artlist-by" paragraph extraSmall>
                            by{" "}
                            
              <span>
                {data.artlist_creator.user_username}
              </span>
            </Text>
          </div>

          <div className="artlist-card__stats-container">
            <Text className="artlist-card__stats-artworks-count" small>
              {data.artlist_artworks.length}
            </Text>
                        
            <ArtworkIcon className="artlist-card__stats-artwork-icon"/>
          </div>
        </div>
      </div>
    </>
  );
}
