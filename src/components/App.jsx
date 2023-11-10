// import { useState } from "react";
import Signup from "./Signup.jsx";
import { AuthProvider } from "../contexts/AuthConext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login.jsx";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { PrivateRoute } from "./routing/PrivateRoute";
import Lookup from "./Lookup.jsx";
import CustomerLookup from "./CustomerLookup.jsx";

function App() {
  return (
    // <div
    //   className="container mx-auto px-4 w-100"
    //   style={{ minHeight: "100vh" }}
    // >
    <div className="container  mx-auto  my-10 border border-blue-500">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" Component={PrivateRoute}>
              <Route path="/" Component={Dashboard} />
              <Route path="/update-profile" Component={UpdateProfile} />
              <Route path="/lookup-customer" Component={CustomerLookup} />
            </Route>
            <Route path="/signup" Component={Signup} />
            <Route path="/login" Component={Login} />
            <Route path="/forgot-password" Component={ForgotPassword} />
            <Route path="/lookup" Component={Lookup} />
            {/* <Route path="/contact" Component={Contact} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
    // </div>
  );
}

export default App;
