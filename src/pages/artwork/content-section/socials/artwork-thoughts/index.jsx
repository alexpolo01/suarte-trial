import { useState } from 'react';

import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

import SocialsHeader from '../components/SocialsHeader';

import ThoughtInput from './components/ThoughtInput';
import ThoughtsLoading from './components/ThoughtsLoading';
import useArtworkThoughts from './hooks/useArtworkThoughts';
import MentionVirtualList from './mention-virtual-list';
import ThoughtsVirtualList from './thoughts-virtual-list';

import './index.css';

export default function ArtworkThoughts({ closeSocial }) {
  const { loading, fetchData, loadMoreThoughts, loadRepliesOfThought, publishThought, onLikeAction } = useArtworkThoughts();
  const [reply, setReply] = useState(null);
  const [mention, setMention] = useState(null);

  return (
    <>
      <div 
        className="artwork-view-thoughts__container" 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
      >
        <SocialsHeader close={closeSocial} type="thoughts"/>

        {
          loading ?
            <ThoughtsLoading/>
            :
            <div className="artwork-view-thoughts__main">
              <div className="artwork-view-thoughts__body">
                {
                  fetchData.data.length === 0 ?
                    <Text className="artwork-view-thoughts__empty-thoughts" paragraph small>
                                            Be the first to share your thoughts on this artwork!
                    </Text>
                    :
                    <ThoughtsVirtualList
                      fetchData={fetchData}
                      loadMoreThoughts={loadMoreThoughts}
                      loadRepliesOfThought={loadRepliesOfThought}
                      setReply={setReply}
                      onLikeAction={onLikeAction}
                    />                                
                }

                {Boolean(reply) && (
                  <div className="artwork-view-thoughts__reply-status">
                    <Text className="artwork-view-thoughts__reply-text" small>
                                            Replying to <span>{reply.thought_creator.user_username}</span>
                    </Text>

                    <XIcon className="artwork-view-thoughts__reply-close" onClick={()=>setReply(null)}/>
                  </div>
                )}

                {Boolean(mention) && (
                  <MentionVirtualList mention={mention} setMention={setMention}/>
                )}
              </div>

              <ThoughtInput
                reply={reply}
                setReply={setReply}
                setMention={setMention}
                publishThought={publishThought}
              />
            </div>
        }
      </div>
    </>
  );
}
