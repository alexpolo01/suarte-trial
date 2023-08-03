import SkeletonCollectionCard from '@/shared-components/loaders/components/SkeletonCollectionCard';

import './styles/Loader.css';

export default function Loader() {
  return (
    <>
      <div className="settings-my-collection__loader">
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
