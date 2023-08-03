import PrivacyPolicyText from '@/shared-components/text/components/PrivacyPolicyText';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';

import './index.css';

export default function Privacy() {
  return (
    <>
      <SettingsHeading text="Privacy policies"/>

      <div className="settings-privacy-policies__container">
        <PrivacyPolicyText/>
      </div>
    </>
  );
}