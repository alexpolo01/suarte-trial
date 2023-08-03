import { useEffect,useRef, useState } from 'react';

import './styles/FHSlider.scss';

/** 
 * This is a free slider component in horizontal. There are no active items (we dont navigate item to item, we just slide a certain amount of pixels)
 * The only goal is to have a free native horizontal scroll with navigation on PC. 
 * If we require more functionality, use SwiperJS
 * 
 * @Nota Ahora mismo no reacciona frente a los resize. Esto se debe a que no comprueba los controles on Hover, solamente los comprueba cuando hace click (para evitar realizar muchas comprobaciones todo el rato)
 * Si por lo que sea el UX es malo, pues simplemente hacerlo.
*/
export default function FHSlider({ children, className="", speed=2, customPrevButton=null, customNextButton=null }) {
  /** Free Horizontal Slider States */
  const [displayPrev, setDisplayPrev] = useState(false);
  const [displayNext, setDisplayNext] = useState(false);

  /** Free Horizontal Slider Refs */
  const fhSliderRef = useRef(null);

  /** Controls initialization */
  useEffect(()=>{
    _checkOverflows();
  }, []);

  function _checkOverflows() {
    const { clientWidth, scrollLeft, scrollWidth } = fhSliderRef.current;

    if(scrollLeft !== 0) setDisplayPrev(true);
    else setDisplayPrev(false);

    if(scrollLeft + clientWidth < scrollWidth) setDisplayNext(true);
    else setDisplayNext(false);
  }

  /** Slide next function */
  function slideNext() {
    const { clientWidth, scrollLeft, scrollWidth } = fhSliderRef.current;

    if(clientWidth === scrollWidth) { /** If the screen has been resized, buttons could still be visible, so we double check if we still have some kind of an overflow */
      setDisplayNext(false);
      setDisplayPrev(false);
      return;
    }

    const newScrollLeft = scrollLeft + (clientWidth / speed);

    fhSliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    if(newScrollLeft >= scrollWidth - clientWidth && displayNext) setDisplayNext(false);
    if(newScrollLeft > 0 && !displayPrev) setDisplayPrev(true);
  }

  /** Slide prev function */
  function slidePrev() {
    const { clientWidth, scrollLeft, scrollWidth } = fhSliderRef.current;

    if(clientWidth === scrollWidth) { /** If the screen has been resized, buttons could still be visible, so we double check if we still have some kind of an overflow */
      setDisplayNext(false);
      setDisplayPrev(false);
      return;
    }

    const newScrollLeft = scrollLeft - (clientWidth / speed);

    fhSliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    if(newScrollLeft <= 0 && displayPrev) setDisplayPrev(false);
    if(newScrollLeft < scrollWidth - clientWidth && !displayNext) setDisplayNext(true);
  }

  return (
    <>
      <div className={`fhslider__container ${className}`} onMouseEnter={_checkOverflows}>
        <div className="fhslider__viewport" ref={fhSliderRef} id={"fhSliderRef"}> {/** We use the id to get a ref outside this component using getElementById */}
          {children}
        </div>

        <div className={`fhslider__controls prev-button ${displayPrev ? "active" : "disabled"}`} onClick={slidePrev}>
          {customPrevButton || "Previous Item"}
        </div>

        <div className={`fhslider__controls next-button ${displayNext ? "active" : "disabled"}`} onClick={slideNext}>
          {customNextButton || "Next Item"}
        </div>
      </div>
    </>
  );
}

/**
 * This component should only be used inside a FHSlider component. If used outside, it will crash.
 */
export function FHTab({ children, className="" }) {
  const fhTabRef = useRef(null);

  function centerElement() { /** Checks if this item is fully visible in the slider, if it is overflowing, the slider slides until the element is fully visible and centered */
    const sliderRef = document.getElementById("fhSliderRef");
    const { clientWidth, scrollLeft } = sliderRef;
    const { offsetLeft, offsetWidth } = fhTabRef.current;

    if(offsetLeft < scrollLeft) { /** If the element is overflowing to the left */
      sliderRef.scrollTo({
        left: offsetLeft - (clientWidth / 2) + (offsetWidth / 2)
      });
    } else if(offsetLeft + offsetWidth > scrollLeft + clientWidth) { /** If the element is overflowing to the right */
      sliderRef.scrollTo({
        left: offsetLeft + offsetWidth - clientWidth + (clientWidth / 2) - (offsetWidth / 2)
      });
    }
  }

  return (
    <div className={`fh-tab__container ${className}`} onClick={centerElement} ref={fhTabRef}>
      {children}
    </div>
  );
} 
