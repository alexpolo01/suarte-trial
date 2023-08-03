import SkeletonArtlist from '@/shared-components/loaders/components/SkeletonArtlist';

import './styles/LikedArtlistsLoader.css';

export default function LikedArtlistsLoader() {
  return (
    <>
      <div className="liked-artlists-loader">
        <SkeletonArtlist/>
        <SkeletonArtlist/>
        <SkeletonArtlist/>

        <SkeletonArtlist/>
        <SkeletonArtlist/>
        <SkeletonArtlist/>

        <SkeletonArtlist/>
        <SkeletonArtlist/>
        <SkeletonArtlist/>

        <SkeletonArtlist/>
        <SkeletonArtlist/>
        <SkeletonArtlist/>
      </div>
    </>
  );
}
