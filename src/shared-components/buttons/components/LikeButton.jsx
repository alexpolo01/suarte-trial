import { useEffect,useState } from 'react';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useProtectAction from '@/hooks/useProtectAction';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import LikeIcon from '@/shared-components/icons/components/actions/LikeIcon';

import "./styles/LikeButton.css";

export default function LikeButton({ itemId, typeOfItem, isLiked, className="", onLikeAction=null }) {
  const { cacheHandler } = useStateHandler();
  const [likeStatus, setLikeStatus] = useState(initLikeStatus());
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  const isFirstRender = useIsFirstRender();

  useEffect(()=>{
    if(!isFirstRender) {
      setLikeStatus(initLikeStatus());
    }
  }, [isLiked]);

  function initLikeStatus() {
    const cachedAction = cacheHandler.getCacheValue(`user_actions.like.${typeOfItem}_${itemId}`);
    return cachedAction ? cachedAction.data : isLiked; 
  }

  function handleLikeAction() {
    if(likeStatus === true) {
      UserService.unlikeItem(typeOfItem, itemId);
      cacheHandler.storeInCache(`user_actions.like.${typeOfItem}_${itemId}`, false, { type: "@cache/no-expiration" });
      setLikeStatus(false);

      if(onLikeAction) {
        onLikeAction(false);
      }
    } else {
      UserService.likeItem(typeOfItem, itemId);
      cacheHandler.storeInCache(`user_actions.like.${typeOfItem}_${itemId}`, true, { type: "@cache/no-expiration" });
      setLikeStatus(true);
            
      if(onLikeAction) {
        onLikeAction(true);
      }
    }

    cacheHandler.triggerAction(`LIKE_${typeOfItem}`);
  }

  return (
    <>
      <LikeIcon 
        className={`like-button__button ${className} ${likeStatus === true ? "active" : ""}`} 
        onClick={(e)=>{
          e.stopPropagation(); 
          privateActionHandler(handleLikeAction);
        }}
      />
    </>
  );
}
