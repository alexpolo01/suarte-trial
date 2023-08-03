import { useNavigate } from 'react-router-dom';

import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import './index.css';

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <>
      <AppNavigationPage>
        <div className="payment-failed__page">

          <div className="payment-failed__info-container">
            <h1 className="payment-failed__heading lt-m">
                            Payment could not be processed
            </h1>

            <p className="payment-failed__text mt-m">
                            Your transaction has failed due to some technical error. 
                            Please check your payment details and try again. If the issue persists 
                            contact us at{" "}
              <a href="mailto: contact@suarte.art">contact@suarte.art</a>.
            </p>

            <ContinueButton className="payment-failed__button mt-m" onClick={()=>navigate("/", { replace: true })}>
                            Go to the homepage
            </ContinueButton>

            <ArtworkImage
              image="a60b4777-d9b1-4781-3ba9-5e1b33704400"
              imageClassName="payment-failed__sea"
              imageTemplateClassName="payment-failed__sea"
            />
          </div>
        </div>
      </AppNavigationPage>
    </>
  );
}
