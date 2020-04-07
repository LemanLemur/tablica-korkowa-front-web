import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4B1ctTC2BehfdWDsNuispoBaw-PbHPVw",
    authDomain: "tablica-korkowa.firebaseapp.com",
    databaseURL: "https://tablica-korkowa.firebaseio.com",
    projectId: "tablica-korkowa",
    storageBucket: "tablica-korkowa.appspot.com",
    messagingSenderId: "541318123535",
    appId: "1:541318123535:web:66ad250ad91cf73a83d37a",
    measurementId: "G-RHXJTC2QG8"
  };
  
  class Firebase{
      constructor(){
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
      }

      login(email, password){
          return this.auth.signInWithEmailAndPassword(email, password)
      }

      logout(){
          return this.auth.signOut();
      }

      async register(email, password){
          await this.auth.createUserWithEmailAndPassword(email, password)
          return this.auth.currentUser;
      }
  }

  export default new Firebase();