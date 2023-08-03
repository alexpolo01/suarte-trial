import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import './index.css';

function ModeAndThemeOption({ className="", text="", isActive=false, onClick=null }) {
  return (
    <>
      <div className={`settings-mode-theme__option${isActive ? " active" : ""} ${className} element-non-selectable`} onClick={onClick}>
        <div className="settings-mode-theme__option-circle"/>

        <Text className="settings-mode-theme__option-text" medium>
          {text}
        </Text>
      </div>
    </>
  );
}

export default function ModeAndTheme() {
  const { state, stateHandler } = useStateHandler();

  function updateMode(newMode) {
    stateHandler.set("user_session.user_preferences.mode", newMode);
    UserService.updateUserPreferences({ "user_preferences.mode": newMode });
  }

  function updateTheme(newTheme) {
    stateHandler.set("user_session.user_preferences.theme", newTheme);
    UserService.updateUserPreferences({ "user_preferences.theme": newTheme });
  }

  return (
    <>
      <SettingsHeading text="Mode and theme"/>

      <div className="settings-mode-theme__container">
        <Text className="settings-mode-theme__heading" large>
                    Mode
        </Text>

        <ModeAndThemeOption 
          className="dark-mode mode" 
          text="Dark" 
          isActive={state.user_session.user_preferences.mode === "dark"} 
          onClick={()=>updateMode("dark")}
        />

        <ModeAndThemeOption 
          className="light-mode mode" 
          text="Light" 
          isActive={state.user_session.user_preferences.mode === "light"} 
          onClick={()=>updateMode("light")}
        />

        <Text className="settings-mode-theme__heading" large>
                    Theme
        </Text>

        <ModeAndThemeOption 
          className="starry" 
          text="Starry moon" 
          isActive={state.user_session.user_preferences.theme === "starry_moon"} 
          onClick={()=>updateTheme("starry_moon")}
        />

        <ModeAndThemeOption 
          className="dancing" 
          text="Dancing on the grass" 
          isActive={state.user_session.user_preferences.theme === "dancing_on_the_grass"} 
          onClick={()=>updateTheme("dancing_on_the_grass")}
        />

        <ModeAndThemeOption 
          className="fountain" 
          text="Fountain of delights" 
          isActive={state.user_session.user_preferences.theme === "fountain_of_delights"} 
          onClick={()=>updateTheme("fountain_of_delights")}
        />

        <ModeAndThemeOption 
          className="water" 
          text="Water lily pond" 
          isActive={state.user_session.user_preferences.theme === "water_lily_pond"} 
          onClick={()=>updateTheme("water_lily_pond")}
        />

        <ModeAndThemeOption 
          className="violet" 
          text="Violet theme" 
          isActive={state.user_session.user_preferences.theme === "violet_theme"} 
          onClick={()=>updateTheme("violet_theme")}
        />
      </div>
    </>
  );
}