import config from '@/config';
import useCache from '@/hooks/useCache';
import SettingsLoadingPage from '@/shared-components/loaders/components/SettingsLoadingPage';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import BankAccountForm from './components/BankAccountForm';

import './index.css';

export default function BankAccount() {
  const { loading, fetchData, setFetchData } = useCache("bank_account_details", `${config.apis.api.url}/gallery/bank`, {
    injectToken: true
  });

  if(loading) {
    return (
      <SettingsLoadingPage page="Bank account"/>
    );
  } else {
    return (
      <>
        <SettingsHeading text="Bank account"/>
    
        <div className="settings-bank-account__container">
          <Text className="settings-bank-account__text" paragraph justify medium>
          Complete all bank account details accurately to receive Suarte's monthly payments and invoices.
          </Text>
    
          <BankAccountForm fetchData={fetchData} setFetchData={setFetchData}/>
        </div>
      </>
    );
  }
}