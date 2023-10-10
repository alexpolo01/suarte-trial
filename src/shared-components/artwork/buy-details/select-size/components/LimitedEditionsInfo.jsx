// import { useState } from "react";

import "./styles/LimitedEditionsInfo.css";
// import QuestionsIcon from "@/shared-components/icons/components/public/QuestionsIcon";

export default function LimitedEditionsInfo() {
  // const [openLimitedEditionsInfo, setOpenLimitedEditionsInfo] = useState(false);
  const openLimitedEditionsInfo = true;

  return (
    <>
      <div
        className="purchase-limited-editions-info__container element-non-selectable"
        // onClick={() => setOpenLimitedEditionsInfo(!openLimitedEditionsInfo)}
      >
        <span
          className="purchase-limited-editions-info__heading mt-l"
          style={{ marginBottom: "0px" }}
        >
          Limited Edition Details
        </span>

        {/* <QuestionsIcon
          className={`purchase-limited-editions-info__icon ${
            openLimitedEditionsInfo ? "active" : ""
          }`}
        /> */}
      </div>

      <div
        className={`purchase-limited-editions-info__accordeon ${
          openLimitedEditionsInfo ? "active" : ""
        }`}
      >
        {/* <span className="purchase-limited-editions-info__heading mt-m">
                    Details
        </span> */}

        <ul className="purchase-limited-editions-info__ul">
          <li className="purchase-limited-edition-info__li mt-s">
            ● Production and distribution are <span>exclusive</span> to Suarte
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
            ● <span>Museum quality:</span> cotton canvas and vibrant inks
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
            ● Suarte’s certificate of authenticity is <span>included</span>{" "}
            included
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
            ● Directly <span>supports</span> the Artist and the Gallery
          </li>

          <li className="purchase-limited-edition-info__li mt-s">
            ● <span>Eco-friendly</span> packaging
          </li>
        </ul>
      </div>
    </>
  );
}
