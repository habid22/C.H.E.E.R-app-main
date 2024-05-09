// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

//Dev note if u get a lot of firebase errors try running npm install firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARv6QaNy-57JiS5UoMdRr0jeXLd5fd-9U",
  authDomain: "se3350-group-18-415915.firebaseapp.com",
  projectId: "se3350-group-18-415915",
  storageBucket: "se3350-group-18-415915.appspot.com",
  messagingSenderId: "993271206912",
  appId: "1:993271206912:web:e34d63c45faddad106b4e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firestore service for the default app
const db = getFirestore(app);

// Get the Firebase Auth service for the default app
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.getCustomParameters({ prompt: 'select_account' });

export { auth, googleAuthProvider, db };

export default app;
