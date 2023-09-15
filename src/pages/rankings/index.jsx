import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import config from '@/config';
import useCache from '@/hooks/useCache';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import RankingsBannerIcon from '@/shared-components/icons/components/rankings/RankingsBannerIcon';
import RankingsLockedIcon from '@/shared-components/icons/components/rankings/RankingsLockedIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import './index.css';

export default function Rankings() {
  const { fetchData } = useCache("rankings", `${config.apis.api.url}/rankings?limit=5`, { type: "@cache/dynamic" });
  const navigate = useNavigate();

  function shareApp() {
    navigator.share({
      title: `Suarte`,
      text: `Take a look at Suarte's app:`,
      url: `https://suarte.art`
    });
  }

  if(!fetchData) {
    return (
      <>
        <Helmet> 
          <title>Rankings - Suarte</title>
          <meta name="description" content="Discover which galleries, artists, artworks and community features are trending. Rankings are forged by a community of art lovers where evryone can take part." />
        </Helmet>
        <AppNavigationPage>
          <div className="rankings__loading-page">
            <CustomSpinner className="rankings__loading-spinner" thin/>
          </div>
        </AppNavigationPage>
      </>
    );
  } else {
    return (
      <>
        <Helmet> 
           <title>Rankings - Suarte</title>
          <meta name="description" content="Discover which galleries, artists, artworks and community features are trending. Rankings are forged by a community of art lovers where evryone can take part." />
        </Helmet>
        <AppNavigationPage>
          <div className="rankings__page">
            <div className="rankings__content-wrapper">
              <div className="rankings__content">
                <div className="rankings__main-content">
                  <RankingsBannerIcon className="rankings__banner-icon"/>
    
                  <Text className="rankings__text" small>
                                        Dinamyc <span>leaderboards</span> that show la crème de la crème.
                  </Text>
    
                  <Text className="rankings__text" small>
                                        Are you ready? <span>Share the app</span> to unlock Rankings!
                  </Text>
    
                  <ArtworkImage 
                    image="0ba3f6b8-845b-4bc0-65dc-6c1984b12f00"
                    imageClassName="rankings__image" 
                    imageTemplateClassName="rankings__image-template"
                  />
    
                  <RankingsLockedIcon className="rankings__lock"/>
    
                  <Text className="rankings__text" small>
                                        Available when reaching <span className="rankings__max-count">100.000</span> Art Travelers
                  </Text>
    
                  <div className="rankings__progress-bar-outter">
                    <div className="rankings__progress-bar" style={{ width: `${(fetchData.totalDocs/100000)*100}%` }}/>
                  </div>
    
                  {navigator.share && (
                    <ContinueButton onClick={shareApp}>
                                            Share the app
                    </ContinueButton>
                  )}
                </div>
    
                <div className="rankings__latest-registers">
                  {fetchData.data.map(rankingItem => (
                    <div 
                      key={rankingItem._id} 
                      className="rankings__new-register" 
                      onClick={() => (
                        navigate(`/user/${rankingItem.user_username}`, {
                          state: {
                            from: true
                          }
                        })
                      )}
                    >
                      <UserProfileImage 
                        image={rankingItem.user_image?.image_id} 
                        typeOfProfile={rankingItem.user_type} 
                        className="rankings__new-register-image"
                      />
    
                      <Text className="rankings__new-register-text dots-on-overflow" small>
                        <span>{rankingItem.user_username}</span> has joined Suarte!
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AppNavigationPage>
      </>
    );
  }
}
