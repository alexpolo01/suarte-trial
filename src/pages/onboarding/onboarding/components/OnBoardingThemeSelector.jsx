import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';

import './styles/OnBoardingThemeSelector.css';

export default function OnBoardingThemeSelector({ className, setActiveSlide, user_type }) {
  const { state, stateHandler } = useStateHandler();
  const [selectedTheme, setSelectedTheme] = useState("starry_moon");

  function changeTheme(theme) {
    stateHandler.set("user_session.user_preferences.theme", theme);
    setSelectedTheme(theme);
  }

  function commitTheme() {
    UserService.updateUserPreferences({ "user_preferences.theme": selectedTheme });

    if(user_type === "gallery") setActiveSlide(2);
    else setActiveSlide(3);
  }

  return (
    <>
      <div className={className}>
        <p className="onboarding-theme__text">How would you like to enjoy the app view?</p>

        <div className={`onboarding-theme__theme-container starry ${state.user_session.user_preferences.theme === "starry_moon" ? "active" : ""} ${user_type === "collector" ? "less-margin" : ""} ${user_type === "gallery" ? "less-margin-gallery" : ""}`} onClick={()=>{changeTheme("starry_moon");}}>
          <div className="onboarding-theme__theme-button"/>
          <p className="onboarding-theme__theme-name">Starry moon</p>
        </div>

        <div className={`onboarding-theme__theme-container dancing ${state.user_session.user_preferences.theme === "dancing_on_the_grass" ? "active" : ""} ${user_type === "collector" ? "less-margin" : ""} ${user_type === "gallery" ? "less-margin-gallery" : ""}`} onClick={()=>{changeTheme("dancing_on_the_grass");}}>
          <div className="onboarding-theme__theme-button"/>
          <p className="onboarding-theme__theme-name">Dancing on the grass</p>
        </div>

        <div className={`onboarding-theme__theme-container fountain ${state.user_session.user_preferences.theme === "fountain_of_delights" ? "active" : ""} ${user_type === "collector" ? "less-margin" : ""} ${user_type === "gallery" ? "less-margin-gallery" : ""}`} onClick={()=>{changeTheme("fountain_of_delights");}}>
          <div className="onboarding-theme__theme-button"/>
          <p className="onboarding-theme__theme-name">Fountain of delights</p>
        </div>

        <div className={`onboarding-theme__theme-container water ${state.user_session.user_preferences.theme === "water_lily_pond" ? "active" : ""} ${user_type === "collector" ? "less-margin" : ""} ${user_type === "gallery" ? "less-margin-gallery" : ""}`} onClick={()=>{changeTheme("water_lily_pond");}}>
          <div className="onboarding-theme__theme-button"/>
          <p className="onboarding-theme__theme-name">Water lily pond</p>
        </div>

        <div className={`onboarding-theme__theme-container violet ${state.user_session.user_preferences.theme === "violet_theme" ? "active" : ""} ${user_type === "collector" ? "less-margin" : ""} ${user_type === "gallery" ? "less-margin-gallery" : ""}`} onClick={()=>{changeTheme("violet_theme");}}>
          <div className="onboarding-theme__theme-button"/>
          <p className="onboarding-theme__theme-name">Violet theme</p>
        </div>

        <p className="onboarding-theme__text">These preferences can be later modified.</p>

        <ContinueButton round className={`onboarding-theme__next-button ${user_type === "gallery" ? "less-margin" : ""}`} onClick={commitTheme}>
                    Next
        </ContinueButton>
      </div>
    </>
  );
}
