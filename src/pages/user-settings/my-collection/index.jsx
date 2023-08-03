import config from '@/config';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import Loader from './components/Loader';
import ClaimArtwork from './claim-artwork';
import VirtualList from './virtual-list';

import './index.css';

export default function MyCollection() {
  const { state } = useStateHandler();
  const { loading, fetchData, setFetchData, loadMoreData } = useCache("my_collection", `${config.apis.api.url}/collection/${state.user_session._id}`, {
    injectToken: true,
    includeSearchQueries: { visibility: "private" }, 
    invalidateWhen: ["BUY_ARTWORK"]
  });
  const { cacheHandler } = useStateHandler();

  function onClaimArtwork(newArtwork) {
    setFetchData({
      totalDocs: fetchData.totalDocs + 1,
      data: [
        newArtwork,
        ...fetchData.data
      ]
    });

    cacheHandler.triggerAction("EDIT_COLLECTION");
  }

  function changeArtworkVisibility(productToChange, isPrivate) {
    const newProductData = {
      ...productToChange,
      product_metadata: {
        ...productToChange.product_metadata,
        is_private: isPrivate
      }
    };

    UserService.editProduct(newProductData);
    cacheHandler.triggerAction("EDIT_COLLECTION");
    setFetchData({
      ...fetchData,
      data: fetchData.data.map(product => {
        if(product.product_id === productToChange.product_id) {
          return newProductData;
        } else {
          return product;
        }
      })
    });
  }

  return (
    <>
      <SettingsHeading text="My collection"/>
            
      <div className="settings-my-collection__container">
        {
          loading ? 
            <Loader/>
            : 
            <>
              <ClaimArtwork onClaimArtwork={onClaimArtwork}/>

              {
                fetchData.data.length === 0 ? 
                  <Text className="settings-my-collection__text" medium>
                                        Begin curating your art collection with pieces that inspire you. 
                                        Find artworks that resonate and bring beauty to your personal gallery.
                  </Text>
                  :
                  <VirtualList
                    items={fetchData}
                    onLoadMore={loadMoreData}
                    changeArtworkVisibility={changeArtworkVisibility}
                  />
              }
            </>
        }
      </div>
    </>
  );
}
