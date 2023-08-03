import SkeletonThought from '@/shared-components/loaders/components/SkeletonThought';

import './styles/ThoughtsLoading.css';

export default function ThoughtsLoading() {
  return (
    <>
      <div 
        className="artwork-view-thoughts-loading__container remove-scrollbar" 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
      >
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
        <SkeletonThought/>
      </div>
    </>
  );
}