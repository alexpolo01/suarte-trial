import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import UserService from '@/services/user.service';
import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import './styles/IssueEvidence.css';

export default function IssueEvidence({ formState, setFormState, setFormError }) {
  async function uploadEvidence(image) {
    const temporalImageId = uuidv4();

    setFormError(null);
    setFormState(prevValue => ({
      ...prevValue,
      issue_evidence: {
        loading: true,
        progress: 0, 
        temporalImageId
      }
    }));

    const { response, data } = await UserService.uploadImage(image, (progress) => {
      setFormState(prevValue => {
        if(Boolean(prevValue.issue_evidence) && prevValue.issue_evidence.temporalImageId === temporalImageId) { /** The image might've been deleted */
          return {
            ...prevValue,
            issue_evidence: {
              ...prevValue.issue_evidence,
              progress
            }
          };
        } else {
          return prevValue;
        }
      });
    });

    if(response.ok) {
      setFormState(prevValue => { 
        if(Boolean(prevValue.issue_evidence) && prevValue.issue_evidence.temporalImageId === temporalImageId) { /** The image might've been deleted */
          return {
            ...prevValue,
            issue_evidence: data
          };
        } else {
          return prevValue;
        }
      });
    } else {
      setFormState(null);
      alert("Something went wrong. If the problem persists, contact us at contact@suarte.art.");
    }
  }

  function handlePictureError(errors) {
    if(errors.maxNumber) setFormError({ element: "issue_evidence", error_code: "ONLY_ONE_FILE" });
    else if(errors.acceptType) setFormError({ element: "issue_evidence", error_code: "INVALID_FILE_FORMAT" });
    else if(errors.maxFileSize) setFormError({ element: "issue_evidence", error_code: "FILE_EXCEEDS_SIZE" });
  }

  if(!formState.issue_evidence) {
    return (
      <ImageUploading 
        maxNumber={1} 
        onChange={(imagesList) => uploadEvidence(imagesList[0].file)} 
        onError={handlePictureError} 
        maxFileSize={15000000}
      >
        {({ onImageUpload })=>(
          <span className="issue-evidence__add mt-l" onClick={onImageUpload} id="issue_evidence">
                        Add photo
          </span>
        )}
      </ImageUploading>
    );
  } else if(formState.issue_evidence.loading) {
    return (
      <div className="issue-evidence__loading-container">
        <CustomSpinner className="issue-evidence__spinner" thin/>

        <span className="issue-evidence__text mt-s">
                    Uploading image file... ({formState.issue_evidence.progress}%)
        </span>
      </div>
    );
  } else {
    return (
      <>
        <div className="issue-evidence__preview-container">
          <RemoveButton className="issue-evidence__remove" onClick={()=>setFormState({ ...formState, issue_evidence: null })}/>

          <img src={`${config.app.imageServiceDomain}/${formState.issue_evidence.image_id}/w=200`} alt="Issue evidence" className="issue-evidence__image"/>

          <span className="issue-evidence__file-name mt-s">
            {formState.issue_evidence.image_original_data.name}
          </span>
        </div>
      </>
    );
  }
}
