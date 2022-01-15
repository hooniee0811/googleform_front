import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQ_sp4JFNsKE_mcY02zatEQBiLvhv6mcQ",
  authDomain: "form-610ef.firebaseapp.com",
  projectId: "form-610ef",
  storageBucket: "form-610ef.appspot.com",
  messagingSenderId: "310261696346",
  appId: "1:310261696346:web:5039ce637c260d8f0f1563"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };