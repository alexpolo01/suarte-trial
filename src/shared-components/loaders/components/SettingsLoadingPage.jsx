import SettingsHeading from '@/shared-components/text/components/SettingsHeading';

import CustomSpinner from './CustomSpinner';

import './styles/SettingsLoadingPage.css';

export default function SettingsLoadingPage({ page="" }) {
  return (
    <>
      <div className="settings-loading-page__container">
        <SettingsHeading text={page}/>
        <CustomSpinner className="settings-loading-page__spinner" thin/>
      </div>
    </>
  );
}
