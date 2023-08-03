import './styles/RemoveButton.css';

export default function RemoveButton({ className="", onClick=null }) {
  return (
    <>
      <div className={`generic-remove-button ${className} ${onClick ? "click" : ""}`} onClick={onClick}>
        <div/>
      </div>
    </>
  );
}
