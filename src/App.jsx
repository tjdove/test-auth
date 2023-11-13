// import { useState } from "react";
import Signup from "./components/Signup.jsx";
import { AuthProvider } from "./contexts/AuthConext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";
import { PrivateRoute } from "./components/routing/PrivateRoute.jsx";
import Lookup from "./components/Lookup.jsx";
import AutoLookup from "./components/AutoLookup.jsx";
//import CustomerContextProvider from "./contexts/CustomerConext";

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
            {/* <CustomerContextProvider> */}
            <Route exact path="/" Component={PrivateRoute}>
              <Route path="/" Component={Dashboard} />
              <Route path="/update-profile" Component={UpdateProfile} />
              <Route path="/lookup-customer" Component={AutoLookup} />
            </Route>
            {/* </CustomerContextProvider> */}
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
