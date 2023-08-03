import EditArtlistIcon from '@/shared-components/icons/components/actions/EditArtlistIcon';
import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/DraftsProfileButton.css';

export default function DraftsProfileButton({ draftsCount, onClick }) {
  return (
    <>
      <div className={`drafts-profile-button__container${draftsCount === 0 ? " disabled" : ""}`} onClick={onClick}>
        <div className="drafts-profile-button__text-section">
          <div className="drafts-profile-button__draft-icon-box">
            <EditArtlistIcon className="drafts-profile-button__draft-icon"/>
          </div>

          <Text className="drafts-profile-button__draft-text" paragraph medium>Drafts <span>({draftsCount})</span></Text>
        </div>

        {draftsCount > 0 && <ForwardArrowIcon className="drafts-profile-button__draft-enter"/>}
      </div>
    </>
  );
}
