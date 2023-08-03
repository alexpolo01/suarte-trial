import { useState } from 'react';

import OrderCard from '@/shared-components/cards/components/OrderCard';
import OrderShippingCard from '@/shared-components/cards/components/OrderShippingCard';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';

import ReportIssueForm from './report-issue-form';

import './index.css';

function ReportIssueContent({ orderData, onReportIssue }) {
  const [didReceiveArtwork, setDidReceiveArtwork] = useState("");

  return (
    <>
      <OrderCard orderData={orderData}/>

      <OrderShippingCard shippingData={orderData.order_shipping_address}/>

      <span className="report-issue__text mt-m">
                Did you receive the artwork?
      </span>

      <div className="report-issue__buttons">
        <span className={`report-issue__button element-non-selectable mt-m ${didReceiveArtwork === true ? "active" : ""}`} onClick={()=>setDidReceiveArtwork(true)}>
                    Yes
        </span>

        <span className={`report-issue__button element-non-selectable mt-m ${didReceiveArtwork === false ? "active" : ""}`} onClick={()=>setDidReceiveArtwork(false)}>
                    No
        </span>
      </div>

      <ReportIssueForm
        orderData={orderData}
        onReportIssue={onReportIssue}
        didReceiveArtwork={didReceiveArtwork}
      />
    </>
  );
}

export default function ReportIssue({ open, close, orderData, onReportIssue }) {
  return (
    <>
      <GenericPopup
        className="report-issue-popup"
        open={open}
        opacity
      >
        <div className="generic-popup-header report-issue-header">
          <span className="generic-popup-header-text mt-m">
                        Report an issue
          </span>

          <XIcon className="generic-popup-close" onClick={close}/>
        </div>

        <ReportIssueContent orderData={orderData} onReportIssue={(orderId, issueData)=>{onReportIssue(orderId, issueData); close();}}/>
      </GenericPopup>
    </>
  );
}
