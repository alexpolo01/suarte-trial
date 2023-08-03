import { useEffect,useMemo, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AutoSizer, List,WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import VerifyGalleryArtworkCard from '@/shared-components/cards/components/VerifyGalleryArtworkCard';
import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function UploadedArtworks() {
  const { fetchData } = useOutletContext();
  const draftsCount = useMemo(()=>fetchData.drafts.filter(draft => draft.draft_status === "incomplete").length, [fetchData]);
  const uploadedArtworks = useMemo(()=>fetchData.drafts.filter(draft => draft.draft_status !== "incomplete"), [fetchData]);
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  return (
    <>
      {
        draftsCount > 0 ?
          <Link to="/verify-gallery/uploaded-artworks/drafts" state={{ from: true }} className="uploaded-artworks__drafts-container"> 
            <Text className="uploaded-artworks__draft-counter" large>
                            Drafts <span className="drafts-number">({draftsCount})</span>
            </Text>
                        
            <ForwardArrowIcon className="uploaded-artworks__drafts-enter-icon"/>
          </Link>
          :

          <div className="uploaded-artworks__drafts-container">
            <Text className="uploaded-artworks__draft-counter" large>
                        Drafts <span className="drafts-number">(0)</span>
            </Text>
          </div>
      }
            
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                autoHeight
                width={width === 0 ? 0.1 : width}
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                rowCount={uploadedArtworks.length}
                rowHeight={screenSize.width <= 500 ? 150 : screenSize.width <= 1004 ? 165 : 231}
                scrollTop={scrollTop}
                overscanRowCount={3}
                ref={listRef}
                rowRenderer={({ index, key, style }) => (
                  <div key={key} style={style}>
                    <VerifyGalleryArtworkCard artworkData={uploadedArtworks[index]}/>
                  </div>
                )}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </>
  );
}
