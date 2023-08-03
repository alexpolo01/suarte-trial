import { useNavigate } from 'react-router-dom';

import config from '@/config';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function RouteNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="route-not-found__page" style={{ backgroundImage: `url(${config.app.imageServiceDomain}/287f3610-3513-446d-5779-91763bdbe000/w=2000)` }}>
        <img 
          src={`${config.app.imageServiceDomain}/ead67082-05eb-49a7-342b-8559d229ce00/w=600`} 
          alt="Frame" 
          className="route-not-found__frame" 
        />

        <div className="route-not-found__content">
          <span className="route-not-found__numbers">
                        404
          </span>

          <span className="route-not-found__text">
                        not found
          </span>
                    
          <Text className="route-not-found__button element-non-selectable" onClick={()=>navigate("/", { replace: true })} medium>
                        Go home
          </Text>
        </div>

      </div>
    </>
  );
}
