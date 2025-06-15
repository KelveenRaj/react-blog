import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD81upQl7y22l-CyCDzMyu2hhmM3lir7pE",
  authDomain: "react-blog-39bd6.firebaseapp.com",
  projectId: "react-blog-39bd6",
  storageBucket: "react-blog-39bd6.firebasestorage.app",
  messagingSenderId: "984259098806",
  appId: "1:984259098806:web:17a2c6ebd625c9c5774e17",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
