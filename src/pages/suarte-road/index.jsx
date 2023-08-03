import React, { Suspense, useEffect } from 'react';

import config from '@/config';
import useCache from '@/hooks/useCache';
import useGoBack from '@/hooks/useGoBack';
import useStateHandler from '@/hooks/useStateHandler';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import './index.css';

const SuarteRoadContent = React.lazy(() => import('./suarte-road-content'));

export default function SuarteRoad() {
  const { state, stateHandler } = useStateHandler();
  const { fetchData } = useCache("user_suarte__road", `${config.apis.api.url}/suarteroad`, {
    injectToken: true,
    type: "@cache/dynamic"
  });
  const goBackHandler = useGoBack("/profile");

  useEffect(() => {
    if(Boolean(fetchData) && fetchData.completed && state.user_session.user_flags.suarteroad_completed === false) {
      stateHandler.set("user_session.user_flags.suarteroad_completed", true);
    }
  }, [fetchData]);

  return (
    <>
      <div className="suarte-road__page">
        <div className="suarte-road__wrapper">
          <div className="suarte-road__header">
            <span className="suarte-road__header-text lt-s">
                            Suarte Road
            </span>

            <BackArrowIcon className="suarte-road__back-button" onClick={goBackHandler}/>
          </div>

          <Suspense fallback={<CustomSpinner className="suarte-road__spinner" thin/>}>
            <SuarteRoadContent fetchData={fetchData}/>
          </Suspense>
        </div>
      </div>
    </>
  );
}
