import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export default function useNavigateWithTransition() {
  const navigate = useNavigate();

  function navigateWithTransition(to, options) {
    if(document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(to, options);
        });
      });
    } else {
      navigate(to, options);
    }
  }

  return navigateWithTransition;
}