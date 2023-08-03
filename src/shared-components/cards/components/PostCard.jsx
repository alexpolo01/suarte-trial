import { useRef } from 'react';

import config from '@/config';
import useNavigateWithTransition from '@/hooks/useNavigateWithTransition';
import ViewsIcon from '@/shared-components/icons/components/user-profile/ViewsIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/PostCard.css';

export default function PostCard({ data, style={}, infiniteScrollObserver, ignoreViews=false }) {
  const navigateWithTransition = useNavigateWithTransition();
  const imageWrapperRef = useRef(null);

  return (
    <>
      <div 
        className="post-card__container" 
        style={style} 
        ref={infiniteScrollObserver}
        onClick={() => {
          imageWrapperRef.current.style.viewTransitionName = `post_${data._id}_animation_cover`;
          navigateWithTransition(`/post/${data._id}`, { state: { from: true } });
        }}
      >
        <img 
          className="post-card__cover"
          src={`${config.app.imageServiceDomain}/${data.post_container.post_cover.image_id}/w=300`} 
          alt="Post cover"
          ref={imageWrapperRef}
        />

        <div className="post-card__backdrop">
          <div className="post-card__content">
            {!ignoreViews && (
              <Text className="post-card__views" paragraph medium>
                {Utils.numberParserMillionThousand(data.post_visits)}{" "}
                <ViewsIcon className="post-card__views-icon"/>
              </Text>
            )}

            <p className="post-card__post-heading">
              {data.post_container.post_title}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
