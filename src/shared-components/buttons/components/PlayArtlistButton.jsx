import PlayArtlistIcon from '@/shared-components/icons/components/actions/PlayArtlistIcon';

import './styles/PlayArtlistButton.css';

export default function PlayArtlistButton({ className, onClick }) {
  return (
    <>
      <div className={`play-artlist-button__button ${className}`} onClick={onClick}>
        <PlayArtlistIcon/>
      </div>
    </>
  );
}
