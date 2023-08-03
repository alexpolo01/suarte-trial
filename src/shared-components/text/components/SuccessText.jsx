import PublicSuccessCheck from '@/shared-components/icons/components/public/PublicSuccessCheck';

import './styles/SuccessText.scss';

export default function SuccessText({ children, className="" }) {
  return (
    <>
      <p className={`success-text__text ${className}`}>
        <PublicSuccessCheck className="success-text__success-check"/>
        {children}
      </p>
    </>
  );
}
