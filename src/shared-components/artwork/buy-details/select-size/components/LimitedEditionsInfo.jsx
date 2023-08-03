import { useState } from 'react';

import QuestionsIcon from '@/shared-components/icons/components/public/QuestionsIcon';

import './styles/LimitedEditionsInfo.css';

export default function LimitedEditionsInfo() {
  const [openLimitedEditionsInfo, setOpenLimitedEditionsInfo] = useState(false);

  return (
    <>
      <div className="purchase-limited-editions-info__container element-non-selectable" onClick={()=>setOpenLimitedEditionsInfo(!openLimitedEditionsInfo)}>
        <span className="purchase-limited-editions-info__heading mt-l" style={{ marginBottom: "0px" }}>
                    Suarte Limited Editions
        </span>

        <QuestionsIcon className={`purchase-limited-editions-info__icon ${openLimitedEditionsInfo ? "active" : ""}`}/>
      </div>

      <div className={`purchase-limited-editions-info__accordeon ${openLimitedEditionsInfo ? "active" : ""}`}>
        <span className="purchase-limited-editions-info__heading mt-m">
                    Details
        </span>

        <ul className="purchase-limited-editions-info__ul">
          <li className="purchase-limited-edition-info__li mt-s">
                        Production and distribution{" "}
            <span>
                            exclusive
            </span> 
            {" "}to Suarte
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
            <span>
                            Museum quality:
            </span>
            {" "}cotton canvas and vibrant inks
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
                        Numbered{" "}
            <span>
                            certificate of authenticity
            </span>
            {" "}included
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
                        Directly{" "}
            <span>
                            supports
            </span> 
            {" "}the Artist and the Gallery
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
            <span>
                            Eco-friendly
            </span> 
            {" "}packaging
          </li>
        </ul>
      </div>
    </>
  );
}
