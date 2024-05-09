// src/hooks/useAuth.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from '../Firebase/firebase'; // Ensure the Firebase app is imported

// Hook for authentication and user state
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const { setUserName, setEmail, setToken, setPicture } = useContext(AuthContext);

  const login = (userDetails) => {
    setUser(userDetails.scope);
    setUserName(userDetails.userName);
    setEmail(userDetails.email);
    setToken(userDetails.token);
    setPicture(userDetails.picture);
  };

  const logout = () => {
    setUser(null);
    setUserName(null);
    setEmail(null);
    setToken(null);
    setPicture(null);
  };

  return { user, login, logout };
};

// Hook for current user details
export const useCurrentUserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    uid: null,
    avatar: null,
    name: null,
    username: null,
    email: null,
    role: null,
    isPunchedIn: null,
    currentShiftId: null,
    isActive: null,
  });

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserDetails({
            uid: user.uid,
            avatar: userData.avatar,
            name: user.displayName,
            username: userData.username,
            email: user.email,
            role: userData.role,
            isPunchedIn: userData.isPunchedIn,
            currentShiftId: userData.currentShiftId,
            isActive: userData.isActive,
          });
        } else {
          console.error('User details not found in Firestore');
        }
      } else {
        setUserDetails({
          uid: null,
          avatar: null,
          name: null,
          username: null,
          email: null,
          role: null,
          isPunchedIn: null,
          currentShiftId: null,
          isActive: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return userDetails;
};

// Hook for fetching user details by ID
export const useFetchUserDetails = (userId) => {
  const [userDetails, setUserDetails] = useState({
    uid: null,
    avatar: null,
    name: null,
    username: null,
    email: null,
    role: null,
    isPunchedIn: null,
    currentShiftId: null,
    isActive: null,
  });

  useEffect(() => {
    const db = getFirestore(app);

    const fetchUserDetails = async () => {
      if (!userId) return;

      const userRef = doc(db, "Users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserDetails({
          uid: userId,
          name: data.name,
          avatar: data.avatar,
          username: data.username,
          email: data.email,
          role: data.role,
          isPunchedIn: data.isPunchedIn,
          currentShiftId: data.currentShiftId,
          isActive: data.isActive,
        });
      } else {
        console.log("No such user!");
      }
    };

    fetchUserDetails();
  }, [userId]);

  return userDetails;
};


export const useLogout = () => {
  const { setUserName, setEmail, setToken, setPicture } = useContext(AuthContext);

  const logout = async () => {
    const auth = getAuth(app);

    try {
      await signOut(auth); // Sign out from Firebase
      // Reset auth context state
      setUserName(null);
      setEmail(null);
      setToken(null);
      setPicture(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return logout;
};


// Helper function to simulate deletion from Firebase Authentication (replace with actual implementation)
export async function deleteAdminFromAuth(adminId) {
  const API_BASE_URL = 'https://my-api-service-qokrqcvrpa-uc.a.run.app';
  // The endpoint URL should point to your server-side route for deleting users
  const endpoint = `${API_BASE_URL}/api/user/deleteUser`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary headers for authentication/authorization if needed
      },
      body: JSON.stringify({ uid: adminId }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to delete user');
    }

    console.log("User successfully deleted from auth system:", responseData.message);
  } catch (error) {
    console.error("Error deleting admin from auth system:", error);
    throw error; // Propagate the error to be handled by the caller
  }
}