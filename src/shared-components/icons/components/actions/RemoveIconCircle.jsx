export default function RemoveIconCircle({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.5" cy="6.5" r="6.5"/>
        <path d="m4 4 5 5m0-5-5 5" stroke="#000" strokeLinecap="round" strokeWidth="1.5"/>
      </svg>
    </>
  );
}