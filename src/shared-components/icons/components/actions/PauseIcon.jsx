export default function PauseIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
        <path d="m1 1v9" strokeLinecap="round"/>
        <path d="m6 1v9" strokeLinecap="round"/>
      </svg>
    </>
  );
}