export default function LocationIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 7 8" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#location-icon)">
          <path d="m3.5 0c-1.9333 0-3.5 1.4555-3.5 3.2514 0 2.2859 2.674 4.0828 3.3468 4.6906 0.04267 0.03862 0.09847 0.05793 0.15317 0.05793s0.1105-0.01931 0.15317-0.05793c0.67287-0.60781 3.3468-2.7097 3.3468-4.6906 0-1.796-1.5667-3.2514-3.5-3.2514zm0.00109 4.4193c-0.78555 0-1.4223-0.59154-1.4223-1.3213 0-0.72976 0.63677-1.3213 1.4223-1.3213 0.78556 0 1.4223 0.59154 1.4223 1.3213 0 0.72977-0.63676 1.3213-1.4223 1.3213z"/>
        </g>

        <defs>
          <clipPath id="location-icon">
            <rect width="7" height="8" fill="#fff"/>
          </clipPath>
        </defs>
      </svg>
    </>
  );
}