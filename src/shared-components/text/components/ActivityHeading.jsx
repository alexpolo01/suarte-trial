import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import Heading from './Heading';

import './styles/ActivityHeading.css';

export default function ActivityHeading({ text, to=null }) {
  const goBackHandler = useGoBack(to ? to : "/profile/activity");

  return (
    <>
      <div className="activity-heading__container">
        <BackArrowIcon className="activity-heading__back" onClick={goBackHandler}/>
        <Heading className="activity-heading__text" small>{text}</Heading>
      </div>
    </>
  );
}
