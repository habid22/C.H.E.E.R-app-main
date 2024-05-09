// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
//   user: null,
//     setUser: () => {},
//   userName: null,
//   setUserName: () => {},
//   email: null,
//   setEmail: () => {},
//   token: null,
//   setToken: () => {},
//   picture: null,
//   setPicture: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [picture, setPicture] = useState(null);

  // Ideally, you would also manage the user state here and synchronize it with localStorage or other persistence mechanisms.
  // This example focuses on providing a structure without the persistence logic for brevity.

  return (
    <AuthContext.Provider value={{ user, setUser, userName, setUserName, email, setEmail, token, setToken, picture, setPicture }}>
      {children}
    </AuthContext.Provider>
  );
};
