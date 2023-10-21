import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIQinwKdy0WbJbu9352BEhgnumawVznvE",
  authDomain: "chatty-a7540.firebaseapp.com",
  projectId: "chatty-a7540",
  storageBucket: "chatty-a7540.appspot.com",
  messagingSenderId: "119292870171",
  appId: "1:119292870171:web:1ed02fe2d3a3e01c6702be"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
