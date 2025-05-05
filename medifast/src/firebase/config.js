// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjy2kP4ZeHiWSUw413eSBvysrHdCWDaVY",
  authDomain: "medifast-inge2.firebaseapp.com",
  projectId: "medifast-inge2",
  storageBucket: "medifast-inge2.firebasestorage.app",
  messagingSenderId: "524054271003",
  appId: "1:524054271003:web:899896373c9019c0cf94be",
  measurementId: "G-WRJZCQ7RXC"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );