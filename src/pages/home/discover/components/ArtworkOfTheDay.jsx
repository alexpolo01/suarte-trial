import { useNavigate } from 'react-router-dom';

import useScreenSize from '@/hooks/useScreenSize';
import BuyOriginalButton from '@/shared-components/artwork/buy-original';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import HomeSlider from './HomeSlider';

import './styles/ArtworkOfTheDay.css';

export default function ArtworkOfTheDay({ collectionData }) {
  const mainArtwork = collectionData.collection_artworks[0];
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  return (
    <>
      <div className="home-artwork-of-the-day__container">
        <HomeSlider 
          artworks={screenSize.width <= 550 ? [] : collectionData.collection_artworks.slice(1)} 
          category={collectionData.collection_name}
          alternativeArtworks={collectionData.collection_artworks}
          endpoint={`/category/${collectionData.collection_id}?`} 
          total={collectionData.total - 1}
          link={collectionData.collection_url} 
          hideText
        >
          <div className="artwork-of-the-day-card__container" onClick={()=>navigate(`/artwork/${mainArtwork._id}`, { state: { from: true } })}>
            <ArtworkImage 
              image={mainArtwork.artwork_media.artwork_main_picture.image_id} 
              imageClassName="artwork-of-the-day-card__image" 
              imageTemplateClassName="artwork-of-the-day-card__image template"
            />

            <div className="artwork-of-the-day-card__info">
              <div className="artwork-of-the-day-card__info-inner">
                <Text className="artwork-of-the-day-card__date" medium>
                  {Utils.getDateInStringFromTimestamp(mainArtwork.metadata.day)}
                </Text>
                                
                <Text className="artwork-of-the-day-card__artist-name dots-on-overflow" medium>
                  {
                    mainArtwork.artwork_about.artwork_artist ?
                      <>
                        {mainArtwork.artwork_about.artwork_artist.user_name}
                        {mainArtwork.artwork_about.artwork_artist.user_flags.suarteroad_completed && <ArtistVerifiedIcon className="artwork-of-the-day-card__artist-verified"/>}
                      </>
                      :
                      mainArtwork.artwork_about.artwork_gallery_artist.artist_name
                  }
                </Text>
                                
                <Text className="artwork-of-the-dar-card__detail dots-on-overflow" small>
                  {mainArtwork.artwork_about.artwork_gallery_artist.artist_nationality},{" "} 
                  {mainArtwork.artwork_about.artwork_gallery_artist.artist_birth}
                  {Boolean(mainArtwork.artwork_about.artwork_gallery_artist.artist_death) && `-${mainArtwork.artwork_about.artwork_gallery_artist.artist_death}`}
                </Text>

                <Text className="artwork-of-the-dar-card__title dots-on-overflow" large>
                  {mainArtwork.artwork_about.artwork_title}
                </Text>

                <Text className="artwork-of-the-dar-card__detail dots-on-overflow" small>
                  {mainArtwork.artwork_about.artwork_medium}
                </Text>

                <Text className="artwork-of-the-dar-card__detail dots-on-overflow" small>
                  {mainArtwork.artwork_about.artwork_size.length}{" "} 
                  {mainArtwork.artwork_about.artwork_size.unit} x{" "}
                  {mainArtwork.artwork_about.artwork_size.height}{" "} 
                  {mainArtwork.artwork_about.artwork_size.unit}
                </Text>

                <Text className="artwork-of-the-dar-card__detail dots-on-overflow" small>
                  {mainArtwork.artwork_about.artwork_year}
                </Text>

                <BuyOriginalButton artworkData={mainArtwork}/>
              </div>

              <div className="artwork-of-the-day-card__alternative-buy-button">
                <BuyOriginalButton artworkData={mainArtwork}/>
              </div>
            </div>
          </div>
        </HomeSlider>
      </div>
    </>
  );
}
