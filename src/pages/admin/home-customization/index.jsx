// eslint-disable-next-line simple-import-sort/imports
import { useNavigate } from "react-router-dom";
import "./index.css";
import BackArrowIcon from "@/shared-components/icons/components/public/BackArrowIcon";
import ContinueButton from "@/shared-components/buttons/components/ContinueButton";
import update from 'immutability-helper';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Carousel from "./Carousel";
import useCache from "@/hooks/useCache";
import { useEffect, useState } from "react";
import config from "@/config";
import useStateHandler from "@/hooks/useStateHandler";
import InternalCollectionService from "@/services/internalcollection.service";
import Text from "@/shared-components/text/components/Text";

export default function HomeCustomization() {
  const navigate = useNavigate();
  const [changesMade, setChangesMade] = useState(false);
  const { cacheHandler } = useStateHandler();
  
  const { fetchData: fetchData_m, refetch: refetch_m } = useCache(
    `internal-collections`,
    `${config.apis.api.url}/internalcollection/true`,
    {
      type: "@cache/dynamic",
      injectToken: true,
    }
  );
  const { fetchData: fetchData_b, refetch: refetch_b } = useCache(
    `internal-collections`,
    `${config.apis.api.url}/internalcollection/false`,
    {
      type: "@cache/dynamic",
      injectToken: true,
    }
  );
  const [mItems, setMItems] = useState([]);
  const [bItems, setBItems] = useState([]);

  const moveMItem = (dragIndex, hoverIndex) => {
    setMItems((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    );
  };
  const moveBItem = (dragIndex, hoverIndex) => {
    setBItems((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    );
  };
  useEffect(() => {
    if(!fetchData_b || !fetchData_m) return;
    if(!mItems.length || !bItems.length) return;
    let match = fetchData_m.data.every((v, id) => v.collection_id === mItems[id].collection_id);
    match = match && fetchData_b.data.every((v, id) => v.collection_id === bItems[id].collection_id);
    setChangesMade(!match);
  }, [mItems, bItems]);

  useEffect(() => {
    cacheHandler.storeInCache('internalcollections', fetchData_m);
    if(fetchData_m) setMItems(fetchData_m.data);
  }, [fetchData_m]);

  useEffect(() => {
    if(fetchData_b) setBItems(fetchData_b.data);
  }, [fetchData_b]);
  
  const onClickBack = () => {
    navigate(-1);
  };

  const onCustomizeCarousel = (item) => {
    if(item.banner) {
      alert('This item is banner');
      return;
    }
    navigate(`/admin/customize-existing-carousel/${item.collection_id}`);
  };

  const onAddCarousel = () => {
    navigate('/admin/add-carousel');
  };

  const handleSaveChanges = async () => {
    setChangesMade(false);

    let match = fetchData_m.data.every((v, id) => v.collection_id === mItems[id].collection_id);
    if(!match) {
      let idx, i, changed = [];
      for(idx = mItems.length - 1; idx >= 0; idx --) {
        if(mItems[idx].collection_id !== fetchData_m.data[idx].collection_id)
          break;
      }
      for(i = 0; i <= idx; i ++)
        changed.push(mItems[i].collection_id);

      await InternalCollectionService.updateCollectionsOrder(changed, true);
      refetch_m();
    }
    match = fetchData_b.data.every((v, id) => v.collection_id === bItems[id].collection_id);
    if(!match) {
      let idx, i, changed = [];
      for(idx = bItems.length - 1; idx >= 0; idx --) {
        if(bItems[idx].collection_id !== fetchData_b.data[idx].collection_id)
          break;
      }
      for(i = 0; i <= idx; i ++)
        changed.push(bItems[i].collection_id);

      await InternalCollectionService.updateCollectionsOrder(changed, false);
      refetch_b();
    }
  };

  return (
    <div className="home-customization__container">
      <div className="home-customization__header">
        <div className="home-customization__header-back">
          <BackArrowIcon onClick={onClickBack} />
        </div>
        <h4 className="home-customization__header-text">Home</h4>
        <div className="home-customization__header-logout">
          <ContinueButton turnOff={!changesMade} onClick={() => handleSaveChanges()}>Save changes</ContinueButton>
        </div>
      </div>
      <div className="home-customization__panel">        
        <div className="home-customization__box">
          <Text className="home-customization__text">Browser Order</Text>
          <DndProvider backend={HTML5Backend}>
            { bItems.map((item, idx) => 
              <Carousel
                key={item.collection_id}
                data={item} 
                index={idx}
                id={item.collection_id}
                onClick={() => onCustomizeCarousel(item)} 
                moveItem={moveBItem} 
              />
            ) }
          </DndProvider>  
        </div>
        <div className="home-customization__box">
          <Text className="home-customization__text">Mobile Order</Text>
          <DndProvider backend={HTML5Backend}>
            { mItems.map((item, idx) => 
              <Carousel
                key={item.collection_id}
                data={item} 
                index={idx}
                id={item.collection_id}
                onClick={() => onCustomizeCarousel(item)} 
                moveItem={moveMItem} 
              />
            ) }
          </DndProvider>  
        </div>
      </div>
      <a className="home-customization__add-carousel" onClick={onAddCarousel}>
        ADD CAROUSEL
      </a>
    </div>
  );
}
