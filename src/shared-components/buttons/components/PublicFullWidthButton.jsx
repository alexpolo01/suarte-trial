import BarsLoader from '@/shared-components/loaders/components/BarsLoader';

import './styles/PublicFullWidthButton.scss';

export default function PublicFullWidthButton({ children, loading=false, success=false, successText="", disabled=false }) {
  if(success === true) {
    return (
      <button className="public-full-width__button" disabled>
        {successText}
      </button>
    );
  }

  return (
    <>
      <button className={(loading || disabled) ? "public-full-width__button disabled" : "public-full-width__button"} disabled={loading || disabled}>
        {loading && <BarsLoader className="public-full-width__loader"/>}
        <span>{children}</span>
      </button>
    </>
  );
}
