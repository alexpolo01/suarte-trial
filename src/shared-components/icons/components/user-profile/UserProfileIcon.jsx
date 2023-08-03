export default function UserProfileIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 16 21" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#user-profile-icon-b)">
          <path d="m7.9302 9.7796c2.4374 0 4.4132-1.9784 4.4132-4.4188 0-2.4404-1.9759-4.4188-4.4132-4.4188-2.4374 0-4.4132 1.9784-4.4132 4.4188 0 2.4404 1.9759 4.4188 4.4132 4.4188z"/>
        </g>

        <g filter="url(#user-profile-icon-a)">
          <path d="m11.594 20.061h-7.3292c-2.1479 0-3.8887-1.6396-3.8887-3.6626v-2.1069c0-2.0229 1.7408-3.6625 3.8887-3.6625l0.04785 0.0393c2.092 1.7141 5.2102 1.6971 7.2808-0.0393 2.1479 0 3.8887 1.6396 3.8887 3.6625v2.1069c0 2.023-1.7408 3.6626-3.8887 3.6626h5e-4z"/>
        </g>

        <defs>
          <filter id="user-profile-icon-b" x="3.5169" y=".94202" width="9.8265" height="9.8375" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dx="1" dy="1"/>
            <feGaussianBlur stdDeviation="1"/>
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend in2="shape" result="effect1_innerShadow_8_1244"/>
          </filter>

          <filter id="user-profile-icon-a" x=".37634" y="10.629" width="16.106" height="10.432" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dx="1" dy="1"/>
            <feGaussianBlur stdDeviation="1"/>
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend in2="shape" result="effect1_innerShadow_8_1244"/>
          </filter>
        </defs>
      </svg>
    </>
  );
}