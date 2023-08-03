import { useState } from 'react';

import useGoBack from '@/hooks/useGoBack';
import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ConfirmationDialog from '@/shared-components/popups/components/ConfirmationDialog';
import Utils from '@/utils';

import './styles/SaveAsDraftDialog.css';

export default function SaveAsDraftDialog({ formState, open, close }) {
  const { cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);
  const goBackHandler = useGoBack("/profile/board");

  async function savePostAsDraft() {
    setLoading(true);

    if(Utils.isPostMediaUploading(formState)) {
      alert("Please, wait until all images are uploaded");
      setLoading(false);
    } else if(!formState.post_title) {
      alert("You need to give the post a title to save it as a draft");
      setLoading(false);
    } else {
      const { response } = await GalleryService.submitPost(formState);

      if(response.ok) {
        cacheHandler.triggerAction("POST_DRAFT_SAVED");
        goBackHandler();
      }
    }
  }

  return (
    <>
      <ConfirmationDialog 
        open={open} 
        onClose={close} 
        onCloseAction={goBackHandler}
        onConfirm={savePostAsDraft} 
        className="save-as-draft-popup" 
        title="Save as draft?"
        closeButtonText={"Discard changes"} 
        confirmButtonText="Save as draft" 
        dialogText="Attention! You are about to leave your post without saving."
        loading={loading}
        opacity
      />
    </>
  );
}
