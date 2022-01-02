// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX5493zXK4Us1vlBIn6RmYX_pOrjouqIQ",
  authDomain: "react-webforum.firebaseapp.com",
  projectId: "react-webforum",
  storageBucket: "react-webforum.appspot.com",
  messagingSenderId: "1010014387191",
  appId: "1:1010014387191:web:12f1126411bb8421968cf2",
  measurementId: "G-M40M64B0E3",
  databaseURL: "https://react-webforum-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

enableIndexedDbPersistence(firestore).catch((err) => console.log(err));

export { auth, provider, firestore, app };
