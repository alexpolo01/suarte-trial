import { useNavigate } from "react-router-dom";

import useNavigateToArtwork from "@/hooks/useNavigateToArtwork";
import {
  NextButton,
  PrevButton,
} from "@/shared-components/buttons/components/SliderControls";
import ArtworkSliderCard from "@/shared-components/cards/components/ArtworkSliderCard";
import FHSlider from "@/shared-components/sliders/components/FHSlider";
import Heading from "@/shared-components/text/components/Heading";
import Text from "@/shared-components/text/components/Text";

import "./styles/HomeSlider.css";

export default function HomeSlider({
  artworks,
  alternativeArtworks,
  children,
  category,
  endpoint,
  total,
  link,
  hideText = false,
}) {
  const navigateToArtwork = useNavigateToArtwork(
    `${category}_collection_page`,
    {
      totalDocs: total,
      data: alternativeArtworks ? alternativeArtworks : artworks,
    },
    endpoint
  );
  const navigate = useNavigate();

  console.log(artworks);
  return (
    <>
      <div className="home-slider__container element-non-selectable">
        <div className="home-slider__header">
          <Heading className="home-slider__category" small>
            {category}
          </Heading>

          <Text
            className="home-slider__see-all"
            medium
            onClick={() => navigate(link, { state: { from: true } })}
          >
            See all
          </Text>
        </div>

        <FHSlider
          speed={1.4}
          className="home-slider__slider"
          customPrevButton={<PrevButton />}
          customNextButton={<NextButton />}
        >
          {children}

          {artworks.map((item) => (
            <ArtworkSliderCard
              key={item._id}
              artworkData={item}
              imageClassName="home-slider__slider-item-image"
              cardClassName="home-slider__slider-item"
              hideText={hideText}
              onClick={() => navigateToArtwork(item._id)}
            />
          ))}
        </FHSlider>
      </div>
    </>
  );
}
