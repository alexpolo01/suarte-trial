import './styles/SkeletonArtlist.css';

export default function SkeletonArtlist({ className="" }) {
  return (
    <>
      <div className={`skeleton-artlist__container ${className}`}>
        <div className="skeleton-artlist__image"/>

        <div className="skeleton-artlist__info">
          <div className="skeleton-artlist__texts">
            <div className="skeleton-artlist__title"/>
            <div className="skeleton-artlist__by"/>
          </div>

          <div className="skeleton-artlist__artwork-count"/>
        </div>
      </div>
    </>
  );
}
