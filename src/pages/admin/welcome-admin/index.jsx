import { Link } from 'react-router-dom';

import './index.css';

export default function WelcomeAdmin() {
  return (
    <>
      <div className="welcome-admin__container">
        <div className="welcome-admin__box">
          <div>
            <h5 className="welcome-admin__box-header">REQUESTS</h5>
          </div>
          <div className="welcome-admin__links">
            <Link className="welcome-admin__link" to="gallery-requests">Galleries</Link>
            <Link className="welcome-admin__link" to="artwork-requests" style={{ marginRight: "20px" }}>Artworks</Link>
            <Link className="welcome-admin__link" to="limited-edition-requests">Limited Editions</Link>
            {/* <a className="welcome-admin__link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{ marginRight: "20px" }}>Ver datos bancarios de Pablo Gil Martinez</a> */}
          </div>
        </div>
        <div className="welcome-admin__box">
          <div>
            <h5 className="welcome-admin__box-header">CUSTOMIZATION</h5>
          </div>
          <div className="welcome-admin__links">
            <Link className="welcome-admin__customization" to="customize-home">Home</Link>
            <Link className="welcome-admin__customization" to="artwork-requests" style={{ marginLeft: "20px" }}>Search</Link>
          </div>
        </div>
      </div>
    </>
  );
}
