import { NavLink } from 'react-router-dom';

import RippleButton from '@/shared-components/buttons/components/RippleButton';
import Text from '@/shared-components/text/components/Text';

import './styles/Tabs.css';

export default function Tabs({ artworksCount }) {
  return (
    <>
      <div className="verify-gallery__tabs-container">
        <RippleButton className="verify-gallery__tab-button">
          <NavLink 
            className={({ isActive }) => isActive ? `verify-gallery__tab active` : "verify-gallery__tab"} 
            to="/verify-gallery/uploaded-artworks" 
            replace
          >
            <Text large>
                                Uploaded artworks
            </Text>
          </NavLink>
        </RippleButton>

        <RippleButton className="verify-gallery__tab-button">
          <NavLink 
            className={({ isActive }) => isActive ? `verify-gallery__tab active` : `verify-gallery__tab ${artworksCount > 0 ? "not-empty" : ""}`} 
            to="/verify-gallery/verified-artworks" 
            replace
          >
            <Text large>
                                Verified artworks
            </Text>
          </NavLink>
        </RippleButton>
      </div>
    </>
  );
}
