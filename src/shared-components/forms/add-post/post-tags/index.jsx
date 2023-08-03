import { useState } from 'react';

import Text from '@/shared-components/text/components/Text';

import PostTag from './components/PostTag';
import AddTagsPopup from './add-tags-popup';

import './index.css';

export default function PostTags({ formState, setFormState }) {
  const [openAddTagsPopup, setOpenAddTagsPopup] = useState(false);

  function addTag(tag) {
    setFormState(prevValue => ({
      ...prevValue,
      post_tags: [
        ...prevValue.post_tags,
        tag
      ]
    }));
  }

  function removeTag(tag) {
    setFormState(prevValue => ({
      ...prevValue,
      post_tags: prevValue.post_tags.filter(postTag => postTag.user_username !== tag.user_username)
    }));
  }

  return (
    <>
      <Text className="post-tags__add-tags element-non-selectable" onClick={()=>setOpenAddTagsPopup(true)} large>
                Add tags
      </Text>

      <AddTagsPopup
        open={openAddTagsPopup}
        close={()=>setOpenAddTagsPopup(false)}
        addTag={addTag}
        removeTag={removeTag}
        formState={formState}
      />

      <div className="post-tags__post-tags">
        {formState.post_tags.map(postTag => (
          <PostTag 
            key={postTag._id} 
            removeTag={removeTag} 
            tag={postTag}
          />
        ))}    
      </div>
    </>
  );
}
