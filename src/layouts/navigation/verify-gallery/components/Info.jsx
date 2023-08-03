import { Link } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import Text from '@/shared-components/text/components/Text';

import './styles/Info.css';

export default function Info() {
  const { state } = useStateHandler();

  return (
    <>
      <div className="verify-gallery__info-container">
        <Text className="verify-gallery__info-text" medium paragraph justify>
                    Welcome <span className="verify-gallery__info-gallery-name">{state.user_session.user_name}</span> !
        </Text>
                
        <Text className="verify-gallery__info-text" medium paragraph justify>
                    It is a pleasure to have you on board. To access Suarte as a gallery, you just need to upload a minimum of three artworks.
        </Text>

        <Text className="verify-gallery__info-text" medium paragraph justify>
                    Once verified, your Gallery Profile will be ready.
        </Text>

        <Text className="verify-gallery__info-text margin" medium paragraph justify>
                    Check <Link className="verify-gallery__info-link underline" to="/guidelines-upload-artworks" state={{ from: true }}>Suarte's guidelines for uploading artworks</Link>.
        </Text> 

        <Link className="verify-gallery__info-link margin" to="/verify-gallery/add-artwork" state={{ from: true }}>
          <ContinueButton round link>Add artwork</ContinueButton>
        </Link>
      </div>
    </>
  );
}
