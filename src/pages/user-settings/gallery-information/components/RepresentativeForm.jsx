import { useState } from 'react';

import config from '@/config';
import GalleryService from '@/services/gallery.service';
import PublicFullWidthButton from '@/shared-components/buttons/components/PublicFullWidthButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import SuccessText from '@/shared-components/text/components/SuccessText';
import Utils from '@/utils';

import './styles/RepresentativeForm.css';

export default function RepresentativeForm({ fetchData, onEditGalleryAgent }) {
  const [formState, setFormState] = useState({
    ...fetchData.gallery_agent,
    agent_birth: Utils.getInputValueFromYearObject(fetchData.gallery_agent.agent_birth)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function changeRepresentativeInformation(e) {
    e.preventDefault();
    setLoading(true); 
    setError(null); 
    setSuccess(false);

    const newGalleryAgent = {
      ...formState,
      agent_birth: Utils.getYearObjectFromInput(formState.agent_birth)
    };

    const { response, data } = await GalleryService.editGalleryAgent(newGalleryAgent);

    if(response.ok) {
      setLoading(false); 
      setSuccess(true);
      onEditGalleryAgent(data.gallery_agent);
    } else if(response.status === 400) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  return (
    <>
      <form onSubmit={changeRepresentativeInformation} className="settings-representative-form__form">
        <PublicFormInput 
          error={error} 
          placeholder="Full name" 
          element="gallery_agent.agent_name" 
          margin 
          readOnly={loading}
          value={formState.agent_name}
          onChange={e=>setFormState({ ...formState, agent_name: e.target.value })}
        />

        <PublicFormInput 
          error={error} 
          placeholder="Date of birth" 
          type="date" 
          element="gallery_agent.agent_birth" 
          margin 
          readOnly={loading}
          value={formState.agent_birth}
          onChange={e=>setFormState({ ...formState, agent_birth: e.target.value })}
        />

        <div className="settings-representative-form__form-group">
          <PublicFormInput 
            readOnly={loading} 
            className="settings-representative-form__form-group-margin" 
            error={error} 
            placeholder="Phone prefix"
            element="gallery_agent.agent_phone.phone_prefix" 
            type="select" 
            selectOptions={{ options: config.forms.prefix_options, type: "phone_prefix" }} 
            value={formState.agent_phone.phone_prefix}
            onChange={value=>setFormState({
              ...formState, 
              agent_phone: {
                ...formState.agent_phone, 
                phone_prefix: value
              }
            })}
          />

          <PublicFormInput 
            readOnly={loading} 
            error={error} 
            placeholder="Phone number" 
            element="gallery_agent.agent_phone.phone_number"
            value={formState.agent_phone.phone_number}
            onChange={e=>setFormState({
              ...formState, 
              agent_phone: {
                ...formState.agent_phone, 
                phone_number: e.target.value
              }
            })}
          />
        </div>

        <PublicFullWidthButton loading={loading}>
                    Save changes
        </PublicFullWidthButton>
      </form>

      {success && (
        <SuccessText className="settings-representative-form__success-text">
                    The representative's information has been updated succesfully.
        </SuccessText>
      )}
    </>
  );
}
