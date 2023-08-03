import CookiesText from '@/shared-components/text/components/CookiesText';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';

import './index.css';

export default function Cookies() {
  return (
    <>
      <SettingsHeading text="Cookies"/>

      <div className="settings-cookies__container">
        <CookiesText/>
      </div>
    </>
  );
}