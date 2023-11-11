import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCh9KxxnMdqrQnOFioGFMlZwPcurOZHdGk",
  authDomain: "thd-api-v1.firebaseapp.com",
  projectId: "thd-api-v1",
  storageBucket: "thd-api-v1.appspot.com",
  messagingSenderId: "9335277237",
  appId: "1:9335277237:web:3a3bf4a579b80ff18f20fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };