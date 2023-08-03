import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";

import config from "@/config";
import useCache from "@/hooks/useCache";
import useStateHandler from "@/hooks/useStateHandler";
import SkeletonArtwork from "@/shared-components/loaders/components/SkeletonArtwork";

export default function SuarteWorld() {
  const { loading, fetchData } = useCache("suarteworld", `${config.apis.api.url}/suarteworld?seed=${parseInt(Math.random()*1000000)}`, { expiresIn: ["0", "seconds"] });
  const { cacheHandler } = useStateHandler();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!loading) {
      cacheHandler.storeInCache("artworks_of_suarteworld", { ...fetchData, endpoint: `/suarteworld?seed=${parseInt(Math.random()*1000000)}` }, {
        invalidateWhen: ["EDIT_ARTWORK", "DELETE_ARTWORK"]
      });

      navigate(`/artwork/${fetchData.data[0]._id}`, {
        state: {
          cacheKey: "artworks_of_suarteworld",
          from: location.state?.from
        },
        replace: true
      });
    }
  }, [loading]);

  return (
    <>
      <SkeletonArtwork/>
    </>
  );
}
