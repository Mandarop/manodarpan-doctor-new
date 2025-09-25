// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC21PwKz1wPctEyyySe3WkBfpF7IkKBN3I",
  authDomain: "demoapp-39e4a.firebaseapp.com",
  projectId: "demoapp-39e4a",
  storageBucket: "demoapp-39e4a.firebasestorage.app",
  messagingSenderId: "875641615928",
  appId: "1:875641615928:web:8dba6dca858bfcb0ef18cd",
  measurementId: "G-JBE0ZQ736R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
