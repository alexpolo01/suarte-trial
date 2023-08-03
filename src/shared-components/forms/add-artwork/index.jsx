import { useRef,useState } from 'react';

import useGoBack from '@/hooks/useGoBack';
import useStateHandler from '@/hooks/useStateHandler';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import ArtworkConfirmationDialog from './components/ArtworkConfirmationDialog';
import ChangesRequiredDisplayer from './components/ChangesRequiredDisplayer';
import SaveDraft from './components/SaveDraft';
import StepAccordeon from './components/StepAccordeon';
import About from './about';
import Media from './media';
import Shipping from './shipping';

import './index.css';

/**
 * @note The form is a completely a controlled form (each input value is given programatically with the value prop) except for media section. For media section, we only use the formState values to init the component,
 * and will have their own local state to handle the data. This is done this way because there are certain operations that dont require for the formState to change (such as loading images). So, this way,
 * we have the onChange prop to notify the formState when something that needs to be stored happens.
 */
export default function AddArtworkForm({ artworkData=null, previewMode=false, editMode=false }) {
  const { state } = useStateHandler();
  const [goBackConfirmation, setGoBackConfirmation] = useState(false);
  const [formState, setFormState] = useState(Utils.initArtworkFormState(artworkData, editMode, state));
  const [error, setError] = useState(null);
  const initialState = useRef(formState);
  const goBackHandler = useGoBack("/");

  return (
    <>
      <div className="add-artwork-form__container">
        <div className="add-artwork-form__wrap">
          <div className="add-artwork-form__header">
            <BackArrowIcon className="add-artwork-form__back-button" onClick={() => {
              if(initialState.current !== formState) {
                setGoBackConfirmation(true); /** If the memory address changed, the user did something */
              } else {
                goBackHandler();
              }
            }}/>

            <Text className="add-artwork-form__header-text" large>
              {
                previewMode ? 
                  "Artwork request" 
                  : editMode ? 
                    "Edit artwork" 
                    : 
                    "Add an artwork"
              }
            </Text>

            {(!previewMode && !editMode) && (
              <SaveDraft 
                formState={formState} 
                setFormState={setFormState} 
                initialState={initialState}
              />
            )}
          </div>

          {Boolean(artworkData?.draft_changes) && <ChangesRequiredDisplayer changesRequired={artworkData.draft_changes}/>}

          <Text className="add-artwork-form__text" paragraph small>
                        At this time, Suarte is currently accepting paintings, with sculptures coming next.
          </Text>

          <form className="add-artwork-form__form" id="add-artwork-form">
            <StepAccordeon 
              lastCompletedStep={formState.lastCompletedStep} 
              previewMode={previewMode} 
              editMode={editMode} 
              step={1} 
              header="About" 
              activeClassName="add-artwork-about-accordeon__active" 
              formError={error} 
              elements={["artwork_artist","artwork_title","artwork_description","artwork_medium","artwork_year","artwork_size","artwork_height","artwork_length","artwork_theme","artwork_feeling","artwork_color","artwork_currency","artwork_price"]}
            >
              <About 
                formState={formState} 
                setFormState={setFormState} 
                editMode={editMode} 
                previewMode={previewMode} 
                formError={error} 
                setFormError={setError}
              />
            </StepAccordeon>

            <StepAccordeon 
              lastCompletedStep={formState.lastCompletedStep} 
              previewMode={previewMode} 
              editMode={editMode} 
              step={2} 
              header="Media" 
              activeClassName="add-artwork-media-accordeon__active" 
              formError={error} 
              elements={["artwork_main_picture"]}
            >
              <Media 
                formState={formState} 
                setFormState={setFormState} 
                editMode={editMode} 
                previewMode={previewMode} 
                formError={error} 
                setFormError={setError}
              />
            </StepAccordeon>

            <StepAccordeon 
              lastCompletedStep={formState.lastCompletedStep} 
              previewMode={previewMode} 
              editMode={editMode} 
              step={3} 
              header="Shipping" 
              activeClassName="add-artwork-shipping-accordeon__active" 
              formError={error}
            >
              <Shipping 
                formState={formState} 
                setFormState={setFormState} 
                editMode={editMode} 
                previewMode={previewMode} 
                formError={error} 
                setFormError={setError} 
              />
            </StepAccordeon>
          </form>
        </div>
      </div>

      <ArtworkConfirmationDialog 
        open={goBackConfirmation} 
        close={()=>setGoBackConfirmation(false)} 
        onConfirm={goBackHandler} 
        confirmText="Yes, exit"
      >
        <Text className="add-artwork-form__confirmation-text" paragraph small>
                    Are you sure you want to exit?
        </Text>

        <Text className="add-artwork-form__confirmation-text" paragraph small>
                    Changes will not be saved.
        </Text>
      </ArtworkConfirmationDialog>
    </>
  );
}
