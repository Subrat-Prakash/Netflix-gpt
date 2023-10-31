// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADq0XwQKfOu6nqXscQTCDe6zHgjvF8HgQ",
  authDomain: "netflixgpt-63c36.firebaseapp.com",
  projectId: "netflixgpt-63c36",
  storageBucket: "netflixgpt-63c36.appspot.com",
  messagingSenderId: "17978908982",
  appId: "1:17978908982:web:a7311ecc2a0f1651dfd397",
  measurementId: "G-6XXW0PFCY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();