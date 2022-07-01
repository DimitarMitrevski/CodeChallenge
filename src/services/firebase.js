// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjH0RTp3eEULBDzcEMF1RQLZ8_7hjUoLw",
  authDomain: "code-challenge-fdaee.firebaseapp.com",
  projectId: "code-challenge-fdaee",
  storageBucket: "code-challenge-fdaee.appspot.com",
  messagingSenderId: "308669160694",
  appId: "1:308669160694:web:bfff5cee69d858f18f60d7",
  measurementId: "G-3T7MRL5DEY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
