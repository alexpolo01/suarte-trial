import { Navigate } from 'react-router-dom';

import useScreenSize from '@/hooks/useScreenSize';
import SettingsMenu from '@/layouts/navigation/user-settings/components/SettingsMenu';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';

export default function SettingsIndex() {
  const screenSize = useScreenSize();

  if(screenSize.width > 700) {
    return <Navigate to="/profile/settings/login" replace/>;
  }

  return (
    <>
      <SettingsHeading text="Settings and privacy" to="/profile"/>
      <SettingsMenu/>
    </>
  );
}
