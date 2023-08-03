import { Navigate } from 'react-router-dom';

import useScreenSize from '@/hooks/useScreenSize';
import ActivityMenu from '@/layouts/navigation/user-activity/components/ActivityMenu';
import ActivityHeading from '@/shared-components/text/components/ActivityHeading';

export default function ActivityIndex() {
  const screenSize = useScreenSize();

  if(screenSize.width > 700) {
    return <Navigate to="/profile/activity/liked-artworks" replace/>;
  }

  return (
    <>
      <ActivityHeading text="Activity" to="/profile"/>
      <ActivityMenu/>
    </>
  );
}
