import { Link } from 'react-router-dom';

import './index.css';

export default function WelcomeAdmin() {
  return (
    <>
      <div className="welcome-admin__container">
        <div className="welcome-admin__links">
          <Link className="welcome-admin__link" to="gallery-requests">Ver solicitudes de galerias</Link>
          <Link className="welcome-admin__link" to="artwork-requests" style={{ marginRight: "20px" }}>Ver solicitudes de cuadros</Link>
          <Link className="welcome-admin__link" to="limited-edition-requests" style={{ marginRight: "20px" }}>Ver solicitudes de ediciones limitadas</Link>
          <a className="welcome-admin__link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{ marginRight: "20px" }}>Ver datos bancarios de Pablo Gil Martinez</a>
        </div>
      </div>
    </>
  );
}
