export default function SearchNavbarIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#search-navbar-icon)">
          <path d="m19.469 17.258-2.3792-2.3796c0.9826-1.433 1.5576-3.1619 1.5576-5.0255 0-4.9138-3.9958-8.9105-8.9052-8.9105-4.9094 0-8.9086 3.9967-8.9086 8.9105 0 4.9138 3.9959 8.9072 8.9086 8.9072 1.8632 0 3.5949-0.5752 5.0244-1.5579l2.3791 2.3796c0.322 0.3221 0.7427 0.4799 1.1633 0.4799s0.8412-0.1611 1.1632-0.4799c0.6408-0.6409 0.6408-1.6828 0-2.3238h-0.0032zm-15.349-7.4051c0-3.0994 2.5204-5.6237 5.6225-5.6237 3.102 0 5.6224 2.521 5.6224 5.6237 0 3.1027-2.5204 5.6204-5.6224 5.6204-3.1021 0-5.6225-2.521-5.6225-5.6204z"/>
        </g>

        <defs>
          <filter id="search-navbar-icon" x=".83349" y=".94202" width="21.119" height="21.119" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dx="2" dy="2"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend in2="shape" result="effect1_innerShadow_8_1242"/>
          </filter>
        </defs>
      </svg>
    </>
  );
}