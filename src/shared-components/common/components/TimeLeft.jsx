import { useEffect, useMemo,useState } from 'react';

// TODO: I DONT KNOW IF THIS CODE IS WORKING WELL FOR EVERYTHING. WE COULD CLEAN IT A LOT I BELIEVE. 

export default function TimeLeft({ children, endsIn, onEnd }) {
  const targetTime = useMemo(()=>endsIn-1, [endsIn]); /** We substract 1 because it initially jumps 2 seconds because the interval is not exactly called every 1000 ms, maybe it's called on 1010ms. That's why */
  const [currentTimeLeft, setTimeLeft] = useState(targetTime-Date.now());

  function getReturnValues(timeLeft) {
    // calculate time left
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    return { isFinished: (days + hours + minutes + seconds <= 0), timeLeft: { days, hours, minutes, seconds } };
  }

  useEffect(() => {
    if(Date.now() <= targetTime) setTimeLeft(targetTime - Date.now());
        
    const interval = setInterval(() => {
      const actualTime = Date.now();
      if(actualTime <= targetTime) setTimeLeft(targetTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [endsIn]);

  const { isFinished, timeLeft } = useMemo(()=>getReturnValues(currentTimeLeft), [currentTimeLeft]);

  useEffect(()=>{
    if(isFinished && onEnd) onEnd();
  }, [currentTimeLeft]);

  return (
    <>
      {children({ isFinished, timeLeft })}
    </>
  );
}
