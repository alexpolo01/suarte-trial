import './AlertTab.css';

export default function AlertTab( { children, className="" } ) {
  return (
    <>
      <div className={"notification__tab__container " + className}>
        <div className='notification__tab active'>
          <p className='notification__tab__title'>All</p>
        </div>
        <div className='notification__tab'>
          <p className='notification__tab__title'>Interactions</p>
        </div>
        <div className='notification__tab'>
          <p className='notification__tab__title'>From Suarte</p>
        </div>
        { children }
      </div>
    </>
  );
}
