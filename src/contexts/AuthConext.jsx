import React, { useContext, useEffect, useState } from "react";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from "firebase/auth";

//Initialize the firebase app.
const app = initializeApp(firebaseConfig);
//Use it to build the Auth.
//Returns the Auth instance associated with the provided @firebase/app#FirebaseApp.
const auth = getAuth(app);

//Creat the new context for Auth
const AuthContext = React.createContext();

export function useAuth() {
  //Set the AC we just made.
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
  }
  function sendSignupEmail() {
    return sendEmailVerification(auth.currentUser);
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
    return updateEmail(auth.currentUser, email); //Not working right...
  }
  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }
  useEffect(() => {
    //Adds an observer for changes to the user's sign-in state.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //Either set the user or set null
      setCurrentUser(user);
      setLoading(false); //We have a user by now we are done loading
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    sendSignupEmail,
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
