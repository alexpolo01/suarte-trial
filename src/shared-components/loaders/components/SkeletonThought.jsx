import './styles/SkeletonThought.css';

export default function SkeletonThought() {
  return (
    <>
      <div className="skeleton-thought__container">
        <div className="skeleton-thought__user-image"/>
        <div className="skeleton-thought__thoughts-container">
          <div className="skeleton-thought__line name"/>
          <div className="skeleton-thought__line"/>
          <div className="skeleton-thought__line"/>
          <div className="skeleton-thought__line short"/>
        </div>
      </div>
    </>
  );
}
