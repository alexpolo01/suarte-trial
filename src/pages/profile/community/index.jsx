import { useContext,useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProfileDataContext from '@/context/ProfileDataContext';
import useGetSearchParams from '@/hooks/useGetSearchParams';
import Text from '@/shared-components/text/components/Text';

import Ratings from './ratings';
import Thoughts from './thoughts';

import './index.css';

export default function ProfileCommunity() {
  const { profileData, internal } = useContext(ProfileDataContext);
  const [params, setParams] = useGetSearchParams({ validParams: ["v"] });
  const [view, setView] = useState(params ? params : { v: "thoughts" });
  const location = useLocation();

  function changeView(view) {
    const newView = { v: view };
    setView(newView);
    setParams(newView, { replace: true, preventScrollReset: true, state: location.state });
  }

  return (
    <>
      <div className="user-profile__community-navigation element-non-selectable">
        <div className={`user-profile__community-navigation-link ${view.v === "thoughts" ? "active" : ""}`} onClick={()=>changeView("thoughts")}>
          <Text className="user-profile__community-navigation-link-text" extraSmall>
                        Thoughts
          </Text>
        </div>

        <div className={`user-profile__community-navigation-link ${view.v === "ratings" ? "active" : ""}`} onClick={()=>changeView("ratings")}>
          <Text className="user-profile__community-navigation-link-text" extraSmall>
                        Ratings
          </Text>
        </div>
      </div>

      {view.v === "thoughts" && <Thoughts profileData={profileData} internal={internal}/>}
      {view.v === "ratings" && <Ratings profileData={profileData} internal={internal}/>}
    </>
  );
}
