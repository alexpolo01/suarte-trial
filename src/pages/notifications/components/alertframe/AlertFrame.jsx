import Interaction from '../interaction';
import Suarte from '../suarte';

import './AlertFrame.css';

export default function AlertFrame({ value, className = "" }) {

  return (
    <>
      <div className={className}>
        <div className='notification__content'>
          {value?.sbj_image?.length && (
            value.type ? (
              <div className='avaimg subject' style={{ height: "47px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                  <circle cx="23.5" cy="23.5" r="23.5" fill="rgba(30, 30, 30, 0.5)"/>
                  <image x="14" y="14" width="20" height="20" href={value.sbj_image} />
                </svg>
              </div>
            ) : (
              <img src={value.sbj_image} className='avaimg subject' />
            )
          )
          }
          <p className='instance'>
            {value?.type == false && <Interaction value={value} />}
            {value?.type == true && <Suarte value={value} />}
          </p>
          {value?.obj_image?.length &&
            <img src={value.obj_image} className='avaimg object' />
          }
        </div>
      </div>
    </>
  );
}
