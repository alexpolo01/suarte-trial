import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

export default function LimitedEditionsNotAvailable({ close }) {
  return (
    <>
      <div className="limited-edition-popup-content__container remove-scrollbar">
        <div className="limited-edition-popup-content__header">
          <Text className="limited-edition-popup-content__header-text" medium>Limited Edition request unavailable</Text>
          <XIcon className="limited-edition-popup-content__close" onClick={close}/>
        </div>

        <div className="limited-edition-popup-error__content">
          <Text className="limited-edition-popup-error__text" paragraph justify small>
          It appears that your submission does not meet our criteria for producing and distributing Limited Editions (LEs) of the artwork. Please review the following requirements:
          </Text>

          {/* START OF POINTS */}
          <Text className="limited-edition-popup-error__text" paragraph justify small>
            <span/>Inventory status: Work of Artist.
          </Text>

          <Text className="limited-edition-popup-error__text" paragraph justify small>
            <span/>Dimensions: Both must be larger than 20 cm (7.87 in).
          </Text>

          <Text className="limited-edition-popup-error__text" paragraph justify small>
            <span/>Pricing: The original artwork must be priced at $1250 or above.
          </Text>

          <Text className="limited-edition-popup-error__text" paragraph justify small>
            <span/>Square and rectangular canvas sizes only. Circular, oval, or other custom-shaped canvases are not accepted.
          </Text>
          {/* END OF POINTS */}

          <Text className="limited-edition-popup-error__text" paragraph justify small>
          If your artwork doesn't meet these criteria, you can still create and sell prints independently, regardless of its presence on Suarte.
          </Text>
        </div>
      </div>
    </>
  );
}
