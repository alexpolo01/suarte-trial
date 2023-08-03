import { useState } from 'react';

import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import FormError from '@/shared-components/error/components/FormError';

import IssueEvidence from './components/IssueEvidence';

import './index.css';

export default function ReportIssueForm({ orderData, onReportIssue, didReceiveArtwork }) {
  const [formState, setFormState] = useState({
    issue_message: "",
    issue_evidence: null
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  async function submitReportIssue(e) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    if(Boolean(formState.issue_evidence) && formState.issue_evidence.loading) {
      alert("Please wait until the image is loaded or delete it.");
      setFormLoading(false);
    } else {
      const { response, data } = await UserService.reportIssue(orderData._id, { ...formState, issue_artwork_received: didReceiveArtwork });
        
      if(response.ok) {
        setFormLoading(false);
        onReportIssue(orderData._id, data);
      } else if(response.status === 400) {
        setFormLoading(false);
        setFormError({ element: data.error_data.element, error_code: data.error_type });
      }
    }
  }

  return (
    <>
      <div className={`report-issue-form__container ${didReceiveArtwork === true ? "received" : didReceiveArtwork === false ? "no-receive" : ""}`}>
        <span className="report-issue-form__main-text mt-m">
          {
            didReceiveArtwork ?
              "Let the gallery know what happened"
              :
              "If you have not received the artwork"
          }
        </span>

        <span className="report-issue-form__text mt-s">
          {
            didReceiveArtwork ?
              "Please share the details of the problem below, and the gallery will try to find the best solution. If necessary, Suarte can be involved at a later stage."
              :
              "Please review your order's shipping status using the tracking number. If done, describe the issue below:"
          }
        </span>

        <form onSubmit={submitReportIssue} className="report-issue-form__form">
          <div className="report-issue-form__textarea-container">
            <textarea 
              id="issue_message"
              className="report-issue-form__textarea mt-m"
              placeholder="Write something..."
              disabled={formLoading}
              spellCheck={false}
              value={formState.issue_message}
              onChange={e=>setFormState({ ...formState, issue_message: e.target.value })}
            />

            <FormError error={formError} element="issue_message"/>
          </div>

          {didReceiveArtwork === true && (
            <>
              <span className="report-issue-form__main-text mt-m">
                                Add aditional evidence
              </span>

              <span className="report-issue-form__text mt-s">
                                You can submit an image that clearly demonstrates the issues previously mentioned.
              </span>

              <IssueEvidence 
                formState={formState} 
                setFormState={setFormState}
                setFormError={setFormError}
              />

              <FormError error={formError} element="issue_evidence"/>
            </>
          )}

          <ContinueButton
            loading={formLoading}
            turnOff={!formState.issue_message}
            className="report-issue-form__submit-button mt-m"
          >
                        Submit
          </ContinueButton>
        </form>
      </div>
    </>
  );
}
