import CommunityNotRatedCard from '@/shared-components/cards/components/CommunityNotRatedCard';
import CommunityRatingCard from '@/shared-components/cards/components/CommunityRatingCard';

import './styles/RatingNotification.css';

export default function RatingNotification({ data }) {
  if(!data.data.haveIRated) {
    return <CommunityNotRatedCard data={data.data}/>;
  }

  return (
    <>
      <div className="home-rating-notification">
        <CommunityRatingCard data={data.data}/>
      </div>
    </>
  );
}
