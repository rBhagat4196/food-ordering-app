/* eslint-disable no-undef */

// Import the functions you need from the SDKs you need
import { initializeApp , getApp , getApps } from "firebase/app";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHilNCtOXw4xKpBSict-csYg7SzafCe_k",
  authDomain: "foodordering-4c8ad.firebaseapp.com",
  projectId: "foodordering-4c8ad",
  storageBucket: "foodordering-4c8ad.appspot.com",
  messagingSenderId: "426323879550",
  appId: "1:426323879550:web:90193a7bb908eabd619a2f",
  measurementId: "G-Z05FX877GZ"
};
  
  

// Initialize Firebase
const app = getApps.length> 0 ?  getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app,storage}
