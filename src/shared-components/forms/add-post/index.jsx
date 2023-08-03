import { useState } from 'react';

import FixedCharInput from '@/shared-components/inputs/components/FixedCharInput';
import ResizableTextarea from '@/shared-components/inputs/components/ResizableTextarea';
import Utils from '@/utils';

import Cover from './cover';
import Header from './header';
import PostPictures from './post-pictures';
import PostTags from './post-tags';

import './index.css';

export default function AddPostForm({ postData=null, editMode=false }) {
  const [formState, setFormState] = useState(Utils.initPostFormState(postData));
  const [error, setError] = useState(null);

  return (
    <>
      <div className="add-post__container">
        <Header 
          formState={formState}
          setFormError={setError} 
          editMode={editMode}
        />

        <main className="add-post__main">
          <form onSubmit={(e)=>e.preventDefault()} className="add-post__main-form">
            <div className="add-post__cover-section">
              <Cover 
                formState={formState}
                setFormState={setFormState} 
                element="post_cover" 
                formError={error} 
                setFormError={setError}
              />
            </div>

            <div className="add-post__post-main-section">
              <FixedCharInput 
                element="post_title" 
                maxChar={47} 
                error={error} 
                placeholder="Set a title for this post" 
                large 
                margin
                value={formState.post_title} 
                onChange={(e)=>setFormState(prevValue => ({
                  ...prevValue,
                  post_title: e.target.value
                }))}
              />

              <ResizableTextarea 
                className="add-post__main-textarea-height" 
                placeholder="Enter a text..." 
                element="post_main_text" 
                error={error} 
                ignoreHeader
                value={formState.post_main_text} 
                onChange={(e)=>setFormState(prevValue => ({
                  ...prevValue,
                  post_main_text: e.target.value
                }))}
              />

              <PostPictures 
                formState={formState}
                setFormState={setFormState} 
              />

              <PostTags 
                formState={formState}
                setFormState={setFormState}  
              />
            </div>
          </form> 
        </main>
      </div>
    </>
  );
}
