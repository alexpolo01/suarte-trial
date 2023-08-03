import { useEffect,useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AutoSizer, List,WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import VerifyGalleryArtworkCard from '@/shared-components/cards/components/VerifyGalleryArtworkCard';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function VerifiedArtworks() {
  const { fetchData } = useOutletContext();
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  return (
    <>
      {/* <Text className="verified-artworks__verified-counter" large paragraph justify>
                <span className="letter-spacing">
                    {verifiedArtworks.length > 3 ? 3 : verifiedArtworks.length}/3
                </span> artworks verified
            </Text> */}

      {/* ONLY DURING PRELAUNCH */}
      <Text className="verified-artworks__verified-counter" large paragraph justify>
                Artworks verified: <span className="letter-spacing">{fetchData.artworks.length}</span>
      </Text>

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
                rowCount={fetchData.artworks.length}
                rowHeight={screenSize.width <= 500 ? 150 : screenSize.width <= 1004 ? 165 : 231}
                scrollTop={scrollTop}
                overscanRowCount={3}
                ref={listRef}
                rowRenderer={({ index, key, style }) => (
                  <div key={key} style={style}>
                    <VerifyGalleryArtworkCard artworkData={fetchData.artworks[index]}/>
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
