import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import './styles/GoBackButton.scss';

export default function GoBackButton({ alternativeRoute="/" }) {
  const goBackHandler = useGoBack(alternativeRoute);

  return (
    <>
      <BackArrowIcon className="go-back__button" onClick={goBackHandler}/>
    </>
  );
}
