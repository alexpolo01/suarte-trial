import { useParams } from "react-router-dom";

import config from '@/config';
import useCache from '@/hooks/useCache';
import GoBackButton from "@/shared-components/buttons/components/GoBackButton";
import LoadingSpinnerPage from "@/shared-components/loaders/components/LoadingSpinnerPage";

import PostInfo from './components/PostInfo';
import PostNotFound from './components/PostNotFound';
import PostPictures from './components/PostPictures';
import Header from "./header";
import PostTags from './post-tags';

import './index.css';

export default function Post() {
  const { postId } = useParams();
  const { loading, fetchData } = useCache(`post_${postId}_view`, `${config.apis.api.url}/post/${postId}`, {
    injectToken: true,
    invalidateWhen: ["DELETE_POST"]
  });

  if(loading) {
    return (
      <>
        <GoBackButton/>
        <LoadingSpinnerPage/>
      </>
    );
  } else if(fetchData.error_type === "NOT_FOUND") {
    return (
      <PostNotFound/>
    );
  } else {
    return (
      <>
        <div className="post__container">
          <Header fetchData={fetchData}/>
    
          <main className="post__main">
            <img 
              className="post__cover"
              src={`${config.app.imageServiceDomain}/${fetchData.post_container.post_cover.image_id}/w=300`} 
              style={{ viewTransitionName: `post_${fetchData._id}_animation_cover` }}
              alt="Post cover"
            />
       
            <div className="post__content">
              <PostInfo fetchData={fetchData}/>

              <PostPictures postPictures={fetchData.post_container.post_pictures}/>
                            
              <PostTags postTags={fetchData.post_container.post_tags} fetchData={fetchData}/>
            </div>
          </main>
        </div>
      </>
    );
  }
}
