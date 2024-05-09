// src/contexts/CombinedProvider.js
import React from 'react';
import { TTSProvider } from './TTSContext';
import { AuthProvider } from './AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Import other providers

export const CombinedProvider = ({ children }) => {
  return (
    <TTSProvider>
      <AuthProvider> {/* Include AuthProvider here */}
      {/*<GoogleOAuthProvider clientId="288029051110-m7r9656p8i31vmfkslki7luqv4en3bqn.apps.googleusercontent.com">*/}
        {/*TODO: Add clientId from project*/}
        {children}
      {/*</GoogleOAuthProvider>*/}
      </AuthProvider>
    </TTSProvider>
  );
};
