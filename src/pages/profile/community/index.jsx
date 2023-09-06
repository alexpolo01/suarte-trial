import { useContext,useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProfileDataContext from '@/context/ProfileDataContext';
import useGetSearchParams from '@/hooks/useGetSearchParams';
import useStateHandler from '@/hooks/useStateHandler';
import Text from '@/shared-components/text/components/Text';

import Ratings from './ratings';
import Thoughts from './thoughts';

import './index.css';

export default function ProfileCommunity() {
  const { profileData, internal } = useContext(ProfileDataContext);
  const { cacheHandler } = useStateHandler();
  const [params, setParams] = useGetSearchParams({ validParams: ["v"] });
  const [view, setView] = useState(params ? params : { v: "thoughts" });
  const location = useLocation();
  const thoughtsCacheValue = cacheHandler.getCacheValue(`${profileData._id}_thoughts`)?.data;
  const ratingsCacheValue = cacheHandler.getCacheValue(`${profileData._id}_ratings`)?.data;

  function changeView(view) {
    const newView = { v: view };
    setView(newView);
    setParams(newView, { replace: true, preventScrollReset: true, state: location.state });
  }

  return (
    <>
      <div className="user-profile__community-navigation element-non-selectable">
        {
          (internal || (thoughtsCacheValue && thoughtsCacheValue.data.length > 0)) && (
            <div className={`user-profile__community-navigation-link ${view.v === "thoughts" ? "active" : ""}`} onClick={()=>changeView("thoughts")}>
              <Text className="user-profile__community-navigation-link-text" extraSmall>
                            Thoughts
              </Text>
            </div>
          )
        }

        {
          (internal || (ratingsCacheValue && ratingsCacheValue.data.length > 0)) && (
            <div className={`user-profile__community-navigation-link ${view.v === "ratings" ? "active" : ""}`} onClick={()=>changeView("ratings")}>
              <Text className="user-profile__community-navigation-link-text" extraSmall>
                            Ratings
              </Text>
            </div>
          )
        }
      </div>

      {thoughtsCacheValue && thoughtsCacheValue.data.length > 0 && view.v === "thoughts" && <Thoughts profileData={profileData} internal={internal}/>}
      {ratingsCacheValue && ratingsCacheValue.data.length > 0 && view.v === "ratings" && <Ratings profileData={profileData} internal={internal}/>}
    </>
  );
}
