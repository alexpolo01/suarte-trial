import { useMemo } from 'react';
import { useNavigate,useOutletContext } from 'react-router-dom';

import useGoBack from '@/hooks/useGoBack';
import GalleryService from '@/services/gallery.service';
import RemoveIconCircle from '@/shared-components/icons/components/actions/RemoveIconCircle';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function Drafts() {
  const goBackHandler = useGoBack("/verify-gallery/uploaded-artworks");
  const { fetchData, setFetchData } = useOutletContext();
  const drafts = useMemo(()=>{
    if(!fetchData) return [];
    return fetchData.drafts.filter(draft => draft.draft_status === "incomplete");
  }, [fetchData]);
  const navigate = useNavigate();

  function removeDraft(draftId) {
    setFetchData({
      ...fetchData,
      drafts: fetchData.drafts.filter(draft => draft._id !== draftId)
    });
    GalleryService.removeArtworkDraft(draftId); 
  }

  return (
    <>
      <div className="drafts__container go-back" onClick={goBackHandler}>
        <BackArrowIcon className="drafts__drafts-enter-icon back" />
        <Text className="drafts__text" large>Drafts</Text>
      </div>

      {drafts.map(draft => (
        <div className="drafts__container" key={draft._id} onClick={()=>navigate("/verify-gallery/add-artwork", { state: { draftData: draft, from: true } })}>
          <RemoveIconCircle className="drafts__remove-draft-button" onClick={(e)=>{e.stopPropagation(); removeDraft(draft._id);}}/>
          <Text className="drafts__text title" medium paragraph justify>{draft.draft_container.artwork_about.artwork_title}</Text>
          <ForwardArrowIcon className="drafts__drafts-enter-icon enter" />
        </div>
      ))}
    </>
  );
}
