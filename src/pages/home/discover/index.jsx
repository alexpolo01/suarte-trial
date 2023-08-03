import { useNavigate } from 'react-router-dom';

import config from '@/config';
import useCache from '@/hooks/useCache';
import HomeNavigation from '@/shared-components/home/components/HomeNavigation';
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import ArtworkOfTheDay from './components/ArtworkOfTheDay';
import HomeBanner from './components/HomeBanner';
import HomeLinks from './components/HomeLinks';
import HomeSlider from './components/HomeSlider';
import SkeletonPage from './components/SkeletonPage';

// import StoryTold from './components/StoryTold';
import './index.css';

function HomeContent({ fetchData }) {
  const navigate = useNavigate();

  return (
    <>
      <HomeSlider 
        artworks={fetchData.slider1.collection_artworks} 
        category={fetchData.slider1.collection_name}
        endpoint={`/category/${fetchData.slider1.collection_id}?`} 
        total={fetchData.slider1.total}
        link={fetchData.slider1.collection_url}
      />

      <HomeBanner
        mobileImage="ef83cebc-900f-4c21-c026-139323687500" 
        desktopImage="6c2636e2-f5f5-4dfc-4158-299dca1a7f00"
        onClick={()=>navigate("/suarteworld", { state: { from: true } })}
      />

      <ArtworkOfTheDay collectionData={fetchData.artwork_of_the_day}/>

      <HomeBanner
        mobileImage="4834abfe-6362-449b-cbd0-63a1c4548300" 
        desktopImage="5166fcee-d4c7-48e8-0bfa-0ab589bcdd00"
        onClick={()=>navigate("/limited-editions", { state: { from: true } })}
      />

      <HomeSlider 
        artworks={fetchData.slider2.collection_artworks} 
        category={fetchData.slider2.collection_name} 
        endpoint={`/category/${fetchData.slider2.collection_id}?`} 
        total={fetchData.slider2.total}
        link={fetchData.slider2.collection_url}
      />

      <HomeBanner
        mobileImage="3fbe9367-dffd-4854-51c5-a9ea44a36500" 
        desktopImage="7dd32638-303b-4fb5-e50f-a0608be07a00"
        onClick={()=>navigate("/rankings", { state: { from: true } })}
      />

      <HomeSlider 
        artworks={fetchData.slider3.collection_artworks} 
        category={fetchData.slider3.collection_name} 
        endpoint={`/category/${fetchData.slider3.collection_id}?`} 
        total={fetchData.slider3.total}
        link={fetchData.slider3.collection_url}
      />

      <HomeSlider 
        artworks={fetchData.slider4.collection_artworks} 
        category={fetchData.slider4.collection_name} 
        endpoint={`/category/${fetchData.slider4.collection_id}?`} 
        total={fetchData.slider4.total}
        link={fetchData.slider4.collection_url}
      />

      {/* <StoryTold 
                storyToldArtwork={fetchData.story_told.collection_artworks[0]} 
                artworks={fetchData.story_told.collection_artworks.slice(1)}
            /> */}
    </>
  );
}

export default function HomeDiscover() {
  const { loading, fetchData } = useCache(`home_discover`, `${config.apis.api.url}/home`, {
    expiresIn: ["10", "minutes"]
  });

  return (
    <>
      <AppNavigationPage>
        <div className="home-discover__page">
          <HomeNavigation active="discover"/>
                    
          <HomeLinks/>

          {
            loading ? 
              <SkeletonPage/>
              :
              <HomeContent fetchData={fetchData}/>
          }
        </div>
      </AppNavigationPage>
    </>
  );
}
