import RangeTouch from 'rangetouch';
import { useEffect,useRef } from 'react';

import useForceRender from '@/hooks/useForceRender';

import './styles/CustomInputRange.css';

/** 
 * @note If you want to change values programatically using a ref, you might also need to trigger programatically a re-render so that the new values are painted. You can do it using the useForceRender hook!
 * You can only change programtically the value (using a ref), not the min, max values. You would need something to pass it to the component that indicates that value.
 */
export default function CustomInputRange({ className="", element="", value, defaultValue=0, minValue=0, maxValue=100, step=0.001, thumb=false, customThumb, onInput=null, onMouseUp=null, onTouchEnd=null, onKeyDown=null, reference=null }) {
  const forceRender = useForceRender();
  const realInputRange = useRef();
  const currentWidth = getCurrentWidth();

  useEffect(()=>{
    const range = new RangeTouch(realInputRange.current);
    return () => range.destroy();
  }, []);

  function getCurrentWidth() {
    let currentValue = null;
    if(isTruthy(value)) {
      if(value <= minValue) currentValue = minValue;
      else if(value >= maxValue) currentValue = maxValue;
      else currentValue = value;
    } else if(realInputRange.current) {
      currentValue = realInputRange.current.value;
    } else {
      if(defaultValue <= minValue) currentValue = minValue;
      else if(defaultValue >= maxValue) currentValue = maxValue;
      else currentValue = defaultValue;
    }
    return ((currentValue - minValue) / (maxValue - minValue)) * 100;
  }

  function eventHandler(e, eventController) {
    if(eventController) eventController(e);
    forceRender();
  }

  function isTruthy(item) {
    return item !== null && item !== undefined;
  }

  return (
    <>
      <div className={`custom-input-range__track ${className}`}>
        <div style={{ width: `${currentWidth}%` }} className="custom-input-range__progress">
          {thumb && (
            <div style={{ transform: `translateX(${100-currentWidth}%)` }} className="custom-input-range__thumb">
              {customThumb}
            </div>
          )}
        </div>

        <input  
          type="range" 
          className="custom-input-range__real-range" 
          value={value}
          defaultValue={isTruthy(value) ? undefined : defaultValue}
          min={minValue}
          max={maxValue} 
          ref={node => {
            if(reference) reference.current = node;
            realInputRange.current = node;
          }} 
          onInput={(e)=>eventHandler(e, onInput)} 
          onMouseUp={(e)=>eventHandler(e, onMouseUp)}
          onTouchEnd={(e)=>eventHandler(e, onTouchEnd)}
          onKeyDown={(e)=>eventHandler(e, onKeyDown)}
          step={step}
        />
      </div>

      {element && <input type="hidden" id={element} name={element} value={realInputRange.current ? realInputRange.current.value : defaultValue}/>}
    </>
  );
}
