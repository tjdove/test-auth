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
  // verifyBeforeUpdateEmail,
  updatePassword,
} from "firebase/auth";

console.log("AuthContext:file loaded");
//INitialize the firebase app.
const app = initializeApp(firebaseConfig);
console.log("Firebase config:");
//Use it to build the Auth.
//Returns the Auth instance associated with the provided @firebase/app#FirebaseApp.
const auth = getAuth(app);

//Creat the new context for Auth
const AuthContext = React.createContext();
console.log("React Context created");

export function useAuth() {
  console.log("AuthContext:useAuth");
  //Set the AC we just made.
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  console.log("AuthProvider:constructor");

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        console.log(auth.user);
        sendEmailVerification(auth.user);
      }
    );
  }
  function sendSignupEmail() {
    return sendEmailVerification(currentUser);
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
    console.log("AuthProvider:updateUserEmail:" + email);
    return updateEmail(currentUser, email); //Not working right...
  }
  function updateUserPassword(password) {
    // console.log("AuthProvider:updateUserPassword");
    // return updatePassword(auth, password);
  }
  useEffect(() => {
    console.log("AuthProvider:useEffect");
    //Adds an observer for changes to the user's sign-in state.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //alert("onAuthStateChanged");
      //Either set the user or set null
      setCurrentUser(user);
      //alert("onAuthStateChanged:useEffect: " + JSON.stringify(user));
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
