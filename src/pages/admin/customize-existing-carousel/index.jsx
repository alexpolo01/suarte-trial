// eslint-disable-next-line simple-import-sort/imports
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import BackArrowIcon from "@/shared-components/icons/components/public/BackArrowIcon";
import { useEffect, useState } from "react";
import PublicFormInput from "@/shared-components/inputs/components/PublicFormInput";
import ContinueButton from "@/shared-components/buttons/components/ContinueButton";
import AddArtworksPopup from "../add-artworks-popup";
import useQuery from "@/hooks/useQuery";
import config from "@/config";
import VirtualList from "./components/VirtualList";
import useStateHandler from "@/hooks/useStateHandler";
import fetchWrapper from "@/services/fetchWrapper.service";
import Text from "@/shared-components/text/components/Text";

export default function CustomizeExistingCarousel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [query] = useState({ q: "" });
  const [title, setTitle] = useState(id);

  const { cacheHandler } = useStateHandler();
  
  const { loading, queryData, loadMoreData, fetchData } = useQuery(`customize-existing-carousel-${id}`, `${config.apis.api.url}/category/${id}`, query, {
    injectToken: true,
  });

  useEffect(() => {
    const coll_info = cacheHandler.getCacheValue('internalcollections');
    if(!coll_info) navigate('/admin/customize-home');
    const coll_name = coll_info.data.data.find(dat => dat.collection_id === id).collection_name;
    setTitle(coll_name);
  }, [id]);

  useEffect(() => {
    setError(null);
  }, []);

  const onClickBack = () => {
    navigate(-1);
  };

  const onAddArtworks = async (artworks) => {
    console.log(artworks);
    artworks.forEach(async artwork => {
      await fetchWrapper.post(`${config.apis.api.url}/collection/${id}/artwork/${artwork._id}`, {
        injectToken: true
      });
    });
    setTimeout(() => {
      fetchData();
    }, 2000);
    setPopupOpen(false);
  };

  const onClickRemove = async (artwork) => {
    await fetchWrapper.delete(`${config.apis.api.url}/internalcollection/${id}/artwork/${artwork._id}`, {
      injectToken: true
    });
    setTimeout(() => {
      fetchData();
    }, 2000);
  };

  const onDeleteCollection = async () => {
    await fetchWrapper.delete(`${config.apis.api.url}/internalcollection/${id}`, {
      injectToken: true
    });
    navigate(-1);
  };

  return (
    <div className="customize-existing-carousel__container">
      <div className="customize-existing-carousel__header">
        <div className="customize-existing-carousel__header-back">
          <BackArrowIcon onClick={onClickBack} />
        </div>
        <h4 className="customize-existing-carousel__header-text">Home</h4>
        <div className="customize-existing-carousel__header-logout">
          <ContinueButton>Log out</ContinueButton>
        </div>
      </div>
      <div>
        <PublicFormInput
          className="customize-existing-carousel__title-input"
          error={error}
          placeholder="Title"
          element="title"
          margin
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ContinueButton onClick={() => setPopupOpen(true)}>
          ADD ARTWORKS
        </ContinueButton>
        <div className="customize-existing-carousel__artworks-container">
          { !loading && <VirtualList
            key={queryData.queryString}
            items={queryData.data}
            onLoadMore={loadMoreData}
            onClickRemove={onClickRemove}
          /> }
        </div>
        <div className="customize-existing-carousel__logout-container">
          <button className="customize-existing-carousel__logout" onClick={onDeleteCollection}>
            <Text className="customize-existing-carousel__logout-text" large>Delete Collection</Text>
          </button>
        </div>
      </div>
      <AddArtworksPopup open={popupOpen} onClose={() => setPopupOpen(false)} artworks={[]} addArtworks={onAddArtworks} />
    </div>
  );
}
