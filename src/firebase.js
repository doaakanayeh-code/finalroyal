import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyABmgqvi0AUMamF8f0WAi86KQ-x-cGOzMs",
  authDomain: "royalmoment-9d8a2.firebaseapp.com",
  projectId: "royalmoment-9d8a2",
  storageBucket: "royalmoment-9d8a2.firebasestorage.app",
  messagingSenderId: "1021070415198",
  appId: "1:1021070415198:web:207349f51f537ef06bebcf",
  measurementId: "G-4ZDL37SRC0"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);