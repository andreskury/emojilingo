// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4zn3ghDP-Xl0oQ5Icytg6KidPxzEwzJQ",
  authDomain: "emojilingo.firebaseapp.com",
  projectId: "emojilingo",
  storageBucket: "emojilingo.appspot.com",
  messagingSenderId: "502560826234",
  appId: "1:502560826234:web:03dbdeb1f3bb40cf882cc3",
  measurementId: "G-0M6SKW1P3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);