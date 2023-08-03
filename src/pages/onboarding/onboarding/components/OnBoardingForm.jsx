import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import config from '@/config';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Utils from '@/utils';

import './styles/OnBoardingForm.css';

export default function OnBoardingForm({ className, setActiveSlide, user_type, onCreateAccount }) {
  const { state, stateHandler } = useStateHandler();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function createAccount(e) {
    e.preventDefault();
    setLoading(true); /** Reset Flags for fetching */
    setError(null); 

    if(!termsAccepted) {
      setError({ element: "user_terms", error_code: "TERMS_NOT_ACCEPTED" });
      setLoading(false);
      return;
    }

    const accountData = {
      user_name: e.target.user_name?.value,
      user_username: e.target.user_username.value,
      user_gender: gender,
      user_birth: Utils.getYearObjectFromInput(e.target.user_birth.value)
    };

    const { response, data } = await UserService.createAccountAndCompleteOnboarding(accountData, user_type);

    if(response.ok) {
      stateHandler.set("user_session", data);
      setActiveSlide(2);
      onCreateAccount();
    } else if(response.status === 400) {
      setError({ element: data.error_data.element, error_code: data.error_type });
      setLoading(false);
    } else if([401, 403].includes(response.status)) {
      navigate("/", { replace: true });
    }
  }

  return (
    <>
      <div className={className}>
        <h2 className="onboarding-form__heading">
          {user_type === "collector" ? "Hey there!" : "We've been waiting for you!"}
        </h2>

        <div className="onboarding-form__text-container">
          <div>
            <p className="onboarding-form__text margin">
                            I am Suarte's guardian. My purpose is to walk you through the app and enhance your experience.
            </p>
                        
            <p className="onboarding-form__text">
              {user_type === "collector" ? "Let's create your identity first:" : "Let's create your artist profile:"}
            </p>
          </div>
        </div>

        <form onSubmit={createAccount} className="onboarding-form__form">
          {user_type === "artist" && (
            <PublicFormInput 
              error={error} 
              placeholder="Artist name" 
              element="user_name" 
              fillWith={state.user_session.user_name} 
              margin
            />
          )}

          <PublicFormInput 
            error={error} 
            placeholder="Username" 
            element="user_username" 
            fillWith={state.user_session.user_username}
            margin
          />

          <div className="onboarding-form__group">
            <PublicFormInput 
              className="onboarding-form__group-margin" 
              error={error} 
              placeholder="Gender" 
              element="user_gender" 
              type="select" 
              selectOptions={{ options: config.forms.gender_options }} 
              value={gender}
              onChange={newValue => setGender(newValue)}
            />

            <PublicFormInput 
              error={error} 
              placeholder="Birth date" 
              element="user_birth" 
              type="date"
            />
          </div>

          <PublicFormInput 
            error={error} 
            element="user_terms" 
            type="checkbox" 
            value={termsAccepted} 
            onChange={value => setTermsAccepted(value)}
          >
                        I accept{" "} 
            <Link className="public-form-input__checkbox-link" to="/terms" state={{ from: "/onboarding" }}>
                            terms and conditions
            </Link>.
          </PublicFormInput>

          <ContinueButton loading={loading} className={`onboarding-form__button-margin${user_type === "collector" ? " margin-collector" : ""}`}> 
                        Create account
          </ContinueButton>

          <img 
            src={`${config.app.imageServiceDomain}/13a34fe1-4954-46e9-4a6a-f79af8985d00/public`}
            alt="main mr whiskers" 
            className="onboarding-form__mrwhiskers" 
          />
        </form>  
      </div>
    </>
  );
}
