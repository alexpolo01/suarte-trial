import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/PostPictures.css';

export default function PostPictures({ postPictures }) {
  return (
    <>
      {
        postPictures.map(picture => (
          <div className="display-post-picture__container" key={picture._id}>
            <div className="display-post-picture__separator"/>
            
            <ArtworkImage 
              image={picture.image_id} 
              imageClassName="display-post-picture__picture" 
              imageTemplateClassName="display-post-picture__picture-template"
            />
            
            {(Boolean(picture.picture_title) || Boolean(picture.picture_description)) && (
              <div className="display-post-picture__picture-details">
                {picture.picture_title && (
                  <p className="display-post-picture__picture-heading">
                    <Heading large>
                      {picture.picture_title}
                    </Heading>
                  </p>
                )}
            
                {picture.picture_description && (
                  <Text className="display-post-picture__picture-text" paragraph justify medium>
                    {picture.picture_description}
                  </Text>
                )}
              </div>
            )}
          </div>
        ))
      }
    </>
  );
}
