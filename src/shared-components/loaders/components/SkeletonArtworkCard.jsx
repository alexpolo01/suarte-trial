import './styles/SkeletonArtworkCard.css';

export default function SkeletonArtworkCard({ className="" }) {
  return (
    <>
      <div className={className}>
        <div className="skeleton-artwork-card__skeleton-image"/>
        <div className="skeleton-artwork-card__skeleton-skeleton-text large"/>
        <div className="skeleton-artwork-card__skeleton-skeleton-text small"/>
        <div className="skeleton-artwork-card__skeleton-skeleton-text medium"/>
        <div className="skeleton-artwork-card__skeleton-skeleton-text extra-small"/>
      </div>
    </>
  );
}
