import './styles/SkeletonCollectionCard.css';

export default function SkeletonCollectionCard() {
  return (
    <>
      <div className="skeleton-collection-card__container">
        <div className="skeleton-collection-card__header">
          <div className="skeleton-collection-card__text first-text" style={{ width: "40%" }}/>
          <div className="skeleton-collection-card__text" style={{ width: "20%" }}/>
        </div>

        <div className="skeleton-collection-card__content">
          <div className="skeleton-collection-card__image"/>

          <div className="skeleton-collection-card__details">
            <div className="skeleton-collection-card__bigger-text" style={{ width: "40%", minWidth: "120px" }}/>

            <div style={{ width: "100%" }}>
              <div className="skeleton-collection-card__text" style={{ width: "28%", minWidth: "90px" }}/>
              <div className="skeleton-collection-card__text" style={{ width: "37%", minWidth: "105px" }}/>
              <div className="skeleton-collection-card__text" style={{ width: "32%", minWidth: "97px" }}/>
            </div>

            <div className="skeleton-collection-card__bigger-text" style={{ width: "20%", minWidth: "80px" }}/>
          </div>
        </div>
      </div>
    </>
  );
}
