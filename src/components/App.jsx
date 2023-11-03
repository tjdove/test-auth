// import { useState } from "react";
import Signup from "./Signup.jsx";
import { AuthProvider } from "../contexts/AuthConext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login.jsx";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { PrivateRoute } from "./routing/PrivateRoute";

function App() {
  return (
    // <div
    //   className="container mx-auto px-4 w-100"
    //   style={{ minHeight: "100vh" }}
    // >
    <div className="container  mx-auto max-w-sm my-10">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" Component={PrivateRoute}>
              <Route path="/" Component={Dashboard} />
              <Route path="/update-profile" Component={UpdateProfile} />
            </Route>
            <Route path="/signup" Component={Signup} />
            <Route path="/login" Component={Login} />
            <Route path="/forgot-password" Component={ForgotPassword} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
    // </div>
  );
}

export default App;
