const firebaseConfig = {
  firebase: 
    process.env.NODE_ENV === 'production' ? 
      {
        apiKey: "AIzaSyDsBOgwkPAp9voyXz7tt6ra-c8P6902Fug",
        authDomain: "suarte.firebaseapp.com",
        projectId: "suarte",
        storageBucket: "suarte.appspot.com",
        messagingSenderId: "767194707735",
        appId: "1:767194707735:web:78ac9e18d0f4f839c72952",
        measurementId: "G-WND0DFNW2G"
      } 
      : 
      {
        apiKey: "AIzaSyDc_nhaIZ5grASKbNLsNmnRIO7fxpZEamo",
        authDomain: "suarte-pruebas.firebaseapp.com",
        projectId: "suarte-pruebas",
        storageBucket: "suarte-pruebas.appspot.com",
        messagingSenderId: "695116734938",
        appId: "1:695116734938:web:6aeb3eff8877b9a296a0e3",
        measurementId: "G-HN8D6QXX3P"
      }      
};

export default firebaseConfig;