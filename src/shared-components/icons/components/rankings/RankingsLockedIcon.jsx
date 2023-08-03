export default function RankingsLockedIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 37">
        <path d="M31 14.2h-5V9.5C26 4.3 21.8 0 16.7 0a9.4 9.4 0 0 0-9.2 9.5v4.7h-5A2.5 2.5 0 0 0 0 16.7v17.7C0 35.8 1.1 37 2.5 37H31c1.3 0 2.4-1.2 2.4-2.6V16.7c0-1.4-1-2.5-2.4-2.5ZM10.6 9.5c0-3.5 2.7-6.3 6.1-6.3C20.1 3.2 23 6 23 9.5v4.7H10.6V9.5Zm19.7 24.3H3.1V17.4h27.2v16.4Z"/>
        <circle cx="16.7" cy="23.8" r="2.6"/>
        <path d="M15.8 24.6h1.8l1.8 5.3H14l1.7-5.3Z"/>
      </svg>
    </>
  );
}
