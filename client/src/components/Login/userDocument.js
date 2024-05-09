// src/components/Login/userDocument.js
import { db } from '../../Firebase/firebase.js';
import { doc, setDoc } from "firebase/firestore"; 

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);

  await setDoc(userRef, {
    displayName: userAuth.displayName,
    email: userAuth.email,
    ...additionalData
  }, { merge: true });

  return userRef;
};

