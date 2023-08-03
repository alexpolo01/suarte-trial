import SkeletonArtworkCard from '@/shared-components/loaders/components/SkeletonArtworkCard';

import './styles/LikedArtworksLoader.css';

export default function LikedArtworksLoader() {
  return (
    <>
      <div className="liked-artworks-loader">
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
