import Text from '@/shared-components/text/components/Text';

import './styles/OptionItem.css';

export default function OptionItem({ text, icon, onClick }) {
  return (
    <>
      <div className="artwork-options__artwork-option" onClick={onClick}>
        <Text className="artwork-options__artwork-option-text" small>
          {text}
        </Text>

        <div className="artwork-options__artwork-icon-container">
          {icon}
        </div>
      </div>
    </>
  );
}
