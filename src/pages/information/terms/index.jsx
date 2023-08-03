import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import TermsText from '@/shared-components/text/components/TermsText';

import './index.scss';

export default function Terms() {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="terms-page__container">
        <div className="terms-page__text-container">
          <div className="terms-page__header">
            <BackArrowIcon className="terms-page__back-button" onClick={goBackHandler}/>
            <SuarteName className="terms-page__suarte-name" />
          </div>

          <h1 className="terms-page__heading">Terms and conditions</h1>

          <TermsText/>
        </div>
      </div>
    </>
  );
}
