import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



// Your web app's Firebase configuration
 export const firebaseConfig = {
  apiKey: "AIzaSyDf8g8i7c7ul26I4KQEYSNO1ICOnwXUTXM",
  authDomain: "fir-8ee0b.firebaseapp.com",
  projectId: "fir-8ee0b",
  storageBucket: "fir-8ee0b.appspot.com",
  messagingSenderId: "734009291973",
  appId: "1:734009291973:web:5f712c73fdad8009e9acac"
};
 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);

