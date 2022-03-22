// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfogaOsezaZZIhW9pOCz2yFY3rTACphZ4",
  authDomain: "firetest-23392.firebaseapp.com",
  projectId: "firetest-23392",
  storageBucket: "firetest-23392.appspot.com",
  messagingSenderId: "1027635746534",
  appId: "1:1027635746534:web:96fb67593df42f870ccd27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);