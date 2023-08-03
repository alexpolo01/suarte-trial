import { Link } from "react-router-dom";

import config from "@/config";

function scrollToElementInsideScrollableDiv(elementToScrollToId, containerId) {
  const elementToScrollTo = document.getElementById(elementToScrollToId);
  const container = document.getElementById(containerId);
  
  if (!elementToScrollTo || !container) return;
    
  container.scrollTo({
    top: elementToScrollTo.offsetTop,
    left: elementToScrollTo.offsetLeft,
    behavior: 'smooth'
  });
}

const isDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

function parserUserMentions(comment) {
  const mentionRegex = /@[a-zA-Z][a-zA-Z0-9_]*/g;
  let lastIndex = 0;
  const parts = [];
  let match;

  while((match = mentionRegex.exec(comment)) !== null) {
    const startIndex = match.index;
    const endIndex = mentionRegex.lastIndex;
    const username = match[0].substring(1); // Remove "@" from username

    if(startIndex > lastIndex) {
      parts.push(<span key={lastIndex}>{comment.slice(lastIndex, startIndex)}</span>);
    }

    parts.push(
      <Link 
        key={lastIndex + username} 
        className="mention" 
        to={`/user/${username}`} 
        state={{ from: true }}
      >
          @{username}
      </Link>
    );

    lastIndex = endIndex;
  }

  if (lastIndex < comment.length) {
    parts.push(<span key={lastIndex}>{comment.slice(lastIndex)}</span>);
  }
    
  return parts;
}

function preloadImages(images) {
  for(let i=0; i<images.length; i++) {
    let img = new Image();
    img.src = `${config.app.imageServiceDomain}/${images[i]}`;
  }
}

function hideEmail(emailToHide) {
  const [username, domain] = emailToHide.split("@");
  const maskedUsername = username.charAt(0) + "*".repeat(username.length - 1);
  const maskedDomain = "*".repeat(domain.length);

  return maskedUsername + "@" + maskedDomain;
}

const AppUtils = {
  scrollToElementInsideScrollableDiv,
  isDevice,
  parserUserMentions,
  preloadImages,
  hideEmail,
};

export default AppUtils;
