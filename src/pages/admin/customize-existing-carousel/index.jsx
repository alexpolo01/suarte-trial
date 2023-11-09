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
import InternalCollectionService from "@/services/internalcollection.service";

export default function CustomizeExistingCarousel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [query] = useState({ q: "" });
  const [title, setTitle] = useState(id);
  const [changeMade, setChangeMade] = useState(false);
  const [changedOrder, setChangedOrder] = useState([]);

  const { cacheHandler } = useStateHandler();
  
  const { loading, queryData, loadMoreData, fetchData } = useQuery(`customize-existing-carousel-${id}`, `${config.apis.api.url}/category/${id}`, query, {
    injectToken: true,
  });

  useEffect(() => {
    const coll_info = cacheHandler.getCacheValue('internalcollections');
    if(!coll_info) navigate('/admin/customize-home');
    const coll_name = coll_info.data?.data?.find(dat => dat.collection_id === id).collection_name;
    setTitle(coll_name);
  }, [id]);

  useEffect(() => {
    setError(null);
  }, []);

  const onClickBack = () => {
    navigate(-1);
  };

  const onAddArtworks = async (artworks) => {
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

  const onChangeMade = (data) => {
    setChangedOrder(data);
    const match = data.every((v, id) => v === queryData.data.data[id]);
    setChangeMade(!match);
  };

  const onSaveChangedOrder = async () => {
    setChangeMade(false);
    if(id === 'masterpiece-of-the-day') {
      alert('You cannot change order for Masterpiece');
      fetchData();
      return;
    }

    let idx, i, changed = [];
    for(idx = changedOrder.length - 1; idx >= 0; idx --) {
      if(changedOrder[idx]._id !== queryData.data.data[idx]._id)
        break;
    }
    for(i = 0; i <= idx; i ++)
      changed.push(changedOrder[i]._id);

    await InternalCollectionService.updateArtworksOrder(changed, id);
    fetchData();
  };

  const onDeleteCollection = async () => {
    const res = confirm("Are you sure to delete this carousel?");
    if(!res) return;

    await fetchWrapper.delete(`${config.apis.api.url}/internalcollection/${id}`, {
      injectToken: true
    });
    navigate(-1);
  };

  const onShowAddArtworksPopup = () => {
    if(changeMade) {
      const res = confirm("Would you love to save your changes? Otherwise it will be discarded!");
      if(res)
        onSaveChangedOrder();
    }
    setPopupOpen(true);
  };

  return (
    <div className="customize-existing-carousel__container">
      <div className="customize-existing-carousel__header">
        <div className="customize-existing-carousel__header-back">
          <BackArrowIcon onClick={onClickBack} />
        </div>
        <h4 className="customize-existing-carousel__header-text">Home</h4>
        <div className="customize-existing-carousel__header-logout">
          <ContinueButton turnOff={!changeMade} onClick={onSaveChangedOrder}>Save Changes</ContinueButton>
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
        <ContinueButton onClick={onShowAddArtworksPopup}>
          ADD ARTWORKS
        </ContinueButton>
        <div className="customize-existing-carousel__artworks-container">
          { !loading && <VirtualList
            key={queryData.queryString}
            items={queryData.data}
            onLoadMore={loadMoreData}
            onClickRemove={onClickRemove}
            onChangeMade={onChangeMade}
          /> }
        </div>
        <div className="customize-existing-carousel__logout-container">
          <button className="customize-existing-carousel__logout" onClick={onDeleteCollection}>
            <Text className="customize-existing-carousel__logout-text" large>Delete Carousel</Text>
          </button>
        </div>
      </div>
      <AddArtworksPopup open={popupOpen} onClose={() => setPopupOpen(false)} artworks={[]} addArtworks={onAddArtworks} />
    </div>
  );
}
