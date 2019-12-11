import app from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAUUtCycdnMqry6e08N1LcsJiLCGABgXfU",
  authDomain: "donez-sange.firebaseapp.com",
  databaseURL: "https://donez-sange.firebaseio.com",
  projectId: "donez-sange",
  storageBucket: "donez-sange.appspot.com",
  messagingSenderId: "204952116003",
  appId: "1:204952116003:web:377547d668aa14ed910a96"
};

console.log(process.env);

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}
export default Firebase;
