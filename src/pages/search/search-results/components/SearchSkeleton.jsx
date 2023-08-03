import SkeletonArtworkCard from '@/shared-components/loaders/components/SkeletonArtworkCard';

import './styles/SearchSkeleton.css';

export default function SearchSkeleton() {
  return (
    <>
      <div className="search-skeleton-page">
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>

        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>

        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
      </div>
    </>
  );
}
