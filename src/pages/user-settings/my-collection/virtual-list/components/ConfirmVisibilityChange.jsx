import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/ConfirmVisibilityChange.css';

export default function ConfirmVisibilityChange({ artwork, close, changeArtworkVisibility }) {
  return (
    <>
      <GenericPopup
        open={Boolean(artwork)}
        className="collection-confirm-visibility"
        opacity
      >
        <div className="collection-confirm-visibility__header">
          <Text className="collection-confirm-visibility__header-text" medium>
                            Change visibility
          </Text>

          <XIcon className="collection-confirm-visibility__close" onClick={close}/>
        </div>

        <Text className="collection-confirm-visibility__text margin" paragraph justify small>
          {
            !artwork?.product_metadata.is_private ?
              'Are you sure you want to make this artwork private?'
              :
              'Are you sure you want to make this artwork public?'
          }
        </Text>

        <Text className="collection-confirm-visibility__text" paragraph justify small>
          {
            !artwork?.product_metadata.is_private ?
              !artwork?.product_metadata.is_limited_edition ?
                'By doing so, it will appear as "Private" on the "Original sold" details of the artwork and will not appear in your profile. Remember that you can change these preferences any time.'
                :
                'By doing so, the limited edition will not appear in your profile. Remember that you can change these preferences any time.'
              :
              !artwork?.product_metadata.is_limited_edition ?
                'By doing so, your username will appear on the "Original sold" details of the artwork and will appear in your profile. Remember that you can change these preferences any time.'
                :
                'By doing so, the limited edition will appear in your profile. Remember that you can change these preferences any time.'
          }
        </Text>

        <div className="collection-confirm-visibility__buttons">
          <Text className="collection-confirm-visibility__button cancel" onClick={close} medium>
                            Cancel
          </Text>

          {
            !artwork?.product_metadata.is_private ?
              <Text 
                className="collection-confirm-visibility__button confirm" 
                medium
                onClick={()=>{
                  changeArtworkVisibility(artwork, true);
                  close();
                }} 
              >
                                    Make it private
              </Text>
              :
              <Text 
                className="collection-confirm-visibility__button confirm" 
                medium
                onClick={()=>{
                  changeArtworkVisibility(artwork, false);
                  close();
                }} 
              >
                                    Make it public
              </Text>
          }
        </div>
      </GenericPopup>
    </>
  );
}
