import { useContext,useState } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useProtectAction from '@/hooks/useProtectAction';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import SavedArtworksIcon from '@/shared-components/icons/components/navigation/SavedArtworksIcon';

import OptionItem from './OptionItem';

export default function SaveArtwork() {
  const { artworkData, socialsData, setSocialsData } = useContext(ArtworkDataContext);
  const { stateHandler, cacheHandler } = useStateHandler();
  const [saveStatus, setSaveStatus] = useState(initSaveStatus());
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });

  function initSaveStatus() {
    const cachedAction = cacheHandler.getCacheValue(`user_actions.saved_artworks.${artworkData._id}`);
    return cachedAction ? cachedAction.data : socialsData ? socialsData.save_artwork : false; 
  }

  function saveArtwork() {
    UserService.saveItem("artwork", artworkData._id);
    setSaveStatus(true);

    if(socialsData) {
      setSocialsData({
        ...socialsData,
        save_artwork: true
      });
    }

    stateHandler.set("temporalPopup", { text: `${artworkData.artwork_about.artwork_title} saved successfully`, type: "no-navigation" });
    cacheHandler.storeInCache(`user_actions.saved_artworks.${artworkData._id}`, true, { type: "@cache/no-expiration" });
    cacheHandler.triggerAction("SAVE_ARTWORK");
  }

  function unSaveArtwork() {
    UserService.unsaveItem("artwork", artworkData._id);
    setSaveStatus(false);

    if(socialsData) {
      setSocialsData({
        ...socialsData,
        save_artwork: false
      });
    }
        
    stateHandler.set("temporalPopup", { text: `${artworkData.artwork_about.artwork_title} removed from saved artworks`, type: "no-navigation" });
    cacheHandler.storeInCache(`user_actions.saved_artworks.${artworkData._id}`, false, { type: "@cache/no-expiration" });
    cacheHandler.triggerAction("SAVE_ARTWORK");
  }

  if(saveStatus) {
    return (
      <OptionItem 
        text="Saved" 
        icon={<SavedArtworksIcon className="save-icon fill"/>} 
        onClick={()=>privateActionHandler(unSaveArtwork)}
      />
    );
  } else {
    return (
      <OptionItem 
        text="Save artwork" 
        icon={<SavedArtworksIcon className="save-icon"/>} 
        onClick={()=>privateActionHandler(saveArtwork)}
      />
    );
  }
}
