import useGoBack from '@/hooks/useGoBack';
import ShareProfileIcon from '@/shared-components/icons/components/actions/ShareProfileIcon';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import ViewsIcon from "@/shared-components/icons/components/user-profile/ViewsIcon";

import './styles/PostNotFound.css';

export default function PostNotFound() {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="post-not-found__container">
        <div className="post-not-found__header">
          <BackArrowIcon className="post-not-found__go-back" onClick={goBackHandler}/>
          <ShareProfileIcon className="post-not-found__share-icon"/>
        </div>

        <div className="post-not-found__main">
          <div className="post-not-found__cover"/>

          <div className="post-not-found__content">
            <h1 className="post-not-found__title">
                            Post not found
            </h1>

            <div className="post-not-found__info">
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                <div className="post-not-found__text" style={{ width: "25%", minWidth: "74px" }}/>
                <div className="post-not-found__separator"/>
                <div className="post-not-found__text" style={{ width: "25%", minWidth: "74px" }}/>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="post-not-found__text" style={{ width: "40px" }}/>
                <ViewsIcon className="post-not-found__view-icon"/>
              </div>
            </div>

            <div className="post-not-found__text" style={{ marginBottom: "10px" }}/>
            <div className="post-not-found__text" style={{ marginBottom: "10px" }}/>
            <div className="post-not-found__text" style={{ marginBottom: "10px" }}/>
            <div className="post-not-found__text" style={{ marginBottom: "10px" }}/>
            <div className="post-not-found__text" style={{ marginBottom: "10px" }}/>
            <div className="post-not-found__text" style={{ width: "40%" }}/>
          </div>
        </div>
      </div>
    </>
  );
}
