import StopArtlistIcon from '@/shared-components/icons/components/actions/StopArtlistIcon';

import './styles/StopArtlistButton.css';

export default function StopArtlistButton({ className, onClick }) {
  return (
    <>
      <div className={`stop-artlist-button__button ${className}`} onClick={onClick}>
        <StopArtlistIcon/>
      </div>
    </>
  );
}
