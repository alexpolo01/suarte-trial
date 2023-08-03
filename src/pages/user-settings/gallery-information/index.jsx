import config from '@/config';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import SettingsLoadingPage from '@/shared-components/loaders/components/SettingsLoadingPage';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import RepresentativeForm from './components/RepresentativeForm';

import './index.css';

export default function GalleryInformation() {
  const { state } = useStateHandler();
  const { loading, fetchData, setFetchData } = useCache(`${state.user_session._id}_gallery_information`, `${config.apis.api.url}/gallery/info`, {
    injectToken: true
  });

  function onEditGalleryAgent(newGalleryAgent) {
    setFetchData({
      ...fetchData,
      gallery_agent: newGalleryAgent
    });
  }

  if(loading) {
    return (
      <SettingsLoadingPage page="Gallery's information"/>
    );
  } else {
    return (
      <>
        <SettingsHeading text="Gallery's information"/>
    
        <div className="settings-gallery-information__container">
          <Text className="settings-gallery-information__heading" large>
                        Gallery's information
          </Text>
    
          <Text className="settings-gallery-information__static-text" paragraph medium>
                        Business ID: <span>{fetchData.gallery_business_id}</span>
          </Text>
    
          <Text className="settings-gallery-information__static-text" paragraph medium>
                        Location:{" "}
            <span>
              {
                `${fetchData.gallery_address.street}
                                (${fetchData.gallery_address.city}, 
                                ${fetchData.gallery_address.region}, 
                                ${fetchData.gallery_address.country}, 
                                ${fetchData.gallery_address.zip_code})`
              }
            </span>
          </Text>
    
          <Text className="settings-gallery-information__contact-us-text" paragraph medium>
                        Do you need to update any of this information? Contact us at
    
            <a className="settings-contact-us-link" href = "mailto: contact@suarte.art"> contact@suarte.art</a>.
          </Text>
    
          <Text className="settings-gallery-information__heading" large>
                        Representative's information
          </Text>
    
          <RepresentativeForm fetchData={fetchData} onEditGalleryAgent={onEditGalleryAgent}/>
        </div>
      </>
    );
  }
}