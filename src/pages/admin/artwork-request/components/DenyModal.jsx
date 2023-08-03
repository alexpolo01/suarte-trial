import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import AdminService from '@/services/admin.service';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/DenyModal.css';

function DenyModalContent({ close, draftId }) {
  const { cacheHandler } = useStateHandler();
  const [denyReason, setDenyReason] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function denyArtworkRequest() {
    setLoading(true);

    if(!denyReason) {
      alert("Introduce el motivo por favor");
      setLoading(false);
      return;
    }

    const { response } = await AdminService.rejectArtworkRequestAndNotifyChanges(draftId, denyReason);

    setLoading(false);

    if(response.ok) {
      alert("La solicitud de la obra ha sido rechazada correctamente");
      cacheHandler.triggerAction("ARTWORK_REQUEST_DENIED");
      navigate("/admin/artwork-requests", { replace: true });
    } else {
      alert("Algo ha fallado, vuelve a interlo mas adelante");
    }
  }

  return (
    <>
      <Text className="admin-deny-artwork-modal__text" paragraph justify small>
                A continuación especifique a la galeria las razones por las cuales 
                su obra ha sido rechazada. Se le notificara a la galeria tanto por 
                email como por el apartado "Changes required"
      </Text>

      <PublicFormInput
        placeholder='Motivos de rechazo'
        className="admin-deny-artwork-modal__textarea"
        type="textarea"
        value={denyReason}
        onChange={e => setDenyReason(e.target.value)}
      />

      <div className="admin-deny-artwork-modal__options element-non-selectable">
        <Text className="admin-deny-artwork-modal__option cancel" onClick={close} small>
                    Cancel
        </Text>

        <Text className={`admin-deny-artwork-modal__option deny ${loading ? "read-only" : ""}`} onClick={denyArtworkRequest} small>
          {loading ? "Cargando..." : "Deny artwork request"}
        </Text>
      </div>
    </>
  );
}

export default function DenyModal({ open, close, draftId }) {
  return (
    <>
      <GenericPopup open={open} className="admin-deny-artwork-modal" opacity>
        <DenyModalContent close={close} draftId={draftId}/>
      </GenericPopup>
    </>
  );
}
