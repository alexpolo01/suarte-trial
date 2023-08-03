import SkeletonCollectionCard from './SkeletonCollectionCard';

import './styles/OrdersSkeleton.css';

export default function OrdersSkeleton({ hideHeader=false }) {
  return (
    <>
      <div className={`orders-skeleton__container ${hideHeader ? "hide-header" : ""}`}>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
        <SkeletonCollectionCard/>
      </div>
    </>
  );
}
