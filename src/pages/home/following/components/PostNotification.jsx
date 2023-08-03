import LikeButton from '@/shared-components/buttons/components/LikeButton';
import PostCard from '@/shared-components/cards/components/PostCard';
import ViewsIcon from '@/shared-components/icons/components/user-profile/ViewsIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import NotificationsHeader from './NotificationsHeader';

import './styles/PostNotification.css';

export default function PostNotification({ data }) {
  return (
    <>
      <div className="home-post-notification__container">
        <NotificationsHeader 
          user={data.notification_user} 
          primaryText="posted: " 
          secondaryText={data.data.post_heading}
        />

        <div className="home-post-notification__content-container">
          <PostCard data={data.data} ignoreViews/>
        </div>

        <div className="home-post-notification__stats-container">
          <Text className="home-post-notification__stats dots-on-overflow" small>
            {Utils.getDateInStringFromTimestamp(data.data.post_created_at)}

            <div className="home-post-notification__stat-separator"/>

            <span className="home-post-notification__views">
              {Utils.numberParserMillionThousand(data.data.post_views)}
            </span>

            <ViewsIcon className="home-post-notification__views-icon"/>
          </Text>
                  
          <LikeButton 
            itemId={data.data._id}
            typeOfItem="POST"
            isLiked={data.data.is_liked} 
            className="home-post-notification__like-button" 
          />
        </div>

        <Text className="home-post-notification__main-text" paragraph justify medium>
          {data.data.post_main_text}
        </Text>
      </div>
    </>
  );
}
