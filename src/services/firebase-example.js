//IMPORTANT: remove -example from the name of the .js file and change the credentials in the firebaseConfig object

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
  apiKey: "<YOUR-FIREBASE-API-KEY>",
  authDomain: "<YOUR-FIREBASE-AUTH-DOMAIN>",
  projectId: "<YOUR-FIREBASE-projectId>",
  storageBucket: "<YOUR-FIREBASE-storageBucket>",
  messagingSenderId: "<YOUR-FIREBASE-messagingSenderId>",
  appId: "<YOUR-FIREBASE-appId>",
  measurementId: "<YOUR-FIREBASE-measurementId>",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
