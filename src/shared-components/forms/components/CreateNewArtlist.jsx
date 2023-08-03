import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import ResizableTextarea from '@/shared-components/inputs/components/ResizableTextarea';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/CreateNewArtlist.css';

function Content({ close, onCreateNewArtlist }) {
  const { cacheHandler } = useStateHandler();
  const [formState, setFormState] = useState({
    artlist_title: "",
    artlist_description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createNewArtlist(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { response, data } = await UserService.createArtlist(formState); 

    if(response.ok) {
      cacheHandler.triggerAction("NEW_ARTLIST");
      onCreateNewArtlist(data);
      close();
    } else if(response.status === 400) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  return (
    <>
      <div className="create-new-artlist__header">
        <Text className="create-new-artlist__header-text" medium>
                    Create an artlist
        </Text>

        <XIcon className="create-new-artlist__close-button" onClick={close}/>
      </div>

      <form onSubmit={createNewArtlist} className="create-new-artlist__form">
        <PublicFormInput 
          readOnly={loading} 
          error={error} 
          placeholder="Title" 
          element="artlist_title"
          value={formState.artlist_title} 
          onChange={(e)=>setFormState({
            ...formState,
            artlist_title: e.target.value
          })} 
          margin
        />

        <ResizableTextarea 
          readOnly={loading} 
          error={error} 
          placeholder="Description" 
          element="artlist_description"
          value={formState.artlist_description} 
          onChange={(e)=>setFormState({
            ...formState,
            artlist_description: e.target.value
          })} 
        />
            
        <ContinueButton 
          turnOff={!formState.artlist_title} 
          loading={loading} 
          className="create-new-artlist__create-button"
        >
                    Create artlist
        </ContinueButton>
      </form>
    </>
  );
}
export default function CreateNewArtlist({ open, close, onCreateNewArtlist }) {
  return (
    <>
      <GenericPopup open={open} className="create-new-artlist-popup remove-scrollbar" opacity>
        <Content close={close} onCreateNewArtlist={onCreateNewArtlist}/>
      </GenericPopup>
    </>
  );
}
