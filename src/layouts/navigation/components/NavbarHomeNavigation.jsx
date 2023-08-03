import { useNavigate } from 'react-router-dom';

import useProtectAction from '@/hooks/useProtectAction';
import Text from '@/shared-components/text/components/Text';

import './styles/NavbarHomeNavigation.css';

export default function NavbarHomeNavigation({ active }) {
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  const navigate = useNavigate();
    
  return (
    <>
      <div className="navbar-home-navigation__links element-non-selectable">
        <div className={`navbar-home-navigation__link ${active === "discover" ? "active" : ""}`} onClick={() => navigate("/", { replace: true, end: true })}>
          <Text className="navbar-home-navigation__link-text" medium>Discover</Text>
        </div>
        
        <div className={`navbar-home-navigation__link ${active === "following" ? "active" : ""}`} onClick={() => privateActionHandler(() => navigate("/following", { replace: true }))}>
          <Text className="navbar-home-navigation__link-text" medium>Following</Text>
        </div>
      </div>
    </>
  );
}
