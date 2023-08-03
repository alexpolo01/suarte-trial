import Text from '@/shared-components/text/components/Text';

import './styles/ArtlistOption.css';

export default function ArtlistOption({ text, icon, onClick }) {
  return (
    <>
      <div className="artlist-options__option" onClick={onClick}>
        <Text className="artlist-options__option-text" medium>
          {text}
        </Text>

        {icon}
      </div>
    </>
  );
}
