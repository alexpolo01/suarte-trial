import LocationIcon from '@/shared-components/icons/components/user-profile/LocationIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/DisplayLocation.css';

export default function DisplayLocation({ userLocation }) {
  if(!userLocation) {
    return <></>;
  }

  return (
    <>
      <div className="profile-info__display-location-container element-non-selectable">
        <a 
          href={`https://maps.google.com/?q=${userLocation}`} 
          className="profile-info__display-location-link" 
          aria-label="User location" 
          target="_blank" 
          rel="noreferrer"
        >
          <LocationIcon className="profile-info__display-location-icon"/>

          <Text className="profile-info__display-location-text" medium paragraph>
            {userLocation}
          </Text>
        </a>
      </div>
    </>
  );
}
