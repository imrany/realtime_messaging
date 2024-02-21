// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPM98K05JL-X93UPHkcyvLG0RYCGeF9DQ",
  authDomain: "e-students-portal.firebaseapp.com",
  projectId: "e-students-portal",
  storageBucket: "e-students-portal.appspot.com",
  messagingSenderId: "858727043051",
  appId: "1:858727043051:web:7993745f94b791f2f993ae",
  measurementId: "G-BT6BQKGZ17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{
  auth,
  createUserWithEmailAndPassword,
}