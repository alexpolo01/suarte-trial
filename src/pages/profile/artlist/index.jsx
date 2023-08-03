import { useParams } from 'react-router-dom';

import config from '@/config';
import ArtlistDataContext from '@/context/ArtlistDataContext';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import GoBackButton from '@/shared-components/buttons/components/GoBackButton';
import LoadingSpinnerPage from '@/shared-components/loaders/components/LoadingSpinnerPage';

import ArtlistHeader from './components/ArtlistHeader';
import ArtlistNotFound from './components/ArtlistNotFound';
import ArtlistBody from './artlist-body';

import './index.css';

export default function Artlist() {
  const { state } = useStateHandler();
  const { artlistId } = useParams();
  const { loading, fetchData, setFetchData } = useCache(`artlist_${artlistId}_view`, `${config.apis.api.url}/artlist/${artlistId}`, {
    injectToken: true,
    invalidateWhen: ["ADD_TO_ARTLIST_FROM_ARTWORK", "DELETE_ARTLIST"]
  });

  if(loading) {
    return (
      <>
        <GoBackButton/>
        <LoadingSpinnerPage/>
      </>
    );
  } else if(fetchData.error_type === "NOT_FOUND") {
    return (
      <ArtlistNotFound/>
    );
  } else {
    return (
      <>
        <ArtlistDataContext.Provider 
          value={{
            artlistData: fetchData, 
            setArtlistData: setFetchData, 
            isCreator: state.user_session?._id === fetchData.artlist_creator._id
          }}
        >
          <div className="artlist-page">
            <GoBackButton/>

            <div className="artlist-page__container-wrap">
              <ArtlistHeader key={fetchData.artlist_image?.image_id}/>

              <ArtlistBody cacheKey={`artlist_${artlistId}_view`}/>
            </div>
          </div>
        </ArtlistDataContext.Provider>
      </>
    );
  }
}
