import { useNavigate } from 'react-router-dom';

import SettingsGalleryIcon from '@/shared-components/icons/components/settings/SettingsGalleryIcon';
import ArtistIcon from '@/shared-components/icons/components/user-profile/ArtistIcon';
import ArtlistIcon from '@/shared-components/icons/components/user-profile/ArtlistIcon';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';

import './styles/HomeLinks.css';

function HomeLink({ to, text, icon }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-link__container" onClick={()=>navigate(to, { state: { from: true } })}>
        {icon}
        <span className="home-link__text">{text}</span>
      </div>
    </>
  );
}

export default function HomeLinks() {
  return (
    <>
      <div className="home-links__container element-non-selectable">
        <HomeLink to="/galleries" text="Galleries" icon={<SettingsGalleryIcon className="home-links__icon gallery"/>}/>
        <HomeLink to="/artists" text="Artists" icon={<ArtistIcon className="home-links__icon artist"/>}/>
        <HomeLink to="/artworks" text="Artworks" icon={<ArtworkIcon className="home-links__icon artwork"/>}/>
        <HomeLink to="/artlists" text="Artlists" icon={<ArtlistIcon className="home-links__icon artlist"/>}/>
      </div>
    </>
  );
}
