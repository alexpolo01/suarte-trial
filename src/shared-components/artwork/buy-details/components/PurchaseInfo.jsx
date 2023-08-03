import ArtworkLabel from '@/shared-components/artwork/components/ArtworkLabel';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import CertificateIcon from '@/shared-components/icons/components/buy/CertificateIcon';
import FrameIncludedIcon from '@/shared-components/icons/components/buy/FrameIncludedIcon';
import PurchaseProtectedIcon from '@/shared-components/icons/components/buy/PurchaseProtectedIcon';
import VATIcon from '@/shared-components/icons/components/buy/VATIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/PurchaseInfo.css';

export default function PurchaseInfo({ artworkData, typeOfPurchase }) {
  return (
    <>
      <div className="purchase-info__container">
        <ArtworkImage
          image={artworkData.artwork_media.artwork_main_picture.image_id}
          imageClassName="purchase-info__artwork-picture"
          imageTemplateClassName="purchase-info__artwork-picture"
        />

        <div className="purchase-info__details">
          <ArtworkLabel artworkData={artworkData} hideSocials/>

          {
            typeOfPurchase === "limited_edition" ?
              <div className="purchase-info__detail-option">
                <LimitedEditionIcon className="purchase-info__detail-icon limited"/>

                <Text className="purchase-info__detail-text" extraSmall>
                                    Limited Edition
                </Text>
              </div>
              :
              <>
                {Boolean(artworkData.artwork_about.artwork_includes_certificate) && (
                  <div className="purchase-info__detail-option">
                    <CertificateIcon className="purchase-info__detail-icon limited"/>

                    <Text className="purchase-info__detail-text" extraSmall>
                                            Certificate of authenticity
                    </Text>
                  </div>
                )}

                {Boolean(artworkData.artwork_about.artwork_includes_frame) && (
                  <div className="purchase-info__detail-option">
                    <FrameIncludedIcon className="purchase-info__detail-icon limited"/>
                
                    <Text className="purchase-info__detail-text" extraSmall>
                                            Frame included
                    </Text>
                  </div>
                )}
              </>
          }
                    
          <div className="purchase-info__detail-option">
            <PurchaseProtectedIcon className="purchase-info__detail-icon protected"/>

            <Text className="purchase-info__detail-text" extraSmall>
                            Your purchase is protected
            </Text>
          </div>

          <div className="purchase-info__detail-option">
            <VATIcon className="purchase-info__detail-icon vat"/>

            <Text className="purchase-info__detail-text" extraSmall>
                            VAT may apply
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
