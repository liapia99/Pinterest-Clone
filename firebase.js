import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkThIpjVe-J3TY-7yKzl1Od8yyd7Law4o",
  authDomain: "gatekeeper-2c820.firebaseapp.com",
  projectId: "gatekeeper-2c820",
  storageBucket: "gatekeeper-2c820.appspot.com",
  messagingSenderId: "921293385306",
  appId: "1:921293385306:web:0bd70ff4397efe96d2b263",
  measurementId: "G-T0WKJ72R9C"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
