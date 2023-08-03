import { useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGoBack from '@/hooks/useGoBack';
import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Utils from '@/utils';

import SaveAsDraftDialog from './components/SaveAsDraftDialog';

import './index.css';

export default function Header({ formState, setFormError, editMode }) {
  const { cacheHandler } = useStateHandler();
  const [openSaveAsDraft, setOpenSaveAsDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const goBackHandler = useGoBack("/profile/board");
  const initialState = useRef(formState);
  const navigate = useNavigate();

  async function publishPost() {
    setLoading(true);
    setFormError(null);
        
    if(Utils.isPostMediaUploading(formState)) { 
      alert("Please, wait until all images are uploaded");
      setLoading(false);
    } else {
      const { response, data } = await GalleryService.submitPost(formState, true);

      if(response.ok) {
        cacheHandler.triggerAction("SUBMIT_POST");
        cacheHandler.storeInCache(`post_${data._id}_view`, data); 
        navigate(`/post/${data._id}`, { replace: true });

        if(editMode) {
          navigate(-1);
        } 
      } else if(response.status === 400) {
        setLoading(false);
        setFormError({ element: data.error_data.element, error_code: data.error_type });
      }
    }
  }

  return (
    <>
      <div className="add-post-header">
        <span 
          className="add-post-header__item element-non-selectable" 
          onClick={() => {
            if(initialState.current !== formState && !editMode) {
              setOpenSaveAsDraft(true);
            } else {
              goBackHandler();
            }
          }}
        >
                    Cancel
        </span>

        <h1 className="add-post-header__heading">
          {
            editMode ? 
              "Edit post" 
              : 
              "Add a post"
          }
        </h1>

        <span className={`add-post-header__item publish element-non-selectable ${loading ? "disabled" : ""}`} onClick={publishPost}>
                    Publish
          {loading && <CustomSpinner className="add-post-header__spinner" thin/>}
        </span>
      </div>

      {!editMode && (
        <SaveAsDraftDialog 
          formState={formState}
          open={openSaveAsDraft} 
          close={()=>setOpenSaveAsDraft(false)} 
        />
      )}
    </>
  );
}
