// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8LLkF_yjS9GSm6JjBc8go4Dq0a-JqyoE",
  authDomain: "spike-notes.firebaseapp.com",
  projectId: "spike-notes",
  storageBucket: "spike-notes.appspot.com",
  messagingSenderId: "268566057725",
  appId: "1:268566057725:web:05cc49eb1be125cfe0a494"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);