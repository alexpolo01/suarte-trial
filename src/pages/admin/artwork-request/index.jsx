import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import config from '@/config';
import useStateHandler from '@/hooks/useStateHandler';
import AdminService from '@/services/admin.service';
import AddArtworkForm from '@/shared-components/forms/add-artwork';
import Text from '@/shared-components/text/components/Text';

import DenyModal from './components/DenyModal';

import './index.css';

export default function ArtworkRequest() {
  const { cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);
  const [openDenyModal, setOpenDenyModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if(!(location.state?.draftData)) {
    return <Navigate to="/admin/artwork-requests" replace/>;
  }

  async function acceptArtworkRequest() {
    setLoading(true);
    const { response } = await AdminService.acceptArtworkRequest(location.state.draftData._id);
    setLoading(false);

    if(response.ok) {
      alert("La solicitud de la obra ha sido aceptada correctamente");
      cacheHandler.triggerAction("ARTWORK_REQUEST_ACCEPTED");
      navigate("/admin/artwork-requests", { replace: true });
    } else {
      alert("Algo ha fallado, vuelve a interlo mas adelante");
    }
  }

  return (
    <>
      <div className="artwork-request-changes__wrap">
        {Boolean(location.state.draftData.draft_container.critical_elements_changed) && (
          <div className="artwork-request-changes__critical-changes-container">
            <h1 className="mt-m">EN ESTA OBRA SE HAN PRODUCIDO CAMBIOS EN CAMPOS QUE HAN SIDO CONSIDERADOS CRITICOS (CAMPOS DONDE ES NECESARIO UNA REVISION).</h1>
            <p className="mt-s">
              Los campos que se consideran criticos son: 
            </p>
            <ul>
              <li className="mt-s">
                +-5cm en length o height
              </li>

              <li className="mt-s">
                Cambio de artista
              </li>

              <li className="mt-s">
                Cambio la foto principal
              </li>
            </ul>
            
            <p className="mt-s">
              Estos son los cambios que han ocurrido:
            </p>

            {location.state.draftData.draft_container.critical_elements_changed.map(criticalChange => (
              <p className="mt-s" key={criticalChange.element}>
                Ha cambiado {criticalChange.element}. Antes valia:{" "}

                {
                  criticalChange.element === "artwork_artist" ?
                    `${criticalChange.old_value.gallery_artist ? 
                      criticalChange.old_value.user_name 
                      : 
                      criticalChange.old_value.artist_name}`
                    : criticalChange.element === "artwork_size" ?
                      `Length: ${criticalChange.old_value.length}, Height: ${criticalChange.old_value.height}, Unit: ${criticalChange.old_value.unit}`
                      :
                      <a href={`${config.app.imageServiceDomain}/${criticalChange.old_value}/gamma=0`} target="_blank" rel="noopener noreferrer">
                        Ver imagen anterior
                      </a>
                }
              </p>
            ))}
          </div>
        )}

        <AddArtworkForm artworkData={location.state.draftData} previewMode/>
        <div className="artwork-request-changes__options">
          <Text className={`artwork-request-changes__button accept ${loading ? "read-only" : ""}`} onClick={acceptArtworkRequest} small>
            {loading ? "Cargando..." : "Accept artwork request"}
          </Text>

          <Text className={`artwork-request-changes__button deny ${loading ? "read-only" : ""}`} onClick={()=>setOpenDenyModal(true)} small>
            Deny artwork request
          </Text>
        </div>
      </div>

      <DenyModal open={openDenyModal} close={()=>setOpenDenyModal(false)} draftId={location.state.draftData._id}/>
    </>
  );
}
