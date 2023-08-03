import SkeletonArtworkCard from '@/shared-components/loaders/components/SkeletonArtworkCard';

import './styles/SkeletonPage.css';

export default function SkeletonPage() {
  return (
    <>
      <div className="collection-page-skeleton-page">
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
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
        <SkeletonArtworkCard/>
      </div>
    </>
  );
}
