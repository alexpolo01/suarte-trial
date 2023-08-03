import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import CookiesText from '@/shared-components/text/components/CookiesText';

import './index.css';

export default function CookiePolicy() {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="cookie-policy-page__container">
        <div className="cookie-policy-page__text-container">
          <div className="cookie-policy-page__header">
            <BackArrowIcon className="cookie-policy-page__back-button" onClick={goBackHandler}/>
            <SuarteName className="cookie-policy-page__suarte-name" />
          </div>

          <h1 className="cookie-policy-page__heading">Suarte's Cookie Policy</h1>

          <CookiesText/>
        </div>
      </div>
    </>
  );
}
