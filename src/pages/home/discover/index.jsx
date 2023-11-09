import { useNavigate } from "react-router-dom";

import config from "@/config";
import useCache from "@/hooks/useCache";
import HomeNavigation from "@/shared-components/home/components/HomeNavigation";
import AppNavigationPage from "@/shared-components/wrappers/components/AppNavigationPage";

import ArtworkOfTheDay from "./components/ArtworkOfTheDay";
import HomeBanner from "./components/HomeBanner";
import HomeLinks from "./components/HomeLinks";
import HomeSlider from "./components/HomeSlider";
import SkeletonPage from "./components/SkeletonPage";

// import StoryTold from './components/StoryTold';
import "./index.css";

function HomeContent({ fetchData }) {
  const navigate = useNavigate();

  const banner_info = {
    "suarte-world": {
      mobileImage: "ef83cebc-900f-4c21-c026-139323687500",
      desktopImage: "6c2636e2-f5f5-4dfc-4158-299dca1a7f00",
      url: "suarteworld",
    },
    "limited-editions": {
      mobileImage: "4834abfe-6362-449b-cbd0-63a1c4548300",
      desktopImage: "5166fcee-d4c7-48e8-0bfa-0ab589bcdd00",
      url: "limited-editions",
    },
    rankings: {
      mobileImage: "3fbe9367-dffd-4854-51c5-a9ea44a36500",
      desktopImage: "7dd32638-303b-4fb5-e50f-a0608be07a00",
      url: "rankings",
    },
  };

  return (
    <>
      {fetchData.collections.map((slider) =>
        slider.collection_id === "masterpiece-of-the-day" ? (
          <ArtworkOfTheDay key={slider.collection_id} collectionData={slider} />
        ) : slider.banner === true ? (
          <HomeBanner
            mobileImage={banner_info[slider.collection_id].mobileImage}
            desktopImage={banner_info[slider.collection_id].desktopImage}
            onClick={() =>
              navigate(`/${banner_info[slider.collection_id].url}`, {
                state: { from: true },
              })
            }
          />
        ) : (
          <HomeSlider
            key={slider.collection_id}
            artworks={slider.collection_artworks}
            category={slider.collection_name}
            endpoint={`/category/${slider.collection_id}?`}
            total={slider.total}
            link={slider.collection_url}
          />
        )
      )}
    </>
  );
}

export default function HomeDiscover() {
  const { loading, fetchData } = useCache(
    `home_discover`,
    `${config.apis.api.url}/home/${window.innerWidth<=550}`,
    {
      expiresIn: ["10", "minutes"],
    }
  );

  return (
    <>
      <AppNavigationPage>
        <div className="home-discover__page">
          <HomeNavigation active="discover" />

          <HomeLinks />

          {loading ? <SkeletonPage /> : <HomeContent fetchData={fetchData} />}
        </div>
      </AppNavigationPage>
    </>
  );
}
