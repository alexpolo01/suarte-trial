import './styles/SkeletonMessage.css';

export default function SkeletonMessage({ isMine=false }) {
  return (
    <>
      <div className={`skeleton-message__container ${isMine ? "is-mine" : ""}`}>
        <div className="skeleton-message__sender-image"/>

        <div className="skeleton-message__message"/>
      </div>
    </>
  );
}
