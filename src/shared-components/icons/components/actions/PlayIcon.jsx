export default function PlayIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 14 17" xmlns="http://www.w3.org/2000/svg">
        <path d="m13.771 8.0794-13.084-8.0136c-0.30526-0.18692-0.68663 0.046511-0.68663 0.42036v16.028c0 0.3739 0.38137 0.6073 0.68663 0.4204l13.084-8.0136c0.3052-0.18693 0.3052-0.65423 0-0.84116z"/>
      </svg>
    </>
  );
}