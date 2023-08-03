import { useState } from 'react';

import config from '@/config';
import useStateHandler from '@/hooks/useStateHandler';
import AdminService from '@/services/admin.service';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';

import './styles/LimitedEditionRequest.css';

export default function LimitedEditionRequest({ data }) {
  const { cacheHandler } = useStateHandler();
  const [denyReason, setDenyReason] = useState("");
  const [openDenyModal, setOpenDenyModal] = useState(false);
  const [loading, setLoading] = useState();

  async function acceptLimitedEdition() {
    if(loading) return;

    setLoading(true);

    const { response } = await AdminService.acceptLimitedEditionRequest(data._id);

    setLoading(false);

    if(response.ok) {
      alert("Solicitud aceptada correctamente");
      cacheHandler.triggerAction("LIMITED_EDITION_REQUEST_ACCEPTED");
    } else {
      alert("Algo ha ido mal, vuelva a intentarlo más tarde");
    }  
  }

  async function rejectLimitedEdition() {
    if(loading) return;

    if(!denyReason) {
      alert("Por favor, especifica una razon de porque se ha rechazado la edicion limitada.");
      return;
    }

    setLoading(true);

    const { response } = await AdminService.rejectLimitedEditionRequestAndNotifyChanges(data._id, denyReason);

    setLoading(false);

    if(response.ok) {
      alert("Solicitud rechazada correctamente");
      cacheHandler.triggerAction("LIMITED_EDITION_REQUEST_DENIED");
    } else {
      alert("Algo ha ido mal, vuelva a intentarlo más tarde");
    }  
  }

  return (
    <>
      <div className="admin-limited-editions-requests__card">
        <p className="admin-limited-editions-requests__card-text mt-m">
                    Titulo de la obra:{" "}

          <span>
            {data.artwork_about.artwork_title}
          </span>
        </p>

        <p className="admin-limited-editions-requests__card-text mt-m">
                    Main picture de la obra:{" "}

          <a href={`${config.app.imageServiceDomain}/${data.artwork_media.artwork_main_picture.image_id}/gamma=0`} target="_blank" rel="noopener noreferrer">
                        Ver imagen
          </a>
        </p>

        <p className="admin-limited-editions-requests__card-text mt-m">
                    Medium de la obra:{" "}

          <span>
            {data.artwork_about.artwork_medium}
          </span>
        </p>

        <div className="admin-limited-editions-requests__card-buttons">
          <div className="admin-limited-editions-requests__card-button accept" onClick={acceptLimitedEdition}>
            {
              loading ?
                "Cargando..."
                :
                "Accept limited edition"
            }
          </div>

          <div className="admin-limited-editions-requests__card-button deny" onClick={()=>setOpenDenyModal(true)}>
                        Deny limited edition
          </div>
        </div>
      </div>

      <GenericPopup
        open={openDenyModal}
        className="admin-limited-editions-requests__popup"
        opacity
      >
        <button onClick={()=>setOpenDenyModal(false)}>Cerrar popup</button>

        <p className="mt-m" style={{ color: "white" }}>
                    A continuacion especifique porque se rechaza la solicitud de ediciones limitadas. Se le notificara a la galeria (deberiamos notificarla? ahora mismo no tenemos nada creo)
        </p>

        <PublicFormInput
          placeholder='Motivos de rechazo'
          className="admin-deny-artwork-modal__textarea"
          type="textarea"
          value={denyReason}
          onChange={e => setDenyReason(e.target.value)}
        />

        <div className="admin-limited-editions-requests__card-button deny" onClick={rejectLimitedEdition} style={{ margin: "0 auto", marginTop: "20px" }}>
          {
            loading ?
              "Cargando..."
              :
              "Deny limited edition"
          }
        </div>
      </GenericPopup>
    </>
  );
}
