export default function PublicSuccessCheck({ className="", onClick }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#public-success-check)">
          <path d="m6.2363 12c-0.39844 0-0.79688-0.1487-1.0992-0.4433l-4.6823-4.5627c-0.60755-0.59201-0.60755-1.5502 0-2.1423 0.60755-0.59202 1.5909-0.59202 2.1985 0l3.5831 3.4915 8.11-7.9c0.6076-0.59201 1.5909-0.59201 2.1985 0 0.6075 0.59202 0.6075 1.5503 0 2.1423l-9.2093 8.9711c-0.30236 0.2946-0.7008 0.4433-1.0992 0.4433z"/>
        </g>
        <defs>
          <clipPath id="public-success-check">
            <rect width="17" height="12" fill="#fff"/>
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
