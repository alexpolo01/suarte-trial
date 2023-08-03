import SkeletonSuggestionCard from '@/shared-components/loaders/components/SkeletonSuggestionCard';

import './styles/SkeletonLoader.css';

export default function SkeletonLoader() {
  return (
    <>
      <div className="search-users-skeleton-loader remove-scrollbar">
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
        <SkeletonSuggestionCard/>
      </div>
    </>
  );
}
