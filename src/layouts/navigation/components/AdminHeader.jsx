import { Outlet, useNavigate } from 'react-router-dom';

import AuthService from '@/services/auth.service';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/AdminHeader.css';

export default function AdminHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="admin-header__navbar">
        <SuarteName className="admin-header__suarte-name" onClick={()=>navigate("/admin")}/>
        <h5><Heading className="admin-header__heading" medium>Panel de administración para la fase 0</Heading></h5>
        <button className="admin-header__logout" onClick={AuthService.logout}><Text className="admin-header__logout-text" large>Cerrar sesion</Text></button>
      </div>

      <Outlet/>
    </>
  );
}
