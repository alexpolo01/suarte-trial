import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoSizer, List,WindowScroller } from 'react-virtualized';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useCache from '@/hooks/useCache';
import GalleryService from '@/services/gallery.service';
import RemoveIconCircle from '@/shared-components/icons/components/actions/RemoveIconCircle';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function ProfilePostDrafts() {
  const { profileData, setProfileData } = useContext(ProfileDataContext);
  const { loading, fetchData, setFetchData, loadMoreData } = useCache(`${profileData._id}_post_drafts`, `${config.apis.api.url}/posts/status/incomplete`, {
    injectToken: true, 
    invalidateWhen: ["POST_DRAFT_SAVED", "SUBMIT_POST", `${profileData._id}_REFRESH`]
  });
  const navigate = useNavigate();

  function removeDraft(draftId) {
    const newTotalDocs = fetchData.totalDocs - 1;

    setFetchData({
      ...fetchData,
      totalDocs: newTotalDocs,
      data: fetchData.data.filter(draft => draft._id !== draftId)
    });
    setProfileData({
      ...profileData,
      post_draft_count: newTotalDocs
    });
    GalleryService.removePostDraft(draftId); 
  }

  return (
    <>
      <div className="posts-drafts__go-back" onClick={()=>navigate("/profile/board", { replace: true, preventScrollReset: true })}>
        <BackArrowIcon className="posts-drafts__go-back-icon"/>
                
        <Text className="posts-drafts__go-back-text" medium paragraph>
                    Posts
        </Text>
      </div>

      {
        loading ? 
          <CustomSpinner className="post-drafts__loading" thin/> 
          : fetchData.data.length === 0 ? 
            <Text className="post-drafts__no-drafts" paragraph small>
                        No post drafts available.
            </Text>
            :
            <div className="post-drafts__container">
              <InfiniteScroll 
                className="post-tags-virtual-list__container remove-scrollbar" 
                onLoadMore={loadMoreData} 
                shouldLoadMore={fetchData.data.length < fetchData.totalDocs} 
                offsetElements={3} 
                listLength={fetchData.data.length} 
                defaultInfiniteLoaderClassName="post-tags-virtual-list__spinner"
              >
                {({ infiniteScrollAssigner }) => (
                  <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                      <AutoSizer disableHeight>
                        {({ width }) => (
                          <List
                            autoHeight
                            width={width === 0 ? 0.1 : width}
                            height={height}
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            rowCount={fetchData.data.length}
                            rowHeight={56}
                            scrollTop={scrollTop}
                            overscanRowCount={3}
                            rowRenderer={({ index, key, style }) => (
                              <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                                <div 
                                  className="post-drafts__draft element-non-selectable" 
                                  onClick={() => (
                                    navigate("/profile/add-post", {
                                      state: {
                                        draftData: fetchData.data[index], 
                                        from: true
                                      } }
                                    )
                                  )}
                                >
                                  <RemoveIconCircle 
                                    className="post-drafts__remove-draft" 
                                    onClick={(e) => {
                                      e.stopPropagation(); 
                                      removeDraft(fetchData.data[index]._id);
                                    }}
                                  />
        
                                  <Text className="post-drafts__draft-title dots-on-overflow" medium>
                                    {fetchData.data[index].post_container.post_title}
                                  </Text>
                                                                
                                  <ForwardArrowIcon className="post-drafts__enter-draft"/>
                                </div>
                              </div>
                            )}
                          />
                        )}
                      </AutoSizer>
                    )}
                  </WindowScroller>
                )}
              </InfiniteScroll>
            </div>
      }
    </>
  );
}
