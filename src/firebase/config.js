//This config file connects this react app as the front end to the firebase backend service.

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';


// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyCkzTCHOz8UaW0ZmXlGGvlYj27gFHT4z8E",
    authDomain: "reactagram-4bf4b.firebaseapp.com",
    databaseURL: "https://reactagram-4bf4b.firebaseio.com",
    projectId: "reactagram-4bf4b",
    storageBucket: "reactagram-4bf4b.appspot.com",
    messagingSenderId: "63909292924",
    appId: "1:63909292924:web:e8743277b3a1c0102a92f9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export { projectStorage, projectFirestore, timestamp };
