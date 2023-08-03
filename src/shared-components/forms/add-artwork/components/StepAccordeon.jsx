import { useEffect,useMemo, useState } from 'react';

import OpenStepAccordeonIcon from '@/shared-components/icons/components/forms/OpenStepAccordeonIcon';
import InfoIcon from '@/shared-components/icons/components/public/InfoIcon';
import PublicSuccessCheck from '@/shared-components/icons/components/public/PublicSuccessCheck';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/StepAccordeon.css';

export default function StepAccordeon({ lastCompletedStep, step, header, previewMode, editMode, activeClassName="step-accordeon__content-active-default", formError, elements, children }) {
  const [active, setActive] = useState(editMode === true || previewMode === true || lastCompletedStep + 1 === step || lastCompletedStep >= 3); 
  const disabled = useMemo(()=>{ 
    if(previewMode === true || editMode===true) return false;
    return step > (lastCompletedStep + 1);
  }, [lastCompletedStep]);

  useEffect(()=>{
    setActive(editMode === true || previewMode === true || lastCompletedStep + 1 === step || lastCompletedStep >= 3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lastCompletedStep]);

  useEffect(()=>{
    if(elements && elements.includes(formError?.element)) setActive(true);
  }, [formError]);

  return (
    <>
      <div className={`step-accordeon__container${active ? " active" : ""}${disabled ? " disabled" : ""}`}>
        <div className={`step-accordeon__step-header${header==="About" ? " no-padding" : ""}`} onClick={()=>{if(!disabled) setActive(!active);}}>
          <div className="step-accordeon-step-header__text-container">
            <Text className="step-accordeon-step-header__text" small paragraph>Step {step} of 3</Text>
            <h2 className="step-accordeon-step-header__heading">
              <Heading large>{header}</Heading>

              <a href={`/guidelines-upload-artworks?section=${header.toLowerCase()}`} onClick={(e)=>e.stopPropagation()} target="_blank" rel='noreferrer' aria-label='Suarte guidelines for uploading artworks'>
                <InfoIcon className="step-accordeon-step-header__info-icon"/>
              </a>
            </h2>
          </div>

          {(editMode===false && (previewMode === true || step <= lastCompletedStep)) && (<PublicSuccessCheck className="step-accordeon-step-header__completed-icon"/>)}
          <OpenStepAccordeonIcon className="step-accordeon-step-header__icon"/>
        </div>

        <div className={`step-accordeon__content ${active ? activeClassName : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
}
