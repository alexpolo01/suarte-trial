import { useContext } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ArtlistImage from '@/shared-components/cards/components/ArtlistImage';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtlistItem.css';

export default function ArtlistItem({ artlistData, close }) {
  const { stateHandler, cacheHandler } = useStateHandler();
  const { artworkData } = useContext(ArtworkDataContext);

  function addArtworkToArtlist() {
    UserService.addArtworkToArtlist(artworkData, artlistData._id);
    cacheHandler.triggerAction("ADD_TO_ARTLIST_FROM_ARTWORK");
    stateHandler.set("temporalPopup", {
      text: `${artworkData.artwork_about.artwork_title} added to ${artlistData.artlist_title}`, 
      type: "no-navigation"
    });
    close();
  }

  return (
    <>
      <div className="add-to-artlist-artlist-item__container" onClick={addArtworkToArtlist}>
        <ArtlistImage className="add-to-artlist-artlist-item__image" image={artlistData.artlist_image?.image_id}/>

        <Text className="add-to-artlist-artlist-item__title dots-on-overflow" medium paragraph>
          {artlistData.artlist_title}
        </Text>

        <Text className="add-to-artlist-artlist-item__count" small>
          {artlistData.artlist_artworks.length}
        </Text>

        <ArtworkIcon className="add-to-artlist-artlist-item__count-icon"/>
      </div>
    </>
  );
}
