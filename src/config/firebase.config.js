const firebaseConfig = {
  firebase:
    process.env.NODE_ENV === "production" && process.env.REACT_APP_HOST_ENV === "production"
      ? {
        apiKey: "AIzaSyDsBOgwkPAp9voyXz7tt6ra-c8P6902Fug",
        authDomain: "suarte.firebaseapp.com",
        projectId: "suarte",
        storageBucket: "suarte.appspot.com",
        messagingSenderId: "767194707735",
        appId: "1:767194707735:web:5d5402a0dbb927e1c72952",
        measurementId: "G-62PCYC8WNF"
      }
      : {
        apiKey: "AIzaSyAos3aIItpB80DqQgyWUP-oKd2Bph2HhsI",
        authDomain: "suarte-pruebas-6cc24.firebaseapp.com",
        projectId: "suarte-pruebas-6cc24",
        storageBucket: "suarte-pruebas-6cc24.appspot.com",
        messagingSenderId: "518594067204",
        appId: "1:518594067204:web:1e928aacdd68497c6eee51",
        measurementId: "G-NKF8W1KNL9",
      },
};

export default firebaseConfig;
