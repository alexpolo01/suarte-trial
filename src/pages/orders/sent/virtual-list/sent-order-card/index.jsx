import { useState } from 'react';

import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import OrderCard from '@/shared-components/cards/components/OrderCard';
import AddReview from '@/shared-components/forms/add-review';

import ReportIssue from './report-issue';

import './index.css';

export default function SentOrderCard({ orderData, onConfirmReception, onReportIssue }) {
  const [openConfirmReception, setOpenConfirmReception] = useState(false);
  const [openReportIssueForm, setOpenReportIssueForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  async function onWriteReview() {
    setFormLoading(true);

    const { response } = await UserService.confirmReception(orderData.order_number);

    if(response.ok) {
      onConfirmReception(orderData._id);
    }
  }

  return (
    <>
      <OrderCard orderData={orderData} navigateToView>
        <div className="sent-order-card__buttons element-non-selectable">
          <ContinueButton loading={formLoading} className="sent-order-card__button mt-m" onClick={()=>setOpenConfirmReception(true)}>
                        Confirm reception
          </ContinueButton>

          {
            orderData.order_issue ?
              <span className="sent-order-card__button fill mt-m">
                                Issue reported
              </span>
              :
              <span className="sent-order-card__button mt-m" onClick={()=>setOpenReportIssueForm(true)}>
                                Report an issue
              </span>
          }
        </div>
      </OrderCard>

      <AddReview
        headerText="Confirm reception"
        artworkToReview={orderData.order_artwork}
        typeOfArtwork={orderData.order_limited_edition_data ? "limited_edition" : "original"}
        open={Boolean(openConfirmReception)}
        close={()=>setOpenConfirmReception(null)}
        onReview={onWriteReview}
      />

      <ReportIssue
        open={openReportIssueForm}
        close={()=>setOpenReportIssueForm(false)}
        orderData={orderData}
        onReportIssue={onReportIssue}
      />
    </>
  );
}
