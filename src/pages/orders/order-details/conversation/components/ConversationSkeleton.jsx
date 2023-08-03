import SkeletonMessage from '@/shared-components/loaders/components/SkeletonMessage';

import './styles/ConversationSkeleton.css';

export default function ConversationSkeleton() {
  return (
    <>
      <div className="conversation-skeleton__container remove-scrollbar">
        <SkeletonMessage isMine/>

        <SkeletonMessage/>
        <SkeletonMessage isMine/>
        <SkeletonMessage isMine/>

        <SkeletonMessage/>
        <SkeletonMessage isMine/>
        <SkeletonMessage isMine/>

        <SkeletonMessage/>
        <SkeletonMessage isMine/>
        <SkeletonMessage isMine/>
                
        <SkeletonMessage/>
        <SkeletonMessage isMine/>
        <SkeletonMessage isMine/>
      </div>
    </>
  );
}
