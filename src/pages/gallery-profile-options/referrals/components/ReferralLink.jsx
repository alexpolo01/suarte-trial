import { useState } from 'react';
import QRCode from "react-qr-code";

import QRIcon from '@/shared-components/icons/components/gallery-options/QRIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/ReferralLink.css';

export default function ReferralLink({ fetchData }) {
  const [clipboardCooldown, setClipboardCooldown] = useState(false);
  const [openReferralQR, setOpenReferralQR] = useState(false);
  const referralLink = `https://suarte.art/?invite=${fetchData.referral_code}`;

  function copyReferralLink() {
    setClipboardCooldown(true);
    setTimeout(()=>setClipboardCooldown(false), 2000);
    navigator.clipboard.writeText(referralLink);
  }

  return (
    <>
      <div className="referral-link__container element-non-selectable">
        <QRIcon className="referral-link__qr-button" onClick={()=>setOpenReferralQR(true)}/>

        <Text className="referral-link__text dots-on-overflow" paragraph medium>
          {referralLink}
        </Text>

        <Text className={`referral-link__copy-button ${clipboardCooldown ? "disabled" : ""}`} medium onClick={copyReferralLink}>
          {
            clipboardCooldown ?
              "Copied!"
              :
              "Copy"
          }
        </Text>
      </div>

      <GenericPopup
        open={openReferralQR}
        className="referral-link-popup"
        opacity
      >
        <div className="referral-link__header">
          <Text className="referral-link__header-text" medium>
                            Referral QR
          </Text>

          <XIcon className="referral-link__close" onClick={()=>setOpenReferralQR(false)}/>
        </div>

        <QRCode className="referral-link__qr" value={referralLink}/>

      </GenericPopup>
    </>
  );
}
