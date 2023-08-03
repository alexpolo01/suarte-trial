import SkeletonUserCard from '@/shared-components/loaders/components/SkeletonUserCard';

import './styles/SkeletonPage.css';

export default function SkeletonPage() {
  return (
    <>
      <div className="home-galleries-skeleton-page">
        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>

        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>

        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>
        <SkeletonUserCard/>
      </div>
    </>
  );
}
