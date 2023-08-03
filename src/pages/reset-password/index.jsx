import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetSearchParams from '@/hooks/useGetSearchParams';
import AuthService from '@/services/auth.service';
import PublicFullWidthButton from '@/shared-components/buttons/components/PublicFullWidthButton';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params] = useGetSearchParams();
  const navigate = useNavigate();

  async function resetSubmit(e) {
    e.preventDefault();
    setLoading(true); 
    setError(null); 

    if(e.target.user_password.value !== e.target.user_confirm_password.value) {
      setLoading(false);
      setError({ element: "user_confirm_password", error_code: "PASSWORD_MISMATCH" });
      return;
    }

    const { response, data } = await AuthService.resetPassword(e.target.user_password.value, params?.oobCode);

    if(response.ok) {
      setLoading(false);
      alert("Your password has been updated successfully. You can now log in with your new credentials.");
      navigate("/", { replace: true });
    } else if(response.status === 400) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    } 
  }

  return (
    <>
      <div className="reset-password__page">
        <div className="reset-password__container remove-scrollbar">
          <SuarteName className="reset-password__suarte-name"/>
          <Text className="reset-password__header" medium>Set your new password</Text>
          <Text className="reset-password__text" small>Please enter your new password below.</Text>

          <Text className="reset-password__title" large>New password</Text>

          <form onSubmit={resetSubmit} className="reset-password__form">
            <PublicFormInput error={error} placeholder="New password" type="password" element="user_password" margin/>
            <PublicFormInput error={error} className="reset-password__input" type="password" placeholder="Confirm new password" element="user_confirm_password"/>
            <PublicFullWidthButton loading={loading}>Change password</PublicFullWidthButton>
          </form>
        </div>
      </div>
    </>
  );
}
