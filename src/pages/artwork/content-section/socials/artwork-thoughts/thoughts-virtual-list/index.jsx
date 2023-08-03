import { useContext } from 'react';
import { Virtuoso } from "react-virtuoso";

import ArtworkDataContext from '@/context/ArtworkDataContext';

import ThoughtCard from './components/ThoughtCard';

import './index.css';

export default function ThoughtsVirtualList({ fetchData, loadMoreThoughts, loadRepliesOfThought, setReply, onLikeAction }) {
  const { artworkData } = useContext(ArtworkDataContext);

  return (
    <>
      <Virtuoso
        className="remove-scrollbar"
        id={`artwork_${artworkData._id}_thoughts-virtual-list`}
        style={{ width: "100%", height: "100%" }}
        data={fetchData.data}
        endReached={fetchData.nextThoughtOffset < fetchData.totalDocs ? loadMoreThoughts : null}
        increaseViewportBy={200}
        itemContent={(index, thought) => (
          <ThoughtCard 
            thoughtData={thought}
            loadRepliesOfThought={loadRepliesOfThought}
            setReply={setReply}
            onLikeAction={onLikeAction}
          />
        )}
      />
    </>
  );
}
