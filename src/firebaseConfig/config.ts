// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTcBHD3I-dEOeddax_dOhShqurLU838M4",
  authDomain: "e-ruiri-portal.firebaseapp.com",
  projectId: "e-ruiri-portal",
  storageBucket: "e-ruiri-portal.appspot.com",
  messagingSenderId: "727306142930",
  appId: "1:727306142930:web:9bf6e33b7880567601d90b",
  measurementId: "G-VZXH7S7N0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
}