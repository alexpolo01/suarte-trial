import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import './styles/ProfileAddButton.css';

export default function ProfileAddButton({ to, onClick=null }) {
  const navigate = useNavigate();

  return createPortal( /** Needs to be a portal because pull to refresh transform updates the position */
    <>
      <button className="profile-add-button__container" onClick={onClick ? onClick : ()=>navigate(to, { state: { from: true } })}>
        <div className="add-button-bar horizontal"/>
        <div className="add-button-bar vertical"/>
      </button>
    </>, document.getElementById("portal-generic-popup")
  );
}
