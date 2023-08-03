import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import AdminService from '@/services/admin.service';
import Text from '@/shared-components/text/components/Text';

import DenyGalleryRequestPopup from './DenyGalleryRequestPopup';

import './styles/GalleryRequestCard.css';

export default function GalleryRequestCard({ galleryInfo }) {
  const { cacheHandler } = useStateHandler();
  const [open, setOpen] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);

  async function acceptGalleryRequest() {
    setLoadingAccept(true);
    const { response } = await AdminService.acceptGalleryRequest(galleryInfo._id);
    setLoadingAccept(false);

    if(response.ok) {
      alert("Solicitud aceptada correctamente");
      cacheHandler.triggerAction("GALLERY_REQUEST_ACCEPTED");
    } else {
      alert("Algo ha ido mal, vuelva a intentarlo más tarde");
    }   
  }

  return (
    <>
      <div className="gallery-request-card__container">
        <div className="gallery-request-card__request-info">
          <div className="gallery-request-card__request-info-col">
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Nombre de la galería: </span>{galleryInfo.user_name}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Nombre de usuario: </span>{galleryInfo.user_username}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Correo de la galería: </span>{galleryInfo.user_email}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Numero de identificación: </span>{galleryInfo.gallery_business_id}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Calle: </span>{galleryInfo.gallery_address.street}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Ciudad: </span>{galleryInfo.gallery_address.city}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Codigo postal: </span>{galleryInfo.gallery_address.zip_code}
            </Text>
          </div>

          <div className="gallery-request-card__request-info-col">
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Provincia: </span>{galleryInfo.gallery_address.region}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>País: </span>{galleryInfo.gallery_address.country}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Nombre del agente: </span>{galleryInfo.gallery_agent.agent_name}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Género del agente: </span>{galleryInfo.gallery_agent.agent_gender}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Fecha de nacimiento del agente: </span>{galleryInfo.gallery_agent.agent_birth.day}/{parseInt(galleryInfo.gallery_agent.agent_birth.month)+1}/{galleryInfo.gallery_agent.agent_birth.year}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Teléfono del agente: </span>{galleryInfo.gallery_agent.agent_phone.phone_prefix} {galleryInfo.gallery_agent.agent_phone.phone_number}
            </Text>
            <Text className="gallery-request-card-request-info__info-text" paragraph justify large>
              <span>Comentario de la galería: </span>{galleryInfo.gallery_comment}
            </Text>
          </div>
        </div>

        <div className="gallery-request-card__action-buttons">
          <button onClick={acceptGalleryRequest}>
            {loadingAccept ? "Cargando..." : "Aceptar solicitud"}
          </button>
          <button onClick={()=>setOpen(true)}>Rechazar solicitud</button>
        </div>
      </div>

      <DenyGalleryRequestPopup open={open} setOpen={setOpen} galleryInfo={galleryInfo}/>
    </>
  );
}
