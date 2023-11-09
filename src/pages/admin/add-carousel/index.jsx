// eslint-disable-next-line simple-import-sort/imports
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import BackArrowIcon from "@/shared-components/icons/components/public/BackArrowIcon";
import { useEffect, useState } from "react";
import PublicFormInput from "@/shared-components/inputs/components/PublicFormInput";
import ContinueButton from "@/shared-components/buttons/components/ContinueButton";
import AddArtworksPopup from "../add-artworks-popup";
import ArtworkRow from "./components/ArtworkRow";
import fetchWrapper from "@/services/fetchWrapper.service";
import config from "@/config";

export default function AddCarousel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [title, setTitle] = useState(id);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    setError(null);
  }, []);

  const onClickBack = () => {
    navigate(-1);
  };

  const onAddArtworks = (data) => {
    setArtworks(data);
    setPopupOpen(false);
  };

  const getIdFromTitle = () => {
    const string = title;
    const mArr = string.split(' ');
    for(let i = 0; i < mArr.length; i ++)
      mArr[i] = mArr[i].toLowerCase();
    return mArr.join('-');
  };

  const onSaveChanges = async () => {
    const collection = await fetchWrapper.post(`${config.apis.api.url}/internalcollection`, {
      injectToken: true,
      body: {
        collection_id: getIdFromTitle(title),
        collection_name: title
      }
    });
    artworks.forEach(async artwork => {
      await fetchWrapper.post(`${config.apis.api.url}/collection/${collection.data.collection_id}/artwork/${artwork._id}`, {
        injectToken: true
      });
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
          <ContinueButton onClick={onSaveChanges}>Save changes</ContinueButton>
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
          {
            artworks.map((artwork, idx) => <ArtworkRow key={idx} artwork={artwork} onClickRemove={() => {}} />)
          }
        </div>
      </div>
      <AddArtworksPopup open={popupOpen} onClose={() => setPopupOpen(false)} artworks={artworks} addArtworks={onAddArtworks} />
    </div>
  );
}
