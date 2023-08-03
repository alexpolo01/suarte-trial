import SkeletonArtlist from '@/shared-components/loaders/components/SkeletonArtlist';

import './styles/SkeletonPage.css';

export default function SkeletonPage() {
  return (
    <>
      <div className="home-artlists-skeleton-page">
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
        <SkeletonArtlist/>
        <SkeletonArtlist/>
        <SkeletonArtlist/>
      </div>
    </>
  );
}
