export default function ViewsIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#views-icon)" strokeLinecap="round" strokeWidth="3">
          <path d="m6 21.861v-13.24"/>
          <path d="m25.86 21.86v-6.6203"/>
          <path d="m12.621 21.86v-6.6203"/>
          <path d="m19.24 21.861v-19.861"/>
        </g>

        <defs>
          <filter id="views-icon" x=".5" y=".5" width="30.86" height="30.86" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_334_1029"/>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_334_1029" result="shape"/>
          </filter>
        </defs>
      </svg>
    </>
  );
}