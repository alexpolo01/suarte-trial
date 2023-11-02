// eslint-disable-next-line simple-import-sort/imports
import { useNavigate } from "react-router-dom";
import "./index.css";
import BackArrowIcon from "@/shared-components/icons/components/public/BackArrowIcon";
import ContinueButton from "@/shared-components/buttons/components/ContinueButton";
import useCache from "@/hooks/useCache";
import config from "@/config";
import { useEffect } from "react";
import useStateHandler from "@/hooks/useStateHandler";

export default function HomeCustomization() {
  const { fetchData } = useCache(
    `internal-collections`,
    `${config.apis.api.url}/internalcollection`,
    {
      type: "@cache/dynamic",
      injectToken: true,
    }
  );

  const navigate = useNavigate();
  const { cacheHandler } = useStateHandler();

  const onClickBack = () => {
    navigate(-1);
  };

  const onCustomizeCarousel = (id) => {
    navigate(`/admin/customize-existing-carousel/${id}`);
  };

  const onAddCarousel = () => {
    navigate('/admin/add-carousel');
  };

  useEffect(() => {
    cacheHandler.storeInCache('internalcollections', fetchData);
  }, [fetchData]);

  return (
    <div className="home-customization__container">
      <div className="home-customization__header">
        <div className="home-customization__header-back">
          <BackArrowIcon onClick={onClickBack} />
        </div>
        <h4 className="home-customization__header-text">Home</h4>
        <div className="home-customization__header-logout">
          <ContinueButton>Log out</ContinueButton>
        </div>
      </div>
      <div className="home-customization__box">
        { fetchData && fetchData.data.map(dat => <a key={dat.collection_id} onClick={() => onCustomizeCarousel(dat.collection_id)} className="home-customization__link">{dat.collection_name}</a> ) }
        <a className="home-customization__link" onClick={onAddCarousel}>
          ADD CAROUSEL
        </a>
      </div>
    </div>
  );
}
