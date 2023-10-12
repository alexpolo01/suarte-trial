import './AlertFrame.css';

export default function AlertFrame( { children, className="" } ) {
  return (
    <>
      <div className={className}>
        <div className='notification__content'>
          Notifications
        </div>
        {children}
      </div>
    </>
  );
}
