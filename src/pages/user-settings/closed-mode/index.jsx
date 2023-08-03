import useStateHandler from '@/hooks/useStateHandler';
import ClosedDoorIcon from '@/shared-components/icons/components/settings/ClosedDoorIcon';
import OpenedDoorIcon from '@/shared-components/icons/components/settings/OpenedDoorIcon';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import ClosedModeForm from './components/ClosedModeForm';

import './index.css';

export default function ClosedMode() {
  const { state } = useStateHandler();

  return (
    <>
      <SettingsHeading text="Closed mode"/>

      <div className="settings-closed-mode__container">
        {/* <Text className="settings-closed-mode__text margin" paragraph medium justify>
                    <span style={{fontWeight: "600", fontStyle: "italic"}}>Closed Mode</span> is a feature that allows 
                    galleries to take a break from selling on the platform for up to 45 days per year, giving them 
                    the freedom to step away from the pressure of e-commerce without affecting their presence on the platform.
                </Text> */}

        <Text className="settings-closed-mode__text margin" paragraph medium justify>
          <span style={{ fontWeight: "600", fontStyle: "italic" }}>Closed Mode</span> is a feature that 
                    allows galleries to take a break from selling on the platform, giving them the freedom to 
                    step away from the pressure of e-commerce without affecting their presence on the platform.
        </Text>

        <Text className="settings-closed-mode__text margin" paragraph medium justify>
                    When you activate <span style={{ fontWeight: "600", fontStyle: "italic" }}>closed mode</span>, your gallery's profile and artworks will 
                    still be visible on the platform. However, potential buyers will not be able to purchase your artworks.
        </Text>

        <Text className="settings-closed-mode__text" paragraph medium justify>
                    Additionally, you can customize a message to be displayed during this time.
        </Text>

        {/* {
                    fetchData.days_remaining === 0 ? 
                        <Text className="settings-closed-mode__limit-text" paragraph medium justify>
                            Your gallery has reached the 45-day annual limit. You won't be able to close it until next year.
                        </Text>
                    :
                        <ClosedModeForm fetchData={fetchData} setFetchData={setFetchData}/>
                } */}

        <ClosedModeForm closedModeData={state.user_session.gallery_closed}/>

        {
          state.user_session.gallery_closed ?
            <ClosedDoorIcon className="settings-closed-mode__door"/>
            :
            <OpenedDoorIcon className="settings-closed-mode__door"/>
        }
      </div>
    </>
  );
}
