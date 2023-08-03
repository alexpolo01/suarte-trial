import CustomSpinner from './CustomSpinner';

import './styles/LoadingSpinnerPage.css';

export default function LoadingSpinnerPage({ defaultColor=false }) {
  return (
    <>
      <div className="loading-spinner-page">
        <CustomSpinner className="loading-spinner__spinner" defaultColor={defaultColor} thin/>
      </div>
    </>
  );
}
