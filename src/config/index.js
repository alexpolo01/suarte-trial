import apisConfig from "./apis.config";
import appConfig from "./app.config";
import errorCodesConfig from "./errorCodes.config";
import faqsConfig from "./faqs.config";
import firebaseConfig from "./firebase.config";
import formsConfig from "./forms.config";
import paymentsConfig from "./payments.config";
import searchConfig from "./search.config";
import stateConfig from "./state.config";
import variablesConfig from "./variables.config";

const config = {
  ...apisConfig,
  ...appConfig,
  ...stateConfig,
  ...faqsConfig,
  ...errorCodesConfig,
  ...formsConfig,
  ...searchConfig,
  ...firebaseConfig,
  ...variablesConfig,
  ...paymentsConfig,
};

export default config;
