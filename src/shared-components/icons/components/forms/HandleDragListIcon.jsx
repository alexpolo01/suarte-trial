export default function HandleDragListIcon({ className="", onClick=null, activatorRef, ...props }) {
  return (
    <>
      <svg className={className} ref={activatorRef} {...props} onClick={onClick} viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
        <path d="m1 1h11" strokeLinecap="round" strokeWidth="1.5"/>
        <path d="m1 6h11" strokeLinecap="round" strokeWidth="1.5"/>
        <path d="m1 11h11" strokeLinecap="round" strokeWidth="1.5"/>
      </svg>
    </>
  );
}