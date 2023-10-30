// eslint-disable-next-line simple-import-sort/imports
import { useNavigate } from 'react-router-dom';
import './index.css';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

export default function HomeCustomization() {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="home-customization__container">
      <div className="home-customization__header">
        <BackArrowIcon className="home-customization__header-back" onClick={onClickBack}/>
        <h4 className="home-customization__header-text">Home</h4>
        <div></div>
      </div>
      <div className="home-customization__box">
        <a className="home-customization__link">Fresh Picks</a>
        <a className="home-customization__link">Human Expression</a>
        <a className="home-customization__link">Harmony</a>
        <a className="home-customization__link">Color expression</a>
        <a className="home-customization__link">ADD CAROUSEL</a>
      </div>
    </div>
  );
}
