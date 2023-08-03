import SkeletonArtworkCard from '@/shared-components/loaders/components/SkeletonArtworkCard';

import './styles/SavedArtworksLoader.css';

export default function SavedArtworksLoader() {
  return (
    <>
      <div className="saved-artworks-loader">
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
