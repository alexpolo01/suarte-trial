import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import ActivityIcon from '@/shared-components/icons/components/navigation/ActivityIcon';
import OrdersIcon from '@/shared-components/icons/components/navigation/OrdersIcon';
import ReferralsIcon from '@/shared-components/icons/components/navigation/ReferralsIcon';
import SavedArtworksIcon from '@/shared-components/icons/components/navigation/SavedArtworksIcon';
import SettingsIcon from '@/shared-components/icons/components/navigation/SettingsIcon';
import ArtworkIcon from '@/shared-components/icons/components/new-icons/ArtworkIcon';
import InvoicesIcon from '@/shared-components/icons/components/new-icons/InvoicesIcon';
import SuarteroadIcon from '@/shared-components/icons/components/new-icons/SuarteroadIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ProfileOptions.css';

export default function ProfileOptions({ fetchData, open, setOpen }) {
  useEffect(()=>{
    if(open === true) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  useEffect(()=>{
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  if(!open) {
    return <></>;
  } else if(fetchData.user_type === "artist" || fetchData.user_type === "collector") {
    return createPortal(
      <>
        <div className="profile-options__background" onClick={()=>setOpen(false)}>
          <div className="profile-options__options-outter">
            <div className="profile-options__options">
              <Link className="profile-options__option" to="suarte-road" state={{ from: true }}>
                <Text className="profile-options__option-text delay1" small>
                                    Suarte Road
                </Text>

                <div className="profile-options__option-icon-container delay1">
                  <SuarteroadIcon className="profile-options__option-icon"/>
                </div>
              </Link>

              <Link className="profile-options__option" to="/orders/pending" state={{ from: true }}>
                <Text className="profile-options__option-text delay2" small>
                                    Orders
                </Text>

                <div className="profile-options__option-icon-container delay2">
                  <OrdersIcon className="profile-options__option-icon"/>
                </div>
              </Link>

              <Link className="profile-options__option" to="activity" state={{ from: true }}>
                <Text className="profile-options__option-text delay3" small>
                                    Activity
                </Text>

                <div className="profile-options__option-icon-container delay3">
                  <ActivityIcon className="profile-options__option-icon"/>
                </div>
              </Link>

              <Link className="profile-options__option" to="activity/saved-artworks" state={{ from: true }}>
                <Text className="profile-options__option-text delay4" small>
                                    Saved artworks
                </Text>

                <div className="profile-options__option-icon-container delay4">
                  <SavedArtworksIcon className="profile-options__option-icon saved"/>
                </div>
              </Link>

              <Link className="profile-options__option" to="settings" state={{ from: true }}>
                <Text className="profile-options__option-text delay5" small>
                                    Settings
                </Text>

                <div className="profile-options__option-icon-container delay5">
                  <SettingsIcon className="profile-options__option-icon"/>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>, document.getElementById("portal-profile-options")
    );
  } else {
    return createPortal(
      <>
        <div className="profile-options__background" onClick={()=>setOpen(false)}>
          <div className="profile-options__options-outter">
            <div className="profile-options__options">
              <Link className="profile-options__option" to="/inventory/available" state={{ from: true }}>
                <Text className="profile-options__option-text delay1" small>
                                    Inventory
                </Text>

                <div className="profile-options__option-icon-container delay1">
                  <ArtworkIcon className="profile-options__option-icon"/>
                </div>
              </Link>
    
              <Link className="profile-options__option" to="/orders/pending" state={{ from: true }}>
                <Text className="profile-options__option-text delay2" small>
                                    Orders
                </Text>

                <div className="profile-options__option-icon-container delay2">
                  <OrdersIcon className="profile-options__option-icon"/>
                </div>
              </Link>
    
              <Link className="profile-options__option" to="activity" state={{ from: true }}>
                <Text className="profile-options__option-text delay3" small>
                                    Activity
                </Text>

                <div className="profile-options__option-icon-container delay3">
                  <ActivityIcon className="profile-options__option-icon"/>
                </div>
              </Link>
    
              <Link className="profile-options__option" to="invoices" state={{ from: true }}>
                <Text className="profile-options__option-text delay4" small>
                                    Invoices
                </Text>

                <div className="profile-options__option-icon-container delay4">
                  <InvoicesIcon className="profile-options__option-icon"/>
                </div>
              </Link>
    
              <Link className="profile-options__option" to="activity/saved-artworks" state={{ from: true }}>
                <Text className="profile-options__option-text delay5" small>
                                    Saved artworks
                </Text>

                <div className="profile-options__option-icon-container delay5">
                  <SavedArtworksIcon className="profile-options__option-icon saved"/>
                </div>
              </Link>
    
              <Link className="profile-options__option" to="referrals" state={{ from: true }}>
                <Text className="profile-options__option-text delay6" small>
                                    Referrals
                </Text>

                <div className="profile-options__option-icon-container delay6">
                  <ReferralsIcon className="profile-options__option-icon referrals"/>
                </div>
              </Link>
    
              <Link className="profile-options__option" to="settings" state={{ from: true }}>
                <Text className="profile-options__option-text delay7" small>
                                    Settings
                </Text>
                                
                <div className="profile-options__option-icon-container delay7">
                  <SettingsIcon className="profile-options__option-icon"/>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>, document.getElementById("portal-profile-options")
    );
  }
}
