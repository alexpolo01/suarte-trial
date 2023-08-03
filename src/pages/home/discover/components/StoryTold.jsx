import { useNavigate } from 'react-router-dom';

import useScreenSize from '@/hooks/useScreenSize';
import AudioPlayer from '@/pages/artwork/content-section/components/AudioPlayer';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import StoryToldIcon from '@/shared-components/icons/components/home/StoryToldIcon';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import HomeSlider from './HomeSlider';

import './styles/StoryTold.css';

function StoryToldCard({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="story-told-card__container">
        <ArtworkImage 
          image={data.artwork_media.artwork_main_picture.image_id} 
          imageClassName="story-told-card__image" 
          imageTemplateClassName="story-told-card__image template"
        />

        <div className="story-told-card__content">
          <StoryToldIcon className="story-told-card__icon"/>

          <Heading className="story-told-card__heading" small>
                        The story told
          </Heading>

          <Text className="story-told-card__text" extraSmall>
                        Listen what's behind an artwork
          </Text>

          <AudioPlayer audio={data.artwork_media.artwork_audio.audio_id}/>

          <Text className="story-told-card__link element-non-selectable" medium onClick={()=>navigate("/story-told", { state: { from: true } })}>
                        See all
          </Text>
        </div>
      </div>
    </>
  );
}

export default function StoryTold({ storyToldArtwork, artworks }) {
  const screenSize = useScreenSize();

  return (
    <>
      <div className="story-told__container">
        <HomeSlider 
          artworks={screenSize.width <= 550 ? [] : artworks} 
          category="Story told" 
          link="/story-told" 
          hideText
        >
          <StoryToldCard data={storyToldArtwork}/>
        </HomeSlider>
      </div>
    </>
  );
}
