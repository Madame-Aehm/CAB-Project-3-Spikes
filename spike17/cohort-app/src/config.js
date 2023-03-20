// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "test-6fc21.firebaseapp.com",
  projectId: "test-6fc21",
  storageBucket: "test-6fc21.appspot.com",
  messagingSenderId: "287792933998",
  appId: "1:287792933998:web:3049de53899a2422a24a7f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);