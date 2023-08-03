export default function StoryToldIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 39">
        <g clipPath="url(#story-told-icon)">
          <path d="M20.9 18.8h-2v-11a7.8 7.8 0 0 0-15.7-.2v11.2H1.4c-.7 0-1.3.6-1.3 1.3v.7A11 11 0 0 0 10.1 31v6H4.3a1 1 0 0 0-1 1c0 .5.4.9 1 .9H18c.5 0 1-.4 1-1 0-.5-.5-1-1-1H12v-6a11 11 0 0 0 10.1-10.7V20c0-.7-.6-1.3-1.3-1.3ZM5.3 7.7c0-3.2 2.6-5.8 5.8-5.8C14.3 2 17 4.5 17 7.7V20.8c-.5 2.7-3 4.9-5.9 4.9A5.8 5.8 0 0 1 5.3 20V7.7ZM11 29a9 9 0 0 1-9-8.3h1.2a7.8 7.8 0 0 0 7.8 6.8c4 0 7.4-3 7.8-6.8h1.3a9 9 0 0 1-9 8.3Z"/>
          <path d="M14 9.7H8.2a1 1 0 0 1-1-1c0-.5.5-1 1-1h6c.5 0 1 .5 1 1 0 .6-.5 1-1 1ZM14 14.3H8.2a1 1 0 0 1-1-1c0-.6.5-1 1-1h6c.5 0 1 .4 1 1 0 .5-.5 1-1 1ZM14 18.8H8.2a1 1 0 0 1-1-1c0-.5.5-1 1-1h6c.5 0 1 .5 1 1 0 .6-.5 1-1 1Z"/>
        </g>
                
        <defs>
          <clipPath id="story-told-icon">
            <path d="M0 0H22.2V38.9H0z"/>
          </clipPath>
        </defs>
      </svg>
    </>
  );
}