import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ConfirmationDialog from '@/shared-components/popups/components/ConfirmationDialog';

import './styles/DeletePost.css';

export default function DeletePost({ open, close, fetchData }) {
  const { stateHandler, cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function deletePostHandler() {
    setLoading(true);

    const { response } = await GalleryService.removePostDraft(fetchData._id);

    if(response.ok) {
      stateHandler.set("temporalPopup", { text: `${fetchData.post_container.post_title} deleted` });
      cacheHandler.triggerAction("DELETE_POST");
      navigate("/profile/board", { replace: true });
    }
  }

  return (
    <ConfirmationDialog 
      open={open} 
      onClose={close} 
      loading={loading}
      onConfirm={deletePostHandler} 
      closeButtonText="Keep it" 
      confirmButtonText="Delete" 
      dialogText="Are you sure you want to delete this post?"
      className="delete-post-popup" 
      title="Delete post"
      darkerBlur
    />
  );
}
