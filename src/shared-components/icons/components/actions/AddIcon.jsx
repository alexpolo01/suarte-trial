export default function AddIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.25" strokeWidth="1.5"/>
        <path d="m6 10h8" strokeLinecap="round" strokeWidth="1.5"/>
        <path d="m10 6v8" strokeLinecap="round" strokeWidth="1.5"/>
      </svg>
    </>
  );
}