import useScreenSize from '@/hooks/useScreenSize';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';

import './styles/HomeBanner.css';

export default function HomeBanner({ mobileImage, desktopImage, onClick }) {
  const screenSize = useScreenSize();

  return (
    <>
      <ArtworkImage 
        image={screenSize.width <= 550 ? mobileImage : desktopImage}
        imageClassName="home-banner__banner"
        imageTemplateClassName="home-banner__banner"
        onClick={onClick}
      />
    </>
  );
}
