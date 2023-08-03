export default function ThreeDotsIcon({ className="", onClick=null, ...rest }) {
  return (
    <>
      <svg className={className} onClick={onClick} {...rest} viewBox="0 0 4 16" xmlns="http://www.w3.org/2000/svg">
        <ellipse transform="rotate(90 2 14)" cx="2" cy="14" rx="2" ry="2"/>
        <ellipse transform="rotate(90 2 8)" cx="2" cy="8" rx="2" ry="2"/>
        <ellipse transform="rotate(90 2 2)" cx="2" cy="2" rx="2" ry="2"/>
      </svg>
    </>
  );
}