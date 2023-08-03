import PublicSuccessCheck from '@/shared-components/icons/components/public/PublicSuccessCheck';
import Text from '@/shared-components/text/components/Text';

import './styles/AuthSuccessText.css';

export default function AuthSuccessText({ className="", children }) {
  return (
    <>
      <div className={`auth-success-text__container ${className}`}>
        <Text className="auth-success-text__text" paragraph justify small>
          <PublicSuccessCheck className="auth-success-text__check"/>
          {children}
        </Text>
      </div>
    </>
  );
}
