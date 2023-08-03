export default function PlayIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
        <path d="m193.33 163.11 323.7 186.89-323.7 186.89v-373.78m-45.33 0v440.6c0 5.2 5.63 8.45 10.13 5.85l381.57-220.3 57.87-33.41c4.5-2.6 4.5-9.09 0-11.69l-57.87-33.41-381.58-220.31c-4.5-2.6-10.13 0.65-10.13 5.85v66.82z"/>
      </svg>
    </>
  );
}