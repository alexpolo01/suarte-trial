import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useScreenSize from '@/hooks/useScreenSize';
import { NextButton,PrevButton } from '@/shared-components/buttons/components/SliderControls';
import ArtworkSliderCard from '@/shared-components/cards/components/ArtworkSliderCard';
import FHSlider from '@/shared-components/sliders/components/FHSlider';
import Text from '@/shared-components/text/components/Text';

import ArtistArtworksHeader from '../../components/ArtistArtworksHeader';

import './styles/ArtworksSlider.css';

export default function ArtworksSlider({ artistData, openArtistPreview, openEditArtist }) {
  const screenSize = useScreenSize();
  const artistArtworksPreview = useMemo(()=>{
    if(screenSize.width <= 550) {
      return {
        data: artistData.artworks.slice(0, 4), 
        max: 4
      };
    } else {
      return {
        data: artistData.artworks.slice(0, 10), 
        max: 10
      };
    }
  }, [screenSize.width]);
  const navigate = useNavigate();

  return (
    <>
      <div className="artist-artworks-slider__container">
        <div className="artist-artworks-slider__header" onClick={()=>openArtistPreview(artistData)}>
          <ArtistArtworksHeader
            artistData={artistData} 
            openEditArtist={openEditArtist}
          />
        </div>

        <FHSlider 
          speed={1.4} 
          className="artist-artworks-slider__slider element-non-selectable" 
          customPrevButton={<PrevButton/>} 
          customNextButton={<NextButton/>}
        >
          {artistArtworksPreview.data.map(artwork => (
            <ArtworkSliderCard 
              key={artwork._id} 
              artworkData={artwork} 
              imageClassName="artist-artworks-slider__slider-item-image" 
              cardClassName="artist-artworks-slider__slider-item"
              onClick={()=>navigate(`/artwork/${artwork._id}`, { state: { from: true } })}
            />
          ))}

          {artistData.artwork_count > artistArtworksPreview.max && (
            <Text 
              className="artist-artworks-slider__see-all-button element-non-selectable" 
              onClick={()=>openArtistPreview(artistData)} 
              paragraph 
              small
            >
                            See all ({artistData.artwork_count})
            </Text>
          )}
        </FHSlider>
      </div>
    </>
  );
}
