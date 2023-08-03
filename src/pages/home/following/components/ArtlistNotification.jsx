import ArtlistImage from '@/shared-components/cards/components/ArtlistImage';

import NotificationsHeader from './NotificationsHeader';

import './styles/ArtlistNotification.css';

export default function ArtlistNotification({ data }) {
  return (
    <>
      <div className="home-artlist-notification__container">
        <NotificationsHeader user={data.notification_user} primaryText="created a new artlist: " secondaryText={data.data.artlist_name}/>
        <ArtlistImage image={data.data.artlist_cover} className="home-artlist-notification__image"/>
      </div>
    </>
  );
}
