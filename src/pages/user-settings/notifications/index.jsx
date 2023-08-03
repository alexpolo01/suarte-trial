import { useEffect,useState } from 'react';

import SwitchInput from '@/shared-components/inputs/components/SwitchInput';
import SettingsLoadingPage from '@/shared-components/loaders/components/SettingsLoadingPage';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import './index.css';

function NotificationOption({ text, value, onChange }) {
  return (
    <>
      <div className="settings-notifications__notification">
        <Text className="settings-notifications__text" medium>
          {text}
        </Text>
                
        <SwitchInput value={value} onChange={onChange}/>
      </div>
    </>
  );
}

export default function Notifications() {
  const [fetchData, setFetchData] = useState(null); // THIS WILL BE THE usecache. ALL SETTINGS WILL SHARE THE SAME CACHEKEY AND SAME ENDPOINT. THIS WAY, WE ONLY DO ONE REQUEST FOR ALL PAGES. IF THERE'S A PAGE THAT NEEDS AN SPECIAL ENDPOINT (LIKE PAYMENT METHOD) JUST USE ANOTHER, THERE'S NO PROBLEM :).

  useEffect(()=>{setTimeout(()=>setFetchData({
    user_notifications: {
      hasReplyOnThought: true,
      hasLikeOnThought: false,
      hasLikeOnArtlist: true,
      hasNewFollower: true,
      hasSuarteRecommendations: true
    }
  }), 2000);}, []);

  // eslint-disable-next-line no-unused-vars
  function handleNotificationsChange(switchValue, notificacion) {
    // TODO: WHEN WE UPDATE NOTIFICATION WE NEED TO UPDATE CACHE AND DONT WAIT FOR REQUEST.
    // TODO: UPDATE GLOBAL CACHE OF SETTINGS
  }

  if(!fetchData) {
    return <SettingsLoadingPage page="Notifications"/>;
  }

  return (
    <>
      <SettingsHeading text="Notifications"/>

      <div className="settings-notifications__container">
        <NotificationOption 
          text="Reply on thought" 
          value={fetchData.user_notifications.hasReplyOnThought} 
          onChange={(switchValue)=>handleNotificationsChange(switchValue, "hasReplyOnThought")}
        />

        <NotificationOption 
          text="Like on thought" 
          value={fetchData.user_notifications.hasLikeOnThought} 
          onChange={(switchValue)=>handleNotificationsChange(switchValue, "hasLikeOnThought")}
        />

        <NotificationOption 
          text="Like on artlist" 
          value={fetchData.user_notifications.hasLikeOnArtlist} 
          onChange={(switchValue)=>handleNotificationsChange(switchValue, "hasLikeOnArtlist")}
        />

        <NotificationOption 
          text="New follower" 
          value={fetchData.user_notifications.hasNewFollower} 
          onChange={(switchValue)=>handleNotificationsChange(switchValue, "hasNewFollower")}
        />

        <NotificationOption 
          text="Suarte recommendations" 
          value={fetchData.user_notifications.hasSuarteRecommendations} 
          onChange={(switchValue)=>handleNotificationsChange(switchValue, "hasSuarteRecommendations")}
        />
      </div>
    </>
  );
}