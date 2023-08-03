import './styles/CustomSpinner.scss';

export default function CustomSpinner({ className="custom-spinner__default-size", defaultColor=false, thin=false }) {
  return (
    <>
      <div className={`custom-spinner ${className} ${defaultColor ? "defaultColor" : ""} ${thin ? "thin" : ""}`}/>
    </>
  );
}
