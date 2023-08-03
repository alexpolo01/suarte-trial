import RippleButton from '@/shared-components/buttons/components/RippleButton';
import Text from '@/shared-components/text/components/Text';

import './styles/AuthNavigation.css';

export default function AuthNavigation({ currentPage, setCurrentPage }) {
  const activeTab = ["login", "forgot"].includes(currentPage) ? "login" : "signup";

  return (
    <>
      <div className="auth-navigation__container">
        <RippleButton className={`auth-navigation__tab ${activeTab === "login" ? "active" : ""}`} onClick={()=>setCurrentPage("login")}>
          <Text className="auth-navigation__tab-text" large>Log in</Text>
        </RippleButton>

        <RippleButton className={`auth-navigation__tab ${activeTab === "signup" ? "active" : ""}`} onClick={()=>setCurrentPage("signup-selector")}>
          <Text className="auth-navigation__tab-text" large>Sign up</Text>
        </RippleButton>
      </div>
    </>
  );
}
