export default function PlayArtlistIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 21 24" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#play-artlist-icon)">
          <path d="m20.126 10.47-17.506-10.23c-1.1646-0.68142-2.6204 0.16882-2.6204 1.5317v20.458c0 1.3598 1.4558 2.21 2.6204 1.5316l17.506-10.23c1.1647-0.6814 1.1647-2.3819 0-3.0603z"/>
        </g>

        <defs>
          <clipPath id="play-artlist-icon">
            <rect width="21" height="24" fill="#fff"/>
          </clipPath>
        </defs>
      </svg>
    </>
  );
}