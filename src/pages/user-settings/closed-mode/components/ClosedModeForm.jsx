import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import GenericInputStructure from '@/shared-components/inputs/components/GenericInputStructure';
import Text from '@/shared-components/text/components/Text';

import ConfirmClosedMode from './ConfirmClosedMode';

import './styles/ClosedModeForm.css';

export default function ClosedModeForm({ closedModeData }) {
  const { stateHandler } = useStateHandler();
  const [formState, setFormState] = useState(closedModeData ? closedModeData.reason : "");
  const [updateMessageLoading, setUpdateMessageLoading] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  function updateClosedMode(newClosedMode) {
    stateHandler.set("user_session.gallery_closed", newClosedMode);

    if(newClosedMode) {
      setFormState(newClosedMode.reason);
    } else {
      setFormState("");
    }
  }

  async function updateMessage() {
    setUpdateMessageLoading(true);

    const { response, data } = await GalleryService.updateClosedMode(true, formState);

    if(response.ok) {
      setUpdateMessageLoading(false);
      updateClosedMode(data);
    }
  }

  return (
    <>
      <form onSubmit={e=>e.preventDefault()} className="settings-closed-mode__form">
        <GenericInputStructure element="custom_message" placeholder="Custom message">
          <textarea 
            name="custom_message" 
            id="custom_message"
            value={formState}
            onChange={e=>setFormState(e.target.value)}
            placeholder='e.g. Thank you for showing interest in this artwork. We are currently closed but will be back soon.'
            className="settings-closed-mode__textarea mt-m"
            spellCheck={false}
            autoComplete="off"
          />
        </GenericInputStructure>

        {
          closedModeData ?
            <Text className="settings-closed-mode__form-text" paragraph justify small>
                            Your gallery is currently closed. To switch to opened mode click below.
            </Text>
            :
            <Text className="settings-closed-mode__form-text" paragraph justify small>
                            Your gallery is currently opened. To switch to closed mode click below.
            </Text>
        }

        {/* <Text className="settings-closed-mode__form-text" small>
                    <span>Remaining:</span> {fetchData.days_remaining} {fetchData.days_remaining === 1 ? "day" : "days"}
                </Text> */}

        <div className="settings-closed-mode__buttons">
          <ContinueButton className="mt-m" onClick={()=>setOpenConfirmationDialog(true)}>
            {
              closedModeData ?
                "Open"
                :
                "Close"
            }
          </ContinueButton>

          {(Boolean(closedModeData) && closedModeData.reason !== formState) && (
            <ContinueButton 
              className="mt-m margin" 
              loading={updateMessageLoading}
              onClick={updateMessage}
            >
                            Update message
            </ContinueButton>
          )}
        </div>
      </form>

      <ConfirmClosedMode
        open={openConfirmationDialog}
        close={()=>setOpenConfirmationDialog(false)}
        formState={formState}
        closedModeData={closedModeData}
        updateClosedMode={updateClosedMode}
      />
    </>
  );
}
