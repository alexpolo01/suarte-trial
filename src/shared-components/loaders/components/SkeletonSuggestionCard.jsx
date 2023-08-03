import './styles/SkeletonSuggestionCard.css';

export default function SkeletonSuggestionCard() {
  return (
    <>
      <div className="skeleton-suggestion-card">
        <div className="skeleton-suggestion-card__user-image"/>
        <div className="skeleton-suggestion-card__text-container">
          <div className="skeleton-suggestion-card__name"/>
          <div className="skeleton-suggestion-card__user-name"/>
        </div>
      </div>
    </>
  );
}
