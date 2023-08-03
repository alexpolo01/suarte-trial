import './styles/SkeletonUserCard.css';

export default function SkeletonUserCard({ className="" }) {
  return (
    <>
      <div className={`skeleton-user-card__container ${className}`}>
        <div className="skeleton-user-card__image"/>
        <div className="skeleton-user-card__name"/>
        <div className="skeleton-user-card__user-name"/>

        <div className="skeleton-user-card__stats">
          <div className="skeleton-user-card__stat">
            <div className="skeleton-user-card__stat-number"/>
            <div className="skeleton-user-card__stat-text"/>
          </div>

          <div className="skeleton-user-card__stat">
            <div className="skeleton-user-card__stat-number"/>
            <div className="skeleton-user-card__stat-text"/>
          </div>

          <div className="skeleton-user-card__stat">
            <div className="skeleton-user-card__stat-number"/>
            <div className="skeleton-user-card__stat-text"/>
          </div>
        </div>

        <div className="skeleton-user-card__follow"/>
      </div>
    </>
  );
}
