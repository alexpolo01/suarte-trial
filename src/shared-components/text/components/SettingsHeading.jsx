import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import Heading from './Heading';

import './styles/SettingsHeading.css';

export default function SettingsHeading({ text, to=null }) {
  const goBackHandler = useGoBack(to ? to : "/profile/settings");

  return (
    <>
      <div className="settings-heading__container">
        <BackArrowIcon className="settings-heading__back" onClick={goBackHandler}/>
        <Heading className="settings-heading__text" small>{text}</Heading>
      </div>
    </>
  );
}
