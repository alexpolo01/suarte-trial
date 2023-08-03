export default function InfoIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick}  viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9.5" cy="9.5" r="9" fillOpacity=".22"/>
        <rect x="8" y="9" width="3" height="7" rx="1"/>
        <circle cx="9.5" cy="5.5" r="1.5"/>
      </svg>
    </>
  );
}