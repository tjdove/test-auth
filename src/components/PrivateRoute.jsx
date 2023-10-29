import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthConext";

//This is where the system checks for a curent User and redirects if one is not logged in.
export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        );
      }}
    ></Route>
  );
}
