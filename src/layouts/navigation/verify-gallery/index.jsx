import { Outlet } from 'react-router-dom';

import config from '@/config';
import useCache from '@/hooks/useCache';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import Header from './components/Header';
import Info from './components/Info';
import Tabs from './components/Tabs';

import './index.css';

export default function VerifyGallery() {
  const { loading, fetchData, setFetchData } = useCache("gallery_onboarding_data", `${config.apis.api.url}/onboarding/artwork/info`, {
    injectToken: true, 
    type: "@cache/persist", 
    invalidateWhen: ["ARTWORK_DRAFT_SAVED", "NEW_ARTWORK_REQUEST"]
  });

  return (
    <>

      <div className="verify-gallery__container">
        <Header artworksCount={fetchData ? fetchData.artworks.length : 0}/>
                
        <div className="verify-gallery__wrap">
          <Info/>

          <Tabs artworksCount={fetchData ? fetchData.artworks.length : 0}/>

          <div className="verify-gallery__data-wrap">
            {
              loading ? 
                <CustomSpinner className="verify-gallery__data-spinner" defaultColor thin/>
                :
                <Outlet context={{ fetchData, setFetchData }}/>
            }
          </div>
        </div>
      </div>
    </>
  );
}
