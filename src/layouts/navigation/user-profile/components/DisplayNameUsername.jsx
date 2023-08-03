import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/DisplayNameUsername.css';

export default function DisplayNameUsername({ fetchData }) {
  if(fetchData.user_type === "gallery" || fetchData.user_type === "artist") {
    return (
      <>
        <Text className="profile-info__user_name dots-on-overflow" large paragraph>
          {fetchData.user_name}
          {(fetchData.user_type === "artist" && fetchData.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="profile-info__artist-verified-icon"/>}
        </Text>

        <Text className="profile-info__user_username-small" small paragraph>
                    @{fetchData.user_username}
        </Text>
      </>
    );
  } else {
    return (
      <Text className="profile-info__user_username" large paragraph>
        {fetchData.user_username}
      </Text>
    );
  }
}
