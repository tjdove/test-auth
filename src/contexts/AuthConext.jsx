import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  verifyBeforeUpdateEmail,
  updatePassword,
} from "firebase/auth";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return auth.signOut(); //Promise, so make sure to return.
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function updateUserEmail(email) {
    return verifyBeforeUpdateEmail(auth.currentUser, email); //Not working right...
  }
  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); //We have a user by now we are done loading
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
