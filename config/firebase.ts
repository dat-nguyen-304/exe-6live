// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmSEtcFN_p6w7J8n9etpIAEnSnxjl1E38",
  authDomain: "live-6e891.firebaseapp.com",
  projectId: "live-6e891",
  storageBucket: "live-6e891.appspot.com",
  messagingSenderId: "930553909154",
  appId: "1:930553909154:web:1abe9d43f5524b715aecfb",
  measurementId: "G-E2VZPN3QM0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
