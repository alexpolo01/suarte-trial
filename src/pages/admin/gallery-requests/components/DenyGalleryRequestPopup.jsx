import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import AdminService from '@/services/admin.service';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/DenyGalleryRequestPopup.css';

export default function DenyGalleryRequestPopup({ open, setOpen, galleryInfo }) {
  const { cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);

  async function denyGalleryRequest(e) {
    e.preventDefault();
    setLoading(true);

    const { response } = await AdminService.denyGalleryRequest(galleryInfo._id, e.target.deny_gallery_request_reason.value);

    setLoading(false);

    if(response.ok) {
      alert("Solicitud rechazada correctamente");
      cacheHandler.triggerAction("GALLERY_REQUEST_DENIED");
      setOpen(false);
    } else {
      alert("Algo ha ido mal. Puede ser por dos motivos: o bien no has puesto ningun mensaje de rechazo, o bien los servidores han fallado.");
    }
  }

  return (
    <>
      <GenericPopup className="deny-gallery-request-popup" open={open} opacity>
        <XIcon className="deny-galery-request-close-button" onClick={()=>setOpen(false)}/>
        <h2 className="deny-gallery-request__heading"><Heading medium>Has seleccionado rechazar la solicitud de {galleryInfo.user_name}</Heading></h2>
        <Text className="deny-gallery-request__text" large>A continuación, especifique el porque de dicha decisión. Se le notificará a la galería la razón:</Text>

        <form onSubmit={denyGalleryRequest} className="deny-gallery-request_form">
          <textarea className="deny-gallery-request_form-textarea" name="deny_gallery_request_reason"autoComplete='off'></textarea>
          <button className="deny-gallery-request__form-button" disabled={loading}>
            {loading ? "Cargando..." : "Rechazar solicitud"}
          </button>
        </form>
      </GenericPopup>
    </>
  );
}
