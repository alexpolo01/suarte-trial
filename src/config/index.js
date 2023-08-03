import apisConfig from './apis.config';
import appConfig from './app.config';
import errorCodesConfig from './errorCodes.config';
import faqsConfig from './faqs.config';
import firebaseConfig from './firebase.config';
import formsConfig from './forms.config';
import searchConfig from './search.config';
import stateConfig from './state.config';

const config = {
  ...apisConfig,
  ...appConfig,
  ...stateConfig,
  ...faqsConfig,
  ...errorCodesConfig,
  ...formsConfig,
  ...searchConfig,
  ...firebaseConfig
};

export default config;