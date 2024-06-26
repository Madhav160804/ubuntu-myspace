
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKbZMBVLlb1uG18IC2iTFS6EecChHhWBA",
  authDomain: "ubuntu-myspace.firebaseapp.com",
  projectId: "ubuntu-myspace",
  storageBucket: "ubuntu-myspace.appspot.com",
  messagingSenderId: "574367019290",
  appId: "1:574367019290:web:3f8707f034f9773ff37ca3",
  measurementId: "G-XE539NBDXH",
  storageBucket: 'gs://ubuntu-myspace.appspot.com'
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth();


