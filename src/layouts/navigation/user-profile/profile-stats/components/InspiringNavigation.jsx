import RippleButton from "@/shared-components/buttons/components/RippleButton";
import Text from "@/shared-components/text/components/Text";

import './styles/InspiringNavigation.css';

export default function InspiringNavigation({ currentPage, setCurrentPage, inspiringCount, followingCount }) {
  const activeTab = currentPage;

  return (
    <>
      <div className="search-inspiring-navigation__container">
        <RippleButton className={`search-inspiring-navigation__tab ${activeTab === "inspiring" ? "active" : ""}`} onClick={()=>setCurrentPage("inspiring")}>
          <Text className="search-inspiring-navigation__tab-text" large>Inspiring ({inspiringCount})</Text>
        </RippleButton>

        <RippleButton className={`search-inspiring-navigation__tab ${activeTab === "following" ? "active" : ""}`} onClick={()=>setCurrentPage("following")}>
          <Text className="search-inspiring-navigation__tab-text" large>Following ({followingCount})</Text>
        </RippleButton>
      </div>
    </>
  );
}