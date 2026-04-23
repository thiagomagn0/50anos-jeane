import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1cTpruPkgmVmP-ExGGrAnuLj7qIWFLvI",
  authDomain: "anos-d136e.firebaseapp.com",
  projectId: "anos-d136e",
  storageBucket: "anos-d136e.firebasestorage.app",
  messagingSenderId: "665324155759",
  appId: "1:665324155759:web:fac55e56f796ca06666e9a",
  measurementId: "G-9531FG71PN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);