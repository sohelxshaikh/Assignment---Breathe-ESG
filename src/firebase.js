// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcBCbtLHhlhJ02vEmVDJbvqBQB2Vd4Taw",
  authDomain: "assignment---breathe-esg.firebaseapp.com",
  projectId: "assignment---breathe-esg",
  storageBucket: "assignment---breathe-esg.appspot.com",
  messagingSenderId: "991297279345",
  appId: "1:991297279345:web:905d372b4e80dc10a252d0",
  measurementId: "G-KXKXH4W6RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth =  getAuth() ;
;
export default app;