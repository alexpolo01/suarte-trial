import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import RoadSVG from './components/RoadSVG';
import StepInfo from './components/StepInfo';

import './index.css';

export default function SuarteRoadContent({ fetchData }) {
  if(!fetchData) {
    return (
      <CustomSpinner className="suarte-road__spinner" thin/>
    );
  } else {
    return (
      <>
        <div className="suarte-road-content__container">
          <div className="suarte-road-content__svg">
            <RoadSVG currentRoadStep={fetchData.step}/>
          </div>

          <div className="suarte-road-content__step-info">
            <StepInfo currentRoadStep={fetchData.step}/>
          </div>
        </div>
      </>
    );
  }
}
