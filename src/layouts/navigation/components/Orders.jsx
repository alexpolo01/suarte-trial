import { Outlet, useLocation,useNavigate } from 'react-router-dom';

import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import './styles/Orders.css';

export default function Orders() {
  const goBackHandler = useGoBack("/profile");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="orders-layout__page">
        <div className="orders-layout__wrapper">
          <div className="orders-layout__header-outter">
            <header className="orders-layout__header">
              <span className="orders-layout__header-text lt-s">
                                Orders
              </span>

              <BackArrowIcon className="orders-layout__back-button" onClick={goBackHandler}/>
            </header>
          </div>

          <div className="orders-layout__outter-nav">
            <nav className={`orders-layout__nav element-non-selectable ${location.pathname === "/orders/sent" ? "sent" : location.pathname === "/orders/completed" ? "completed" : "pending"}`}>
              <span className="orders-layout__link mt-m pending" onClick={()=>navigate("/orders/pending", { replace: true })}>
                                Pending
              </span>

              <span className="orders-layout__link mt-m sent" onClick={()=>navigate("/orders/sent", { replace: true })}>
                                Sent
              </span>

              <span className="orders-layout__link mt-m completed" onClick={()=>navigate("/orders/completed", { replace: true })}>
                                Completed
              </span>

              <div className="orders-layout__active-bar"/>
            </nav>
          </div>

          <div className="orders-layout__content">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
