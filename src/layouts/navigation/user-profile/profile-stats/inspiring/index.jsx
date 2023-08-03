import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import Search from './search';

import './index.css';

function DisplayNameUsername({ fetchData }) {
  if(fetchData.user_type === "gallery" || fetchData.user_type === "artist") {
    return (
      <>
        <Text className="search-inspiring__user_name dots-on-overflow" medium paragraph>
          {fetchData.user_name}
          {fetchData.user_type === "artist" && fetchData.user_flags.suarteroad_completed ? <ArtistVerifiedIcon className="search-inspiring__artist-verified-icon"/> : <></>}
        </Text>

        <Text className="search-inspiring__user_username-small dots-on-overflow" small paragraph>
                    @{fetchData.user_username}
        </Text>
      </>
    );
  } else {
    return (
      <Text className="search-inspiring__user_username dots-on-overflow" medium paragraph>
        {fetchData.user_username}
      </Text>
    );
  }
}

export default function Inspiring({ open, close, fetchData, numberOfInspiring }) {
  return (
    <>
      <GenericPopup open={open} className="search-inspiring__popup remove-scrollbar" opacity>
        <XIcon className="search-inspiring__popup-close-icon-x" onClick={close}/>
        <BackArrowIcon className="search-inspiring__popup-close-icon-back" onClick={close}/>
        <DisplayNameUsername fetchData={fetchData}/>

        <Text className="search-inspiring__popup-number-of-inspiring dots-on-overflow" extraSmall paragraph>
          {numberOfInspiring} inspiring
        </Text>

        <Search userId={fetchData._id}/>
      </GenericPopup>
    </>
  );
}
