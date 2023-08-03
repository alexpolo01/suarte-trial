import { useContext } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/SocialsHeader.css';

export default function SocialsHeader({ close, type }) {
  const { socialsData } = useContext(ArtworkDataContext);

  return (
    <>
      <div className="artwork-view-socials-header__container element-non-selectable">
        <Text className="artwork-view-socials-header__text" extraSmall>
          {
            type === "thoughts" ?
              socialsData ?
                `${socialsData.thoughts_count} thoughts`
                :
                "Thoughts"
              :
              socialsData ?
                `${socialsData.ratings_count} ratings`
                :
                "Ratings"
          }
        </Text>
                
        <XIcon onClick={close}/>
      </div>
    </>
  );
}
