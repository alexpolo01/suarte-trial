const paymentsConfig = {
  payments: {
    nowpayments: {
      sandbox: (process.env.REACT_APP_NOWPAYMENTS_SANDBOX ?? "true") === "true",
      api_key: process.env.REACT_APP_NOWPAYMENTS_API_KEY || "",
    }
  }
};

paymentsConfig.payments.nowpayments.endpoint = paymentsConfig.payments.nowpayments.sandbox
  ? "https://api-sandbox.nowpayments.io/v1"
  : "https://api.nowpayments.io/v1";

export default paymentsConfig;
