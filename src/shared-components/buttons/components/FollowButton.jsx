import { useState } from 'react';

import useProtectAction from '@/hooks/useProtectAction';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import Text from '@/shared-components/text/components/Text';

import './styles/FollowButton.css';

export default function FollowButton({ userId, imFollowing, isFollowingMe, onFollowAction, className="", extraSmall=false, small=false, medium=false, large=false }) {
  const { cacheHandler, state } = useStateHandler();
  const [followStatus, setFollowStatus] = useState(initFollowStatus());
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });

  function initFollowStatus() {
    const cachedAction = cacheHandler.getCacheValue(`user_actions.follow.${userId}`);
    return cachedAction ? cachedAction.data : imFollowing; 
  }

  function handleFollowAction() {
    if(followStatus) {
      UserService.unfollowUser(userId);
      cacheHandler.storeInCache(`user_actions.follow.${userId}`, false, { type: "@cache/no-expiration" });
      setFollowStatus(false);

      if(onFollowAction) {
        onFollowAction(false);
      }
    } else {
      UserService.followUser(userId);
      cacheHandler.storeInCache(`user_actions.follow.${userId}`, true, { type: "@cache/no-expiration" });
      setFollowStatus(true);

      if(onFollowAction) {
        onFollowAction(true);
      }
    }

    cacheHandler.triggerAction(`FOLLOW_ACTION_ON_${userId}`);
  }

  /** This prevents the user from following himself */
  if(state.user_session?._id === userId) {
    return <></>;
  }

  return (
    <>
      <Text 
        className={`follow-button__button ${className} ${followStatus === true ? "fill" : ""}`} 
        extraSmall={extraSmall} 
        small={small} 
        medium={medium} 
        large={large}
        onClick={(e) => {
          e.stopPropagation(); 
          privateActionHandler(handleFollowAction);
        }}
      >
        {
          followStatus === true ? 
            "Following"
            : isFollowingMe === true ? 
              "Follow back" 
              : 
              "Follow"
        }
      </Text>
    </>
  );
}
