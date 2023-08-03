import { useContext, useState } from 'react';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import LikeButton from '@/shared-components/buttons/components/LikeButton';
import PlayArtlistButton from '@/shared-components/buttons/components/PlayArtlistButton';
import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import AddArtworkToArtlistIcon from '@/shared-components/icons/components/actions/AddArtworkToArtlistIcon';
import EditArtlistIcon from '@/shared-components/icons/components/actions/EditArtlistIcon';
import ShareProfileIcon from '@/shared-components/icons/components/actions/ShareProfileIcon';
import ThreeDotsIcon from '@/shared-components/icons/components/public/ThreeDotsIcon';

import ArtlistOption from './components/ArtlistOption';
import DeleteArtlist from './components/DeleteArtlist';
import AddArtworks from './add-artworks';
import EditArtlist from './edit-artlist';
import TimeSelector from './time-selector';

import './index.css';

export default function Options({ openAddArtworks, setOpenAddArtworks }) {
  const { artlistData, setArtlistData, isCreator } = useContext(ArtlistDataContext);
  const [openOptions, setOpenOptions] = useState(false);
  const [openTimeSelector, setOpenTimeSelector] = useState(false);
  const [openDeleteArtlist, setOpenDeleteArtlist] = useState(false);
  const [openEditArtlist, setOpenEditArtlist] = useState(false);

  function shareArtlist() {
    navigator.share({
      title: `${artlistData.artlist_title}`,
      text: `Take a look at @${artlistData.artlist_creator.user_username}'s artlist: ${artlistData.artlist_title}`,
      url: `https://suarte.art/artlist/${artlistData._id}`
    });
  }

  return (
    <>
      <div className="artlist-options__container">
        {artlistData.artlist_artworks.length > 0 && (
          <PlayArtlistButton 
            className="artlist-options__artlist-play" 
            onClick={()=>setOpenTimeSelector(true)}
          />
        )}

        <LikeButton 
          itemId={artlistData._id}
          typeOfItem="ARTLIST"
          isLiked={artlistData.is_liked} 
          className="artlist-options__artlist-like" 
          onLikeAction={(likeStatus) => (
            setArtlistData({
              ...artlistData,
              artlist_likes: likeStatus ? artlistData.artlist_likes + 1 : artlistData.artlist_likes - 1
            })
          )}
        />

        {
          isCreator ?
            <div 
              tabIndex={0} 
              onClick={()=>setOpenOptions(!openOptions)} 
              onBlur={()=>setOpenOptions(false)} 
              className="artlist-options__threedots-container"
            >
              <ThreeDotsIcon className="artlist-options__threedots-icon"/>

              <div className={`artlist-options__options element-non-selectable ${openOptions ? "active" : ""}`}>
                <ArtlistOption
                  text="Add artworks"
                  icon={<AddArtworkToArtlistIcon className="artlist-options__option-icon"/>}
                  onClick={()=>setOpenAddArtworks(true)}
                />

                <ArtlistOption
                  text="Edit artlist"
                  icon={<EditArtlistIcon className="artlist-options__option-icon edit"/>}
                  onClick={()=>setOpenEditArtlist(true)}
                />

                <ArtlistOption
                  text="Delete artlist"
                  icon={<RemoveButton className="artlist-options__option-icon"/>}
                  onClick={()=>setOpenDeleteArtlist(true)}
                />

                {navigator.share && (
                  <ArtlistOption
                    text="Share artlist"
                    icon={<ShareProfileIcon className="artlist-options__option-icon"/>}
                    onClick={shareArtlist}
                  />
                )}
              </div>
            </div>
            :
            navigator.share && (
              <ShareProfileIcon 
                className="artlist-options__share-artlist"
                onClick={shareArtlist}
              />
            )
        }
      </div>

      <TimeSelector 
        open={openTimeSelector} 
        close={()=>setOpenTimeSelector(false)}
      />

      <AddArtworks 
        open={openAddArtworks} 
        close={()=>setOpenAddArtworks(false)}
      />

      <EditArtlist 
        open={openEditArtlist} 
        close={()=>setOpenEditArtlist(false)}
      />

      <DeleteArtlist
        open={openDeleteArtlist} 
        close={()=>setOpenDeleteArtlist(false)}
      />
    </>
  );
}
