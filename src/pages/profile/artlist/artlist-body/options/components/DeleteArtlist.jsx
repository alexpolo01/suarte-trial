import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ConfirmationDialog from '@/shared-components/popups/components/ConfirmationDialog';

import './styles/DeleteArtlist.css';

export default function DeleteArtlist({ open, close }) {
  const { stateHandler, cacheHandler } = useStateHandler();
  const { artlistData } = useContext(ArtlistDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function deleteArtlist() {
    setLoading(true);

    const { response } = await UserService.deleteArtlist(artlistData._id);

    if(response.ok) {
      stateHandler.set("temporalPopup", { text: `${artlistData.artlist_title} deleted successfully!` });
      cacheHandler.triggerAction("DELETE_ARTLIST");
      navigate("/profile/artlists", { replace: true });
    }
  }

  return (
    <>
      <ConfirmationDialog 
        open={open} 
        onClose={close} 
        onConfirm={deleteArtlist} 
        className="delete-artlist-popup" 
        title="Delete artlist"
        closeButtonText="Keep it" 
        confirmButtonText="Delete" 
        dialogText="Are you sure you want to delete this artlist?"
        loading={loading}
        opacity
      />
    </>
  );
}
