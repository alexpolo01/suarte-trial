import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGoBack from '@/hooks/useGoBack';
import useStateHandler from '@/hooks/useStateHandler';
import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import EditArtlistIcon from '@/shared-components/icons/components/actions/EditArtlistIcon';
import ShareProfileIcon from '@/shared-components/icons/components/actions/ShareProfileIcon';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import ThreeDotsIcon from '@/shared-components/icons/components/public/ThreeDotsIcon';

import DeletePost from './components/DeletePost';
import HeaderOption from './components/HeaderOption';

import './index.css';

export default function Header({ fetchData }) {
  const { state } = useStateHandler();
  const [openHeaderOptions, setOpenHeaderOptions] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const goBackHandler = useGoBack("/");
  const navigate = useNavigate();

  function sharePost() {
    navigator.share({
      title: `${fetchData.post_container.post_title}`,
      text: `Take a look at @${fetchData.gallery.user_username}'s post: ${fetchData.post_container.post_title}`,
      url: `https://suarte.art/post/${fetchData._id}`
    });
  }

  function isCreator() {
    return fetchData.gallery._id === state.user_session?._id;
  }

  return (
    <>
      <nav className="post-header__container">
        <BackArrowIcon className="post-header__go-back" onClick={goBackHandler}/>

        {
          isCreator() ? 
            <div 
              tabIndex={0} 
              onClick={()=>setOpenHeaderOptions(!openHeaderOptions)} 
              onBlur={()=>setOpenHeaderOptions(false)} 
              className="post-header__threedots-container"
            >
              <ThreeDotsIcon className="post-header__threedots-icon"/>

              <div className={`element-non-selectable post-header__options${openHeaderOptions ? " active" : ""}`}>
                <HeaderOption
                  text="Edit post"
                  icon={<EditArtlistIcon className="post-header__option-icon edit"/>}
                  onClick={() => (
                    navigate("/profile/edit-post", {
                      state: {
                        from: true, 
                        postData: fetchData
                      }
                    })
                  )}
                />

                <HeaderOption
                  text="Delete post"
                  icon={<RemoveButton className="post-header__option-delete"/>}
                  onClick={()=>setOpenDeleteDialog(true)}
                />

                {navigator.share && (
                  <HeaderOption
                    text="Share"
                    icon={<ShareProfileIcon className="post-header__option-icon"/>}
                    onClick={sharePost}
                  />
                )}
              </div>
            </div>
            :
            navigator.share && <ShareProfileIcon className="post-header__share-icon" onClick={sharePost}/>
        }
      </nav>

      <DeletePost 
        open={openDeleteDialog} 
        close={()=>setOpenDeleteDialog(false)} 
        fetchData={fetchData}
      />
    </>
  );
}
