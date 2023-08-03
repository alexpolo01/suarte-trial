import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import ResizableTextarea from '@/shared-components/inputs/components/ResizableTextarea';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Utils from '@/utils';

import ConfirmUsernameChange from './components/ConfirmUsernameChange';
import ProfileImage from './components/ProfileImage';
import ProfileUsername from './components/ProfileUsername';

import './index.css';

export default function EditProfile() {
  const { state, stateHandler } = useStateHandler();
  const [formState, setFormState] = useState({
    user_image: state.user_session.user_image,
    user_name: state.user_session.user_name,
    user_username: state.user_session.user_username,
    user_profile_info: {
      user_description: state.user_session.user_profile_info.user_description,
      user_location: state.user_session.user_profile_info.user_location
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openConfirmUsernameChange, setOpenConfirmUsernameChange] = useState(false);

  function updateFormState(key, value) {
    setFormState(prevValue => Utils.addAttributeToObject(key, value, prevValue));
  }

  async function submitEditProfileLogic() {
    setLoading(true);
    setError(null);

    if(formState.user_image?.loading) {
      setLoading(false);
      alert("Wait until the image is uploaded or delete it");
    } else {
      const { response, data } = await UserService.editProfile(formState);

      if(response.ok) {
        setLoading(false);
        setSuccess(true);
        stateHandler.set("user_session", data);
        setTimeout(()=>setSuccess(false), 3000);

      } else if(response.status === 400) {
        setLoading(false);
        setError({ element: data.error_data.element, error_code: data.error_type });
      }
    } 
  }

  function submitEditProfile(e) {
    e.preventDefault();

    if(formState.user_username && formState.user_username !== state.user_session.user_username) {
      setOpenConfirmUsernameChange(true);
    } else {
      submitEditProfileLogic();
    }
  }

  return (
    <>
      <SettingsHeading text="Edit profile"/>

      <form onSubmit={submitEditProfile} className="edit-profile-form">
        <ProfileImage
          userType={state.user_session.user_type} 
          formState={formState} 
          setFormState={setFormState}
        />

        {state.user_session.user_type !== "collector" && (
          <PublicFormInput 
            element="user_name" 
            placeholder={state.user_session.user_type === "gallery" ? "Gallery name" : "Artist name"} 
            readOnly={loading || success} 
            error={error} 
            value={formState.user_name} 
            onChange={e=>updateFormState("user_name", e.target.value)}
            margin
          />
        )}

        <ProfileUsername
          userType={state.user_session.user_type}  
          userFlags={state.user_session.user_flags}
          readOnly={loading || success} 
          error={error} 
          value={formState.user_username} 
          onChange={e=>updateFormState("user_username", e.target.value)}
        />

        <ResizableTextarea 
          element="user_profile_info.user_description" 
          placeholder="Biography" 
          readOnly={loading || success} 
          error={error} 
          value={formState.user_profile_info.user_description} 
          onChange={e=>updateFormState("user_profile_info.user_description", e.target.value)}
          margin
        />

        <PublicFormInput 
          element="user_profile_info.user_location" 
          placeholder="Location" 
          readOnly={loading || success} 
          error={error} 
          value={formState.user_profile_info.user_location} 
          onChange={e=>updateFormState("user_profile_info.user_location", e.target.value)}
          margin
        />

        <ContinueButton 
          className="edit-profile-form__submit-button mt-m" 
          successClassName="edit-profile-form__submit-button" 
          loading={loading} 
          success={success} 
          successText="Saved!"
        >
                    Save changes
        </ContinueButton>
      </form>

      <ConfirmUsernameChange
        open={openConfirmUsernameChange}
        close={()=>setOpenConfirmUsernameChange(false)}
        onConfirm={()=>submitEditProfileLogic()}
        newUsername={formState.user_username}
        userType={state.user_session.user_type}
      />
    </>
  );
}