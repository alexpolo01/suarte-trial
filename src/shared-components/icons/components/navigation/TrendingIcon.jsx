export default function TrendingIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#trending-icon)">
          <path d="m23.238 22.138h-22.51c-0.40212 0-0.72811 0.3246-0.72811 0.725v2.4115c0 0.4004 0.32598 0.725 0.72811 0.725h22.51c0.4022 0 0.7281-0.3246 0.7281-0.725v-2.4115c0-0.4004-0.3259-0.725-0.7281-0.725z"/>
          <path d="m17.829 0h-11.693c-0.40213 0-0.72812 0.32458-0.72812 0.72498v2.4115c0 0.40039 0.32599 0.72498 0.72812 0.72498h11.693c0.4021 0 0.7281-0.32459 0.7281-0.72498v-2.4115c0-0.4004-0.326-0.72498-0.7281-0.72498z"/>
          <path d="m8.4095 7.4265h-7.6814c-0.40212 0-0.72811 0.32459-0.72811 0.72498v2.4115c0 0.4004 0.32598 0.725 0.72811 0.725h7.6814c0.40213 0 0.72811-0.3246 0.72811-0.725v-2.4115c0-0.40039-0.32598-0.72498-0.72811-0.72498z"/>
          <path d="m23.238 12.428h-7.6814c-0.4021 0-0.7281 0.3245-0.7281 0.7249v2.4116c0 0.4004 0.326 0.7249 0.7281 0.7249h7.6814c0.4022 0 0.7281-0.3245 0.7281-0.7249v-2.4116c0-0.4004-0.3259-0.7249-0.7281-0.7249z"/>
          <path d="m4.7637 22.138v-14.712h-3.2444v14.712h3.2444z"/>
          <path d="m22.431 23.406v-10.456h-3.2444v10.456h3.2444z"/>
          <path d="m10.776 22.138v-19.399h-3.2444v19.399h3.2444z"/>
          <path d="m16.748 22.138v-19.399h-3.2444v19.399h3.2444z"/>
        </g>

        <defs>
          <filter id="trending-icon" x="0" y="0" width="24.966" height="27" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dx="1" dy="1"/>
            <feGaussianBlur stdDeviation="1"/>
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.47 0"/>
            <feBlend in2="shape" result="effect1_innerShadow_1_1720"/>
          </filter>
        </defs>
      </svg>

    </>
  );
}