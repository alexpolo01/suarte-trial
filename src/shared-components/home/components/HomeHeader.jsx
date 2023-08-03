import useGoBack from '@/hooks/useGoBack';
import SearchNavbarIcon from '@/shared-components/icons/components/navigation/SearchNavbarIcon';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import Heading from '@/shared-components/text/components/Heading';

import './styles/HomeHeader.css';

export default function HomeHeader({ onInput, value, icon, text, placeholder }) {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="home-header__container element-non-selectable">
        <div className="home-header__back-section" onClick={goBackHandler}>
          <BackArrowIcon className="home-header__back-icon"/>

          {icon}

          <Heading className={`home-header__back-text ${!icon ? "no-icon" : ""}`} small>
            {text}
          </Heading>
        </div>

        <div className="home-header__search-container">
          <SearchNavbarIcon className="home-header__search-icon"/>

          <input 
            type="text" 
            className="home-header__search-input" 
            value={value} 
            onInput={(e)=>onInput(e.target.value)} 
            placeholder={placeholder} 
            spellCheck={false} 
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
