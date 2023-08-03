import { useEffect,useState } from 'react';

function getScreenDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState(getScreenDimensions());

  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}