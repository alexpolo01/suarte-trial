import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import PostTag from '../components/PostTag';

import Search from './search';

import './index.css';

export default function AddTagsPopup({ open, close, addTag, removeTag, formState }) {
  return (
    <>
      <PopupToBottomSheet 
        open={open} 
        close={close} 
        popupOptions={{ opacity: true }}
      >
        <div className="post-tags__container">
          <div className="post-tags__header">
            <Text className="post-tags__header-text" medium>
                            Add tag
            </Text>

            <XIcon className="post-tags__close-button" onClick={close}/>
          </div>

          <Search addTag={addTag} formState={formState}/>

          <div className="post-tags__tags remove-scrollbar">
            {formState.post_tags.map(tag => (
              <PostTag 
                key={tag._id}
                tag={tag}  
                removeTag={removeTag} 
              />
            ))}
          </div>
        </div>
      </PopupToBottomSheet>
    </>
  );
}
