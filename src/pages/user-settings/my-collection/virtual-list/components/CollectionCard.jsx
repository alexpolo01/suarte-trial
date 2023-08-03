import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import RankingsLockedIcon from '@/shared-components/icons/components/rankings/RankingsLockedIcon';
import PublicArtworkIcon from '@/shared-components/icons/components/settings/PublicArtworkIcon';
import SettingsGalleryIcon from '@/shared-components/icons/components/settings/SettingsGalleryIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/CollectionCard.css';

export default function CollectionCard({ data, setArtworkToChangeVisibility }) {
  return (
    <>
      <div className="collection-card__outter-container element-non-selectable">
        <div className="collection-card__container">
          <div className="collection-card__header">
            {
              !data.product_metadata.is_limited_edition ?
                <div className="collection-card__seller">
                  <SettingsGalleryIcon className="collection-card__seller-original"/>

                  <Text className="collection-card__seller-text dots-on-overflow" large>
                    {data.artwork_about.artwork_gallery.user_name}
                  </Text>
                </div>
                :
                <div className="collection-card__seller">
                  <LimitedEditionIcon className="collection-card__seller-limited"/>

                  <Text className="collection-card__seller-text dots-on-overflow" large>
                                        Suarte
                  </Text>
                </div>
            }

            <Text className="collection-card__bought-at" small>
              {Utils.getDateInStringFromTimestamp(data.product_metadata.artwork_bought_at)}
            </Text>
          </div>

          <div className="collection-card__content">
            <ArtworkImage
              image={data.artwork_media.artwork_main_picture.image_id}
              imageClassName="collection-card__image"
              imageTemplateClassName="collection-card__image"
            />

            <div className="collection-card__info">
              <Text className="collection-card__big-text title dots-on-overflow" large>
                {data.artwork_about.artwork_title}
              </Text>

              <div>
                <Text className="collection-card__small-text dots-on-overflow" small>
                                    by{" "}

                  {
                    data.artwork_about.artwork_artist ?
                      data.artwork_about.artwork_artist.user_name
                      :
                      data.artwork_about.artwork_gallery_artist.artist_name
                  }
                </Text>

                <Text className="collection-card__small-text dots-on-overflow" small>
                  {
                    !data.product_metadata.is_limited_edition ?
                      "Original artwork"
                      :
                      "Limited edition"   
                  }
                </Text>

                <Text className="collection-card__small-text dots-on-overflow" small>
                  {data.artwork_about.artwork_size.length}{" "}
                  {data.artwork_about.artwork_size.unit} x{" "}
                  {data.artwork_about.artwork_size.height}{" "}
                  {data.artwork_about.artwork_size.unit}{" "} 
                </Text>
              </div>

              <Text className="collection-card__big-text dots-on-overflow" large>
                {Utils.getArtworkPrice(data.artwork_about.artwork_price, data.artwork_about.artwork_currency)}
              </Text>
            </div>
          </div>
        </div>
                
        {
          !data.product_metadata.is_private ? 
            <PublicArtworkIcon className="collection-card__visibility-public" onClick={()=>setArtworkToChangeVisibility(data)}/>
            :
            <RankingsLockedIcon className="collection-card__visibility-private" onClick={()=>setArtworkToChangeVisibility(data)}/>
        }   
      </div>
    </>
  );
}
