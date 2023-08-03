import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import Text from '@/shared-components/text/components/Text';

import './styles/Info.css';

export default function Info({ artwork, typeOfArtwork }) {
  return (
    <>
      <ArtworkImage
        image={artwork.artwork_media.artwork_main_picture.image_id}
        imageTemplateClassName="add-review__artwork-picture template"
        imageClassName="add-review__artwork-picture"
      />

      <Text 
        style={{ fontWeight: "600", marginBottom: "5px" }}
        className="add-review__info-text" 
        paragraph 
        justify 
        large
      >
                    Congratulations on your latest addition to your collection!
      </Text>

      <Text 
        style={{ marginBottom: "15px" }}
        className="add-review__info-text" 
        paragraph 
        justify 
        small
      >
                    A work of art is a window into the soul of its creator, 
                    a mirror of the world, and an invitation to deepen our understanding.
      </Text>

      <Text 
        style={{ fontWeight: "600" }}
        className="add-review__info-text" 
        paragraph 
        justify 
        large
      >
        {
          typeOfArtwork === "original" ?
            `Evaluate your buying experience with ${artwork.artwork_about.artwork_gallery.user_name}`
            :
            "Evaluate your buying experience with Suarte"
        }
      </Text>
    </>
  );
}
