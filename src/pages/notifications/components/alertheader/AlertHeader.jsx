import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import './AlertHeader.css';

export default function AlertHeader( { className="" } ) {
  const goBackHandler = useGoBack("/profile");

  return (
    <>
      <div className={ 'notification__header ' + className }>
        <div className='notification-header__back-section'>
          <BackArrowIcon className='notification-header__back-icon' onClick={goBackHandler}/>
          <p className='notification__header__title'>
            Notifications
          </p>
        </div>
      </div>
    </>
  );
}
