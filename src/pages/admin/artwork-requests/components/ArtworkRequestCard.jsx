import { Link } from 'react-router-dom';

import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtworkRequestCard.css';

export default function ArtworkRequestCard({ draftData }) {
  return (
    <>
      <div className="artwork-request-card__container">
        <ArtworkImage 
          image={draftData.draft_container.artwork_media.artwork_main_picture.image_id} 
          imageClassName="artwork-request-card__image" 
          imageTemplateClassName="artwork-request-card__image-template"
        />

        <div>
          <Text className="artwork-request-card__text dots-on-overflow" medium paragraph justify>
                        Título de la obra: <span>{draftData.draft_container.artwork_about.artwork_title}</span>
          </Text>

          <Text className="artwork-request-card__text" style={{ marginTop: "10px" }} medium paragraph justify>
                        Tipo de solicitud:{" "}

            <span>
              {
                draftData.draft_container.edit ?
                  "EDIT OBRA"
                  :
                  "NUEVA OBRA"
              }
            </span>
          </Text>

          <Link className="artwork-request-card__link" to="/admin/artwork-request" state={{ draftData: draftData }}>
                        Ver la solicitud
          </Link>

          <h5 className="artwork-request-card__gallery-header mt-m">
                        Cuadro publicado por:
          </h5>

          <div className="artwork-request-card__gallery">
            <UserProfileImage
              typeOfProfile={draftData.gallery.user_type}
              image={draftData.gallery.user_image?.image_id}
              className="artwork-request-card__gallery-image"
            />

            <div className="artwork-request-card__gallery-info">
              <Text className="artwork-request-card__gallery-text ots-on-overflow" medium>
                {draftData.gallery.user_name}
              </Text>

              <Text className="artwork-request-card__gallery-text ots-on-overflow" small>
                                @{draftData.gallery.user_username}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
