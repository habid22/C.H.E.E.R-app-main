import React, { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider, db } from '../../Firebase/firebase'; // Adjust path if necessary
import { signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import './login.css'; // Ensure this path is correct
import { DASHBOARD, LOGIN, ROOT } from '../../router/Approuter';
import { doc, setDoc } from "firebase/firestore";
import { useLogout, useCurrentUserDetails } from '../../hooks/useAuth';
import { useToast } from '@chakra-ui/react'; // Import useToast for notifications
import { IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/cheer_connections .png';

const Login = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const currentUser = useCurrentUserDetails();
  const toast = useToast();

  //Navigate back to home if use pressed bacj button

    const homePageNAV = () => {
        navigate(ROOT);
    }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);

      if (additionalUserInfo?.isNewUser) {
        // Create a new user document in Firestore for new users
        const randomUsername = `user_${Math.random().toString(36).substring(2, 15)}`;
        const userDocRef = doc(db, 'Users', user.uid);

        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          username: randomUsername,
          currentShiftId: null,
          isPunchedIn: false,
          role: "Guest",
          isActive: true,
        }, { merge: true });
      }

      // Regardless of new or existing user, store user data in localStorage and navigate to dashboard
      // localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('token', user.accessToken);
      
      // Navigate to dashboard

      navigate(DASHBOARD);
    } catch (error) {
      console.error('Error logging in with Google', error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Company Logo" className="login-logo left-logo"/>
      <img src={logo} alt="Company Logo" className="login-logo right-logo"/>

      <div className="login-header">
            <IconButton
                colorScheme='none'
                aria-label='Home'
                icon={<FontAwesomeIcon className="fa-svg-icon home" icon={faHome} />}
                onClick={homePageNAV}
                size='lg'
            />
      </div>

      <h1 className="login-title">Join Us</h1>
      <p className="login-subtitle">Join the community!</p>
      <div className="login-social-buttons">
        <GoogleButton onClick={handleGoogleLogin} type="icon" />
      </div>


    </div>
  );
};

export default Login;
