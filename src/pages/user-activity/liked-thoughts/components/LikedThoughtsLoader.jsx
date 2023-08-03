import SkeletonCommunityThought from '@/shared-components/loaders/components/SkeletonCommunityThought';

import './styles/LikedThoughtsLoader.css';

export default function LikedThoughtsLoader() {
  return (
    <>
      <div className="liked-thoughts-loader">
        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>

        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>

        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>

        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>
        <SkeletonCommunityThought/>
      </div>
    </>
  );
}
