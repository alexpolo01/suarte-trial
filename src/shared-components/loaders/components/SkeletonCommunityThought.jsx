import './styles/SkeletonCommunityThought.css';

export default function SkeletonCommunityThought() {
  return (
    <>
      <div className="skeleton-community-thought__container">
        <div className="skeleton-community-thought__content">
          <div className="skeleton-community-thought__user-image"/>

          <div className="skeleton-community-thought__text-section">
            <div className="skeleton-community-thought__bigger-text"/>

            <div className="skeleton-community-thought__text" style={{ width: "100%" }}/>
            <div className="skeleton-community-thought__text" style={{ width: "100%" }}/>
            <div className="skeleton-community-thought__text" style={{ width: "100%" }}/>
            <div className="skeleton-community-thought__text" style={{ width: "100%" }}/>
            <div className="skeleton-community-thought__text" style={{ width: "30%" }}/>
          </div>
        </div>

        <div className="skeleton-community-thought__artwork"/>
      </div>
    </>
  );
}
