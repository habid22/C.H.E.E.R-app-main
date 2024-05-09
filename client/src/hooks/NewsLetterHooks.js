import { useState } from 'react';
import { db } from '../Firebase/firebase'; // Adjust this import as per your file structure
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const useDeleteEmailFromDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEmail = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const q = query(collection(db, "subscribers"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error("No matching email found.");
      }
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, "subscribers", docSnapshot.id));
      });
      console.log('Email deleted from Firestore');
    } catch (error) {
      console.error('Error deleting email from Firestore:', error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { deleteEmail, isLoading, error };
};

export default useDeleteEmailFromDatabase;
