import BuyLimitedEditionButton from '@/shared-components/artwork/buy-limited-edition';
import BuyOriginalButton from '@/shared-components/artwork/buy-original';
import ArtworkLabel from '@/shared-components/artwork/components/ArtworkLabel';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';

import NotificationsHeader from './NotificationsHeader';

import './styles/ArtworkNotification.css';

export default function ArtworkNotification({ data }) {
  function getPrimaryText() {
    switch(data.notification_type) {
    case "artwork": return data.notification_user.user_type === "artist" ? "has a new artwork: " : "added a new artwork: ";
    case "collection": return "added a new artwork to the collection";
    case "limited_edition": return "added a limited edition to the collection";
    default: return "";
    }
  }

  return (
    <>
      <div className="home-artwork-notification__container">
        <NotificationsHeader 
          user={data.notification_user} primaryText={getPrimaryText()} 
          secondaryText={
            data.notification_type==="artwork" ? 
              data.data.artwork_title 
              : 
              ""
          }
        />

        <ArtworkImage 
          image={data.data.artwork_image.file_hash} 
          style={{ aspectRatio: data.data.artwork_image.image_aspect_ratio }} 
          imageClassName="home-artwork-notification__image" 
          imageTemplateClassName="home-artwork-notification__image"
        />

        <ArtworkLabel 
          artworkData={data.data} 
          onClickThought={()=>alert("//TODO")} 
          onClickRating={()=>alert("//TODO")}
          onClickLike={()=>alert("//TODO")}
        />

        <div className="home-artwork-notification__buy-section">
          <BuyOriginalButton artworkData={data.data}/>
          <BuyLimitedEditionButton artworkData={data.data}/>
        </div>
      </div>
    </>
  );
}
