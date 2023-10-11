import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';
import './index.css';
import AlertFrame from './components/alertframe';
import AlertTab from './components/alerttab';
import AlertHeader from './components/alertheader';

export default function Notifications() {
  return (
    <>
      <AppNavigationPage>
        <div className="notification__page">
          <AlertHeader />
          <AlertTab />
          <AlertFrame />
        </div>
      </AppNavigationPage>
    </>
  );
}
