import { useContext, useState } from 'react';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';

import VirtualList from './components/VirtualList';
import Options from './options';

import './index.css';

export default function ArtlistBody({ cacheKey }) {
  const { artlistData, setArtlistData, isCreator } = useContext(ArtlistDataContext);
  const [openAddArtworks, setOpenAddArtworks] = useState(false);

  return (
    <>
      <Options 
        openAddArtworks={openAddArtworks} 
        setOpenAddArtworks={setOpenAddArtworks}
      />

      {
        artlistData.artlist_artworks.length === 0 ?
          isCreator ?
            <div className="artlist-content__empty">
              <p className="artlist-content__empty-text mt-m">
                                It seems like you haven't added any artworks to your artlist yet. 
                                Start exploring and add your favorite pieces to create your own unique collection!
              </p>

              <ContinueButton className="artlist-content__empty-button" onClick={()=>setOpenAddArtworks(true)}>
                                Add artworks
              </ContinueButton>
            </div>
            :
            <div className="artlist-content__empty">
              <p className="artlist-content__empty-text mt-m">
                                It seems like {artlistData.artlist_creator.user_username} hasn't added 
                                any artworks to the artlist yet. Stay tuned for future additions!
              </p>
            </div> 
          :
          <VirtualList 
            items={artlistData} 
            setItems={setArtlistData} 
            cacheKey={cacheKey}
          />
      }
    </>
  );
}
