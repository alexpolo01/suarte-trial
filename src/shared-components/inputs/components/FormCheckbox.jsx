import PublicSuccessCheck from '@/shared-components/icons/components/public/PublicSuccessCheck';

import './styles/FormCheckbox.scss';

export default function FormCheckbox({ className="", element, readOnly=false, value, onChange }) {
  return (
    <>
      <div 
        tabIndex={0} 
        id={element ? `${element}_error` : undefined} 
        className={`${className} form-checkbox__custom-checkbox ${readOnly ? "read-only" : ""}`} 
        onClick={() => onChange(!value)}
      > 
        {value && <PublicSuccessCheck className="form-checkbox__check"/>}
      </div>
    </>
  );
}
