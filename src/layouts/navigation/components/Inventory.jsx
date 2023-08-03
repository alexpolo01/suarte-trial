import { Outlet, useLocation,useNavigate } from 'react-router-dom';

import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import './styles/Inventory.css';

export default function Inventory() {
  const goBackHandler = useGoBack("/profile");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="inventory-layout__page">
        <div className="inventory-layout__wrapper">
          <div className="inventory-layout__header-outter">
            <header className="inventory-layout__header">
              <span className="inventory-layout__header-text lt-s">
                                Inventory
              </span>

              <BackArrowIcon className="inventory-layout__back-button" onClick={goBackHandler}/>
            </header>
          </div>

          <div className="inventory-layout__outter-nav">
            <nav className={`inventory-layout__nav element-non-selectable ${location.pathname === "/inventory/available" ? "available" : location.pathname === "/inventory/pending" ? "pending" : "sold"}`}>
              <span className="inventory-layout__link mt-m available" onClick={()=>navigate("/inventory/available", { replace: true })}>
                                Available
              </span>

              <span className="inventory-layout__link mt-m pending" onClick={()=>navigate("/inventory/pending", { replace: true })}>
                                Pending approval
              </span>

              <span className="inventory-layout__link mt-m sold" onClick={()=>navigate("/inventory/sold", { replace: true })}>
                                Sold
              </span>

              <div className="inventory-layout__active-bar"/>
            </nav>
          </div>

          <div className="inventory-layout__content">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
