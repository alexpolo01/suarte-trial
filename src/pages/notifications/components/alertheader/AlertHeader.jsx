import './AlertHeader.css';

export default function AlertHeader( { className="" } ) {
  return (
    <>
      <div className={ 'notification__header ' + className }>
        <div className='notification__header__controller'>
        </div>
        <p className='notification__header__title'>
          Notifications
        </p>
      </div>
    </>
  );
}
