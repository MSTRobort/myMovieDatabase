import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBrbQOpe6v6fJNGigl7RPwUAN-oXVoLypM",
    authDomain: "mymoviedatabasep3.firebaseapp.com",
    projectId: "mymoviedatabasep3",
    storageBucket: "mymoviedatabasep3.appspot.com",
    messagingSenderId: "1008980476239",
    appId: "1:1008980476239:web:8e45ebe537c877be0cc53a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;