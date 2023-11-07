import Interaction from '../interaction';
import Suarte from '../suarte';

import './AlertFrame.css';

export default function AlertFrame({ value, className = "" }) {

  return (
    <>
      <div className={className}>
        <div className='notification__content'>
          {value?.sbj_image?.length &&
            <img src={value.sbj_image} className='avaimg subject' />
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
