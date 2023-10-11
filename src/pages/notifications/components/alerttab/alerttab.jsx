import './AlertTab.css';

export default function AlertTab( { children, className="" } ) {
  return (
    <>
      <div className={className}>
        TabSpace
        { children }
      </div>
    </>
  );
}
