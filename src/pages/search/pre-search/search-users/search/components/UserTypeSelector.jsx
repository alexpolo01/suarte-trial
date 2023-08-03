import SettingsGalleryIcon from '@/shared-components/icons/components/settings/SettingsGalleryIcon';
import ArtistIcon from '@/shared-components/icons/components/user-profile/ArtistIcon';
import UserIcon from '@/shared-components/icons/components/user-profile/UserIcon';

import './styles/UserTypeSelector.css';

export default function UserTypeSelector({ query, setQuery }) {
  function selectUserType(user_type) {
    if(query.user_type !== user_type) {
      setQuery({ ...query, user_type: user_type });
    }
  }

  return (
    <>
      <div className="user-type-selector__container">
        <div className={`user-type-selector__option ${query.user_type === "collector" ? "active" : ""}`} onClick={()=>selectUserType("collector")}>
          <UserIcon className="user-type-selector__user-icon"/>
        </div>

        <div className={`user-type-selector__option ${query.user_type === "artist" ? "active" : ""}`} onClick={()=>selectUserType("artist")}>
          <ArtistIcon className="user-type-selector__artist-icon"/>
        </div>

        <div className={`user-type-selector__option ${query.user_type === "gallery" ? "active" : ""}`} onClick={()=>selectUserType("gallery")}>
          <SettingsGalleryIcon className="user-type-selector__gallery-icon"/>
        </div>
      </div>

      <div className={`user-type-selector-active-bar ${query.user_type === "collector" ? "collector" : query.user_type === "artist" ? "artist" : "gallery"}`}/>
    </>
  );
}
