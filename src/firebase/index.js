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

      googleLogin(){
        var provider = new app.auth.GoogleAuthProvider();
        return app.auth().signInWithPopup(provider);
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

      delete(){
          return this.auth.currentUser.delete();
      }

      resetPassEmail(emailAddress){
          return this.auth.sendPasswordResetEmail(emailAddress);
      }

      resetPass(newPassword){
          return this.auth().currentUser.updatePassword(newPassword);
      }

      resetEmail(newEmail){
          return this.auth().currentUser.updatePassword(newEmail);
      }
  }

  export default new Firebase();