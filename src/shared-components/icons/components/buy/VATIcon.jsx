export default function VATIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
        <path d="m10.5 3.1429c0-0.12859-0.0495-0.25223-0.1383-0.34524l-2.0455-2.1429c-0.09434-0.09884-0.22503-0.15476-0.36167-0.15476h-6.9546c-0.27614 0-0.5 0.22386-0.5 0.5v12c0 0.2761 0.22386 0.5 0.5 0.5h9c0.2761 0 0.5-0.2239 0.5-0.5v-9.8571z" stroke="var(--app-theme-color)" strokeLinejoin="round"/>
        <path d="M3 9.5L7.5 5" stroke="var(--app-theme-color)" strokeLinecap="round"/>
        <circle cx="3.75" cy="5.75" r=".75" fill="var(--app-theme-color)"/>
        <circle cx="6.75" cy="8.75" r=".75" fill="var(--app-theme-color)"/>
      </svg>

    </>
  );
}