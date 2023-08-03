import Text from '@/shared-components/text/components/Text';

import './styles/ChangesRequiredDisplayer.css';

export default function ChangesRequiredDisplayer({ changesRequired }) {
  return (
    <>
      <div className="changes-required-displayer__container">
        <Text className="changes-required-displayer__text" paragraph justify small>
                    Attention: The following changes are required for your artwork request. Suarte has reviewed the request and provided the following feedback:
        </Text>

        <Text className="changes-required-displayer__changes" paragraph small>
          {changesRequired}
        </Text>
      </div>
    </>
  );
}
