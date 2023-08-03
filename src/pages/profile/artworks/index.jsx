import { useContext,useState } from "react";
import { useNavigate } from 'react-router-dom';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useNavigateToArtwork from "@/hooks/useNavigateToArtwork";
import useQuery from "@/hooks/useQuery";
import DraftsProfileButton from '@/shared-components/buttons/components/DraftsProfileButton';
import ProfileAddButton from '@/shared-components/buttons/components/ProfileAddButton';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import OrderByPopup from '@/shared-components/popups/components/OrderByPopup';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './components/VirtualList';

import './index.css';

export default function ProfileArtworks() {
  const { profileData, internal } = useContext(ProfileDataContext);
  const [params, setParams] = useGetSearchParams({ validParams: ["sort", "user_type"] });
  const [query, setQuery] = useState(params ? params : { sort: "Recent", user_type: profileData.user_type });
  const { loading, queryData, loadMoreData } = useQuery(`${profileData._id}_artworks`, `${config.apis.api.url}/artworks/${profileData._id}`, query, {
    invalidateWhen: internal ? 
      ["BUY_ARTWORK", "EDIT_ARTWORK", "DELETE_ARTWORK", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]  
  });
  const navigateToArtwork = useNavigateToArtwork(`${profileData._id}_artworks`, queryData?.data, `/artworks/${profileData._id}${queryData?.queryString}`);
  const navigate = useNavigate();

  function selectSortOption(option) {
    const newQuery = { ...query, sort: option };
    setQuery(newQuery);
    setParams(newQuery, { replace: true });
  }

  return (
    <> 
      {
        (internal && profileData.user_type === "gallery") && (
          <>
            <DraftsProfileButton 
              draftsCount={profileData.draft_count} 
              onClick={()=>(
                navigate("/profile/artworks/drafts", {
                  replace: true, 
                  preventScrollReset: true
                })
              )}
            />

            <ProfileAddButton to="/profile/add-artwork"/>
          </>
        )
      }

      {
        (queryData?.data.data.length === 0 && !loading) ?
          <Text className="user-profile__artworks-empty-view" paragraph small>
            {
              internal ? 
                profileData.user_type === "gallery" ? 
                  "Your available artworks will build this view." 
                  : 
                  "Your artworks uploaded by galleries will build this view."
                :
                "No works available at the moment."
            }
          </Text>
          : (!queryData || (queryData?.data.data.length === 0 && loading)) ?
            <CustomSpinner className="user-profile__artworks-spinner" thin/>
            :
            <>
              <OrderByPopup 
                defaultOption={query.sort} 
                options={config.search.profile.artwork_sort_options} 
                onChangeOption={selectSortOption}
              />

              {
                loading ?
                  <CustomSpinner className="user-profile__artworks-spinner" thin/>
                  :
                  <VirtualList 
                    key={queryData.queryString} 
                    items={queryData.data} 
                    onLoadMore={loadMoreData}
                    navigateToArtwork={navigateToArtwork}
                  />
              }
            </>
      }
    </>
  );
}
