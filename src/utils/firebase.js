// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtdLi63xPwXI7_eULiECllDrnbBo-nVlM",
  authDomain: "netflix-gpt-efa84.firebaseapp.com",
  projectId: "netflix-gpt-efa84",
  storageBucket: "netflix-gpt-efa84.appspot.com",
  messagingSenderId: "93193136962",
  appId: "1:93193136962:web:6e95248c60f300d8e8b6db",
  measurementId: "G-8X0VV55Q2F"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);


export const auth = getAuth();