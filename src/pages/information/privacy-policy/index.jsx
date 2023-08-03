import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import PrivacyPolicyText from '@/shared-components/text/components/PrivacyPolicyText';

import './index.css';

export default function PrivacyPolicy() {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="privacy-policy-page__container">
        <div className="privacy-policy-page__text-container">
          <div className="privacy-policy-page__header">
            <BackArrowIcon className="privacy-policy-page__back-button" onClick={goBackHandler}/>
            <SuarteName className="privacy-policy-page__suarte-name" />
          </div>

          <h1 className="privacy-policy-page__heading">Suarte's Privacy Policy</h1>

          <PrivacyPolicyText/>
        </div>
      </div>
    </>
  );
}
