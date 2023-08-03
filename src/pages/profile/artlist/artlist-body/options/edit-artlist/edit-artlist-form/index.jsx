import { useContext, useRef,useState } from 'react';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import EditArtlistImage from './edit-artlist-image';
import SortArtworks from './sort-artworks';

import './index.css';

export default function EditArtlistForm({ close }) {
  const { artlistData, setArtlistData } = useContext(ArtlistDataContext);
  const { cacheHandler, stateHandler } = useStateHandler();
  const [formState, setFormState] = useState(artlistData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollableDiv = useRef();

  function updateFormState(key, value) {
    setFormState(prevValue => (
      Utils.addAttributeToObject(key, value, prevValue)
    ));
  }

  async function submitEditArtlist(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { response, data } = await UserService.editArtlist(formState);

    if(response.ok) {
      setArtlistData(data);
      cacheHandler.triggerAction("EDIT_ARTLIST");
      stateHandler.set("temporalPopup", {
        text: "Artlist information updated successfully", 
        type: "no-navigation"
      });
      close();
    } else if(response.status === 400) {
      setLoading(false);
      setError({
        element: data.error_data.element, 
        error_code: data.error_type
      });
    }
  }

  return (
    <>
      <form 
        onSubmit={submitEditArtlist} 
        className="edit-artlist-content__scrollable-container remove-scrollbar" 
        ref={scrollableDiv}
      >
        <EditArtlistImage
          formState={formState}
          updateFormState={updateFormState}
          scrollableDiv={scrollableDiv}
          readOnly={loading}
        />

        <PublicFormInput 
          readOnly={loading} 
          error={error} 
          placeholder="Title" 
          element="artlist_title" 
          margin
          value={formState.artlist_title}
          onChange={e=>updateFormState("artlist_title", e.target.value)}
        />

        <PublicFormInput 
          readOnly={loading} 
          error={error} 
          placeholder="Description" 
          element="artlist_description" 
          type="textarea" 
          margin
          value={formState.artlist_description}
          onChange={e=>updateFormState("artlist_description", e.target.value)}
        />

        <div className="edit-artlist-content__artlist-artworks-container">
          {
            formState.artlist_artworks.length === 0 ? 
              <Text className="edit-artlist-content__artlist-empty-text" medium paragraph>
                                No artworks added yet.
              </Text>
              :
              <SortArtworks formState={formState} updateFormState={updateFormState}/>
          }
        </div>

        <ContinueButton 
          loading={loading} 
          turnOff={!formState.artlist_title}
          className="edit-artlist-popup__submit-form-button mt-m"
        >
                    Edit artlist
        </ContinueButton>
      </form>
    </>
  );
}
