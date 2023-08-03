import { useEffect, useRef,useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import config from "@/config";
import useStateHandler from "@/hooks/useStateHandler";
import fetchWrapper from "@/services/fetchWrapper.service";

export default function useArtwork() {
  const { cacheHandler } = useStateHandler();
  const { artworkId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState(()=>initArtworks()); /** AWESOME BUG. DO NOT DO THIS. ALWAYS USE A FUNCTION ()=>. IF NOT, IT GETS CALLED EVERYTIME because of javascript, not react */
  const [activeSlide, setActiveSlide] = useState(()=>initActiveSlide());
  const [loading, setLoading] = useState(artworks ? false : true);
  const [error, setError] = useState(null);
  const loadMoreLoading = useRef(false);
  const shouldLoadMore = (Boolean(artworks) && artworks.data.length < artworks.totalDocs && Boolean(artworks.endpoint));

  function initArtworks() {
    const valueFromCacheKey = location.state?.cacheKey ? cacheHandler.getCacheValue(location.state.cacheKey) : null;

    if(Boolean(valueFromCacheKey) && !valueFromCacheKey.isDataInvalid) {
      return valueFromCacheKey.data;
    } else {
      const valueFromArtworkId = cacheHandler.getCacheValue(`artwork_${artworkId}`);

      if(Boolean(valueFromArtworkId) && !valueFromArtworkId.isDataInvalid) {
        return valueFromArtworkId.data;
      } else {
        return null;
      }
    }
  }

  function initActiveSlide() {
    if(artworks) {
      const indexOfArtwork = artworks.data.findIndex(artwork => artwork.product_id ? artwork.product_id === artworkId : artwork._id === artworkId);
      return indexOfArtwork !== -1 ? indexOfArtwork : 0;
    } else {
      return 0;
    }
  }

  /**
     * Only load one artwork
     */
  useEffect(() => {
    if(!artworks) {
      fetchWrapper.post(`${config.apis.api.url}/artwork/visit/${artworkId}`, {
        injectToken: true
      });
      fetchWrapper.get(`${config.apis.api.url}/artwork/${artworkId}`, {
        injectToken: true
      })
        .then(({ response, data }) => {
          if(response.ok) {
            const dataToStore = { totalDocs: 1, data: [data] };

            setArtworks(dataToStore);
            setLoading(false);
            cacheHandler.storeInCache(`artwork_${artworkId}`, dataToStore, {
              invalidateWhen: ["EDIT_ARTWORK", "DELETE_ARTWORK", "BUY_ARTWORK"]
            });
          } else if(response.status === 404) {
            setLoading(false);
            setError(true);
          }
        });
    }
  }, []);

  /**
     * onSlideChange logic (only when we have multiple artworks)
     */
  useEffect(() => {
    if(shouldLoadMore && (activeSlide >= (artworks.data.length - 3)) && !loadMoreLoading.current) {
      loadMoreLoading.current = true;

      fetchWrapper.get(`${config.apis.api.url}${artworks.endpoint}&offset=${artworks.data.length}`, {
        injectToken: true
      })
        .then(({ response, data }) => {
          loadMoreLoading.current = false;

          if(response.ok) {
            const dataToStore = { ...artworks, totalDocs: data.totalDocs, data: [...artworks.data, ...data.data] };

            setArtworks(dataToStore);
            cacheHandler.storeInCache(location.state.cacheKey, dataToStore, {
              invalidateWhen: ["EDIT_ARTWORK", "DELETE_ARTWORK", "BUY_ARTWORK"]
            });
          }
        });
    }

    if(artworks && (artworkId !== artworks.data[activeSlide]._id)) {
      navigate(`/artwork/${artworks.data[activeSlide]._id}`, {
        replace: true, 
        state: location.state
      });
    }
  }, [activeSlide]);

  useEffect(() => {
    if(artworks) {
      fetchWrapper.post(`${config.apis.api.url}/artwork/visit/${artworks.data[activeSlide]._id}`, {
        injectToken: true
      });
    }
  }, [activeSlide]);
    
  return { loading, error, artworks, shouldLoadMore, activeSlide, setActiveSlide };
}
