import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import TermsText from '@/shared-components/text/components/TermsText';

import './index.css';

export default function Terms() {
  return (
    <>
      <SettingsHeading text="Terms of use"/>

      <div className="settings-terms-of-use__container">
        <TermsText/>
      </div>
    </>
  );
}