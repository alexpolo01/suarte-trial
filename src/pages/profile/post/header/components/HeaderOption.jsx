import Text from '@/shared-components/text/components/Text';

import './styles/HeaderOption.css';

export default function HeaderOption({ text, icon, onClick }) {
  return (
    <>
      <div className="post-header__option" onClick={onClick}>
        <Text className="post-header__option-text" medium>
          {text}
        </Text>

        {icon}
      </div>
    </>
  );
}
