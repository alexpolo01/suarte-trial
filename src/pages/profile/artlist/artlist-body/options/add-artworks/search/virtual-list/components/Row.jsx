import { useContext,useState } from 'react';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import AddIcon from '@/shared-components/icons/components/actions/AddIcon';
import PublicSuccessCheck from '@/shared-components/icons/components/public/PublicSuccessCheck';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import './styles/Row.css';

export default function Row({ artwork, isInArtlist }) {
  const { artlistData, setArtlistData } = useContext(ArtlistDataContext);
  const { stateHandler, cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);

  async function addArtworkToArtlist() {
    setLoading(true);

    const { response, data } = await UserService.addArtworkToArtlist(artwork, artlistData._id);

    if(response.ok) {
      setLoading(false);
      setArtlistData(prevValue => ({
        ...data,
        artlist_artworks: [
          ...prevValue.artlist_artworks,
          artwork
        ]
      }));
      stateHandler.set("temporalPopup", {
        text: `${artwork.artwork_about.artwork_title} added to artlist`, 
        type: "no-navigation"
      });
      cacheHandler.triggerAction("ADD_TO_ARTLIST");
    } else if(data.error_type === "MAX_ARTLIST_ARTWORKS") {
      alert("You've reached the limit of artworks in a single artlist.");
      setLoading(false);
    }
  }

  async function removeArtworkFromArtlist() {
    setLoading(true);

    const { response, data } = await UserService.removeArtworkFromArtlist(artwork, artlistData._id);

    if(response.ok) {
      setLoading(false);
      setArtlistData(prevValue => ({
        ...data,
        artlist_artworks: prevValue.artlist_artworks.filter(artlistArtwork => artlistArtwork._id !== artwork._id)
      }));
      stateHandler.set("temporalPopup", {
        text: `${artwork.artwork_about.artwork_title} removed from artlist`, 
        type: "no-navigation"
      });
      cacheHandler.triggerAction("REMOVE_FROM_ARTLIST");
    }
  }

  return (
    <>
      <div className={`artlist-add-artworks__artwork-result element-non-selectable ${isInArtlist ? "active" : ""}`}>
        <div className="artlist-add-artworks__artwork-info">
          <ArtworkImage 
            image={artwork.artwork_media.artwork_main_picture.image_id} 
            imageClassName="artlist-add-artwork__artwork-image" 
            imageTemplateClassName="artlist-add-artwork__artwork-image"
          />

          <div className="artlist-add-artworks__artwork-text-container">
            <Text className="artlist-add-artworks__artwork-title" paragraph medium>
              {artwork.artwork_about.artwork_title}
            </Text>

            <Text className="artlist-add-artworks__artwork-artist" paragraph extraSmall>
                            by{" "}
                            
              {
                artwork.artwork_about.artwork_artist ?
                  artwork.artwork_about.artwork_artist.user_name
                  :
                  artwork.artwork_about.artwork_gallery_artist.artist_name
              }
            </Text>
          </div>
        </div>

        {
          loading ? 
            <CustomSpinner className="artlist-add-artworks__action-spinner" thin/>
            : isInArtlist ? 
              <PublicSuccessCheck className="artlist-add-artworks__artwork-added" onClick={removeArtworkFromArtlist}/> 
              : 
              <AddIcon className="artlist-add-artworks__artwork-add" onClick={addArtworkToArtlist}/>
        }
      </div>
    </>
  );
}
