export default function XIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L11.5 11.5M11.5 1L1 11.5" strokeLinecap="round" strokeWidth="2"/>
      </svg>
    </>
  );
}