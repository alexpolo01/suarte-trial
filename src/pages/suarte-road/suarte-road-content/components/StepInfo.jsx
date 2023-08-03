import { useRef } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import ArtistVerifiedIcon from '@/shared-components/icons/components/new-icons/ArtistVerifiedIcon';
import ArtlistIcon from '@/shared-components/icons/components/new-icons/ArtlistIcon';
import CollectionIcon from '@/shared-components/icons/components/new-icons/CollectionIcon';
import FollowUserIcon from '@/shared-components/icons/components/new-icons/FollowUserIcon';
import LikeIcon from '@/shared-components/icons/components/new-icons/LikeIcon';
import PlayIcon from '@/shared-components/icons/components/new-icons/PlayIcon';
import RatingIcon from '@/shared-components/icons/components/new-icons/RatingIcon';
import ThoughtIcon from '@/shared-components/icons/components/new-icons/ThoughtIcon';
import UserIcon from '@/shared-components/icons/components/new-icons/UserIcon';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/StepInfo.css';

export default function StepInfo({ currentRoadStep }) {
  const { state } = useStateHandler();

  const roadStepsInfo = useRef([
    {
      icon: <UserIcon className="step-info__step-icon"/>,
      goal: "Complete your profile",
      description: "Personalize your profile by adding a profile picture, it will help others recognize you on the platform. It can be a portrait, a painting, a character or anything that represents you."
    },
    {
      icon: <LikeIcon className="step-info__step-icon"/>,
      goal: "Like 10 artworks",
      description: "Show your love for our artists and their creations by liking 10 artworks. Keep track of your liked artworks in your profile."
    },
    {
      icon: <FollowUserIcon className="step-info__step-icon"/>,
      goal: "Follow 5 users",
      description: "Share the road and expand your art knowledge by following 5 users. Get inspired, keep up with the latest artworks, and discover new perspectives."
    },
    {
      icon: <ThoughtIcon className="step-info__step-icon"/>,
      goal: "Write 3 thoughts",
      description: "We value your perspective. Enhance your art experience by writing 3 thoughts on the platform, express your viewponts and engage with other art enthusiasts."
    },
    {
      icon: <ArtlistIcon className="step-info__step-icon"/>,
      goal: "Create an artlist",
      description: "Curate your art discoveries by creating an artlist, save the artworks you see on the platform and organize your favorite pieces. It must contain at least 5 artworks."
    },
    {
      icon: <RatingIcon className="step-info__step-icon"/>,
      goal: "Rate 5 artworks",
      description: "Rate 5 artworks based on your emotional response, style management, and time-travel expectations. Remember that rating artworks should be a personal experience based on respect and tolerance towards established and new conceptions of art."
    },
    {
      icon: <PlayIcon className="step-info__step-icon"/>,
      goal: "Play an audio",
      description: "Enhance your art experience by listening to the story behind one artwork, gain deeper insights and understand the artist's intentions and inspiration."
    },
    {
      icon: state.user_session.user_type === "artist" ?  <ArtworkIcon className="step-info__step-icon"/> : <CollectionIcon className="step-info__step-icon"/>,
      goal: state.user_session.user_type === "artist" ? "Get 3 artworks represented on Suarte" : "Start your collection",
      description: state.user_session.user_type === "artist" ? "The final step towards earning your verified artist insignia is to have at least three of your artworks represented on Suarte." : "Make a statement and start your art collection by purchasing an original or limited edition, take the first step in building a collection you'll treasure."
    },
  ]);

  return (
    <>
      <div className="step-info__container">
        {
          currentRoadStep <= 8 ?
            <>
              <div className="step-info__header">
                {roadStepsInfo.current[currentRoadStep-1].icon}

                <div className="step-info__header-text-container">
                  <Text className="step-info__header-text" medium>
                                        Next step:
                  </Text>

                  <Text className="step-info__header-text bold" medium>
                    {roadStepsInfo.current[currentRoadStep-1].goal}
                  </Text>
                </div>
              </div>

              <Text className="step-info__text" paragraph justify small>
                {roadStepsInfo.current[currentRoadStep-1].description}
              </Text>
            </>
            :
            <>
              <div className="step-info__header">
                <div className="step-info__header-text-container">
                  <Text className="step-info__header-text" medium>
                                        Congratulations! You received:
                  </Text>

                  <Text className="step-info__reward-text" medium>
                    {
                      state.user_session.user_type === "artist" ?
                        "Suarte's artist verification"
                        :
                        "Art Traveler"
                    }
                  </Text>
                </div>
              </div>

              <Text className="step-info__text" paragraph justify small>
                                Congratulations! The journey has been completed. Your completion of Suarte Road is a true testament to your passion and dedication for art.
              </Text>

              {state.user_session.user_type === "artist" && (
                <ArtistVerifiedIcon className="step-info__completed-icon"/>
              )}
            </>
        }
      </div>
    </>
  );
}
