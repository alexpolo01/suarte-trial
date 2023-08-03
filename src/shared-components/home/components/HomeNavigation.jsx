import SuarteName from '@/shared-components/icons/components/public/SuarteName';

// import NavbarHomeNavigation from '@/layouts/navigation/components/NavbarHomeNavigation';
import './styles/HomeNavigation.css';

// eslint-disable-next-line no-unused-vars
export default function HomeNavigation({ active }) {
  return (
    <>
      <div className="home-navigation__container">
        <SuarteName className="home-navigation__suarte-name"/>
        {/* <NavbarHomeNavigation active={active}/> */}
      </div>
    </>
  );
}
