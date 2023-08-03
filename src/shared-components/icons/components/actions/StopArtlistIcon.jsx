export default function StopArtlistIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 14 18" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="18" rx=".5"/>
        <rect x="11" width="3" height="18" rx=".5"/>
      </svg>
    </>
  );
}