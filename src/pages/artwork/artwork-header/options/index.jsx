import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useProtectAction from '@/hooks/useProtectAction';
import useStateHandler from '@/hooks/useStateHandler';
// import ArtworkInsightsIcon from '@/shared-components/icons/components/gallery-options/ArtworkInsightsIcon';
import AddArtworkToArtlist2Icon from '@/shared-components/icons/components/actions/AddArtworkToArtlist2Icon';
import ShareProfileIcon from '@/shared-components/icons/components/actions/ShareProfileIcon';
import ThreeDotsIcon from '@/shared-components/icons/components/public/ThreeDotsIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import EditCardIcon from '@/shared-components/icons/components/settings/EditCardIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';

import OptionItem from './components/OptionItem';
import SaveArtwork from './components/SaveArtwork';
import AddToArtlist from './add-to-artlist';

import './index.css';

export default function Options({ open, close }) {
  const { artworkData } = useContext(ArtworkDataContext);
  const { state } = useStateHandler();
  const [openAddToArtlist, setOpenAddToArtlist] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  const navigate = useNavigate();

  function shareArtwork() {
    navigator.share({
      title: `${artworkData.artwork_about.artwork_title}`,
      text: `Take a look at ${artworkData.artwork_about.artwork_title}:`,
      url: `https://suarte.art/artwork/${artworkData._id}`
    });
  }

  function handleEditArtwork() {
    if(artworkData.artwork_status === "original_sold" || artworkData.artwork_status === "sold") {
      setOpenEditDialog(true);
    } else {
      navigate("/profile/edit-artwork", { state: { from: true, artworkData } });
    }
  }

  function isArtworkGallery() {
    return state.user_session?._id === artworkData.artwork_about.artwork_gallery._id;
  }

  // function isArtworkArtist() {
  //   if(artworkData.artwork_about.artwork_artist) {
  //     return state.user_session?._id === artworkData.artwork_about.artwork_artist._id;
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <>
      <GenericPopup 
        open={open} 
        className="artwork-options__container" 
        animation={false} 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
        onClick={close}
      >
        <div className="artwork-options__background"/>

        <div className="artwork-options__wrapper element-non-selectable">
          <div className="artwork-options__options-container">
            <ThreeDotsIcon className="artwork-options__fake-dots"/>

            <div className="artwork-options__options">
              {(isArtworkGallery() && artworkData.artwork_status !== "unavailable") && (
                <OptionItem 
                  text="Edit artwork" 
                  icon={<EditCardIcon className="card-icon"/>}
                  onClick={handleEditArtwork}
                />
              )}

              {/* {(isOwner() || isArtist()) && (
                                <OptionItem 
                                    text="View insights" 
                                    icon={<ArtworkInsightsIcon className="insights-icon"/>} 
                                    onClick={()=>navigate("/aqui_va_el_artwork_insights", {state: {from: true}})}
                                />
                            )} */}

              <OptionItem 
                text="Add to artlist" 
                icon={<AddArtworkToArtlist2Icon className="add-icon"/>} 
                onClick={()=>privateActionHandler(()=>setOpenAddToArtlist(true))}
              />

              <SaveArtwork/>

              {navigator.share && (
                <OptionItem 
                  text="Share" 
                  icon={<ShareProfileIcon className="share-icon"/>} 
                  onClick={shareArtwork}
                />
              )}
            </div>
          </div>
        </div>
      </GenericPopup>

      <AddToArtlist open={openAddToArtlist} close={()=>setOpenAddToArtlist(false)}/>

      <GenericPopup
        open={openEditDialog}
        className="artwork-options__edit-dialog"
        opacity
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
      >
        <div className="generic-popup-header">
          <span className="generic-popup-header-text mt-m">
                        The work cannot be edited
          </span>

          <XIcon className="generic-popup-close" onClick={()=>setOpenEditDialog(false)}/>
        </div>

        <p className="artwork-options__edit-dialog-text mt-s">
                    Since this artwork has already been sold, making changes is no longer possible. 
                    If you believe that further modifications are necessary, please feel free to 
                    reach out to us via email at {" "}
          <a href="mailto: contact@suarte.art">contact@suarte.art</a>. We appreciate
                    your cooperation.
        </p>
      </GenericPopup>
    </>
  );

}
