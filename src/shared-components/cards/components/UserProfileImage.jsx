import config from '@/config';
import ArtistIcon from '@/shared-components/icons/components/user-profile/ArtistIcon';
import GalleryIcon from '@/shared-components/icons/components/user-profile/GalleryIcon';
import UserIcon from '@/shared-components/icons/components/user-profile/UserIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import './styles/UserProfileImage.css';

export default function UserProfileImage({ image, typeOfProfile, loading=false, className, onClick=null, style={} }) {
  if(loading) {
    return (
      <>
        <div className={`user-profile-image-loading-generic${typeOfProfile === "gallery" ? " gallery" : ""} ${className}`} onClick={onClick} style={style}>
          <CustomSpinner className="user-profile-image-loading-generic__spinner" thin/>
        </div>
      </>
    );
  } else if(!image) {
    return (
      <>
        <div className={`user-profile-no-image-generic${typeOfProfile === "gallery" ? " gallery" : ""} ${className}`} onClick={onClick} style={style}>
          {
            typeOfProfile === "gallery" ? 
              <GalleryIcon className="user-profile-no-image-generic__icon"/>
              : typeOfProfile === "artist" ? 
                <ArtistIcon className="user-profile-no-image-generic__icon artist"/>
                : 
                <UserIcon className="user-profile-no-image-generic__icon user"/>
          }
        </div>
      </>
    );
  } else {
    return (
      <>
        <img 
          src={`${config.app.imageServiceDomain}/${image}/w=200`} 
          alt="user profile pic" 
          loading='lazy' 
          className={`user-profile-image-generic${typeOfProfile === "gallery" ? " gallery" : ""} ${className}`} 
          onClick={onClick}
          style={style}
        />
      </>
    );
  }
}
