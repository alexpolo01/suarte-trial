import { useState } from 'react';

import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import Search from './search';

import './index.css';

export default function SearchUsers() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Text className="search-users__open-button element-non-selectable" onClick={()=>setOpen(true)} small>
                Click here to search users by name or username
      </Text>

      <PopupToBottomSheet 
        className="search-users-popup-bottom-sheet" 
        open={open} 
        close={()=>setOpen(false)} 
        popupOptions={{ opacity: true }}
      >
        <div className="search-users-content__container">
          <div className="search-users-content__header">
            <Text className="search-users-content__header-text" medium>
                            Search users
            </Text>

            <XIcon className="search-users-content__header-close" onClick={()=>setOpen(false)}/>
          </div>

          <Search/>
        </div>
      </PopupToBottomSheet>
    </>
  );
}
