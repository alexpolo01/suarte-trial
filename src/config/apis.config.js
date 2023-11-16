const apisConfig = {
  apis: {
    api:
      process.env.NODE_ENV === "production" && process.env.REACT_APP_HOST_ENV === "production"
        ? {
          protocol: "https",
          host: "api.suarte.art",
          port: "443",
        }
        : {
          protocol: "https",
          host: "dev.suarte.art",
          port: "443",
          // host: "localhost",
          // port: "3000"
        },
  },
};

apisConfig.apis.api.url = `${apisConfig.apis.api.protocol}://${apisConfig.apis.api.host}:${apisConfig.apis.api.port}`;

export default apisConfig;
