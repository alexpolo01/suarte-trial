import { useNavigate } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

export default function useNavigateToArtwork(cacheKey, artworks, endpoint="") {
  const { cacheHandler } = useStateHandler();
  const navigate = useNavigate();

  function navigateToArtwork(artworkId) {
    cacheHandler.storeInCache(`artworks_of_${cacheKey}`, { ...artworks, endpoint }, {
      invalidateWhen: ["EDIT_ARTWORK", "DELETE_ARTWORK", "BUY_ARTWORK"]
    });

    navigate(`/artwork/${artworkId}`, {
      state: {
        cacheKey: `artworks_of_${cacheKey}`,
        from: true
      }
    });
  }

  return navigateToArtwork;
}