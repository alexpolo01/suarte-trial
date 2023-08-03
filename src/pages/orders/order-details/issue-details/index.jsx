import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import OrderCard from '@/shared-components/cards/components/OrderCard';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import PictureViewer from '@/shared-components/popups/components/PictureViewer';

import './index.css';

export default function IssueDetails({ close, orderData, setOrderData }) {
  const { state, cacheHandler, stateHandler } = useStateHandler();
  const [openEvidenceZoom, setOpenEvidenceZoom] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  async function resolveIssue() {
    setFormLoading(true);

    const { response } = await UserService.resolveIssue(orderData._id);

    if(response.ok) {
      cacheHandler.triggerAction("ISSUE_RESOLVED");
      stateHandler.set("temporalPopup", { text: "The issue was resolved successfully", type: "no-navigation" });
      setOrderData({
        ...orderData,
        order_issue: null
      });
      close();
    }
  }

  // function involveSuarte() {
  //   // THIS WILL ONLY MODIFY this fetchData turning the attribute suarte_involved with the data of the involvement. No closing and no
  // }

  return (
    <>
      <div className="order-issue-details__container">
        <header className="order-issue-details__header">
          <BackArrowIcon className="order-issue-details__go-back" onClick={close}/>

          <span className="order-issue-details__header-text mt-l">
            Issue details
          </span>           
        </header>

        <OrderCard orderData={orderData}/>

        <span className="order-issue-details__heading mt-m" style={{ marginTop: "15px" }}>
          Did you receive the artwork?
        </span>

        <p className="order-issue-details__text mt-s">
          {
            orderData.order_issue.issue_artwork_received ?
              "Yes"
              :
              "No"
          }
        </p>

        <span className="order-issue-details__heading mt-m">
          Message of the issue
        </span>

        <p className="order-issue-details__text mt-s">
          {orderData.order_issue.issue_message}
        </p>

        {Boolean(orderData.order_issue.issue_evidence) && (
          <>
            <span className="order-issue-details__heading mt-m">
              Evidence
            </span>

            <div className="order-issue-details__evidence-container">
              <ArtworkImage
                image={orderData.order_issue.issue_evidence.image_id}
                imageClassName="order-issue-details__evidence"
                imageTemplateClassName="order-issue-details__evidence"
              />

              <span className="order-issue-details__open-evidence element-non-selectable mt-m" onClick={()=>setOpenEvidenceZoom(orderData.order_issue.issue_evidence.image_id)}>
                See picture
              </span>
            </div>

            <PictureViewer picture={openEvidenceZoom} close={()=>setOpenEvidenceZoom(null)}/>
          </>
        )}

        {state.user_session._id === orderData.order_buyer._id && (
          <>
            <div className="order-issue-details__buttons">
              <ContinueButton 
                loading={formLoading}
                onClick={resolveIssue}
                className="order-issue-details__button mt-m"
              >
                Issue resolved
              </ContinueButton>

              {/* <ContinueButton className="order-issue-details__button mt-m">
                                Involve Suarte
                            </ContinueButton> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
