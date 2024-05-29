
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiXBg7AMNZJo3dTduB8cZKiqojH8D-7rA",
  authDomain: "happyshop-515c0.firebaseapp.com",
  projectId: "happyshop-515c0",
  storageBucket: "happyshop-515c0.appspot.com",
  messagingSenderId: "821328712720",
  appId: "1:821328712720:web:6d4af5cc2202f339246695"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB, auth}