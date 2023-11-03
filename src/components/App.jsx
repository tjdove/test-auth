// import { useState } from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup.jsx";
import { AuthProvider } from "../contexts/AuthConext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login.jsx";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { PrivateRoute } from "./routing/PrivateRoute";
console.log("App:file loaded");

function App() {
  // const [count, setCount] = useState(0);
  console.log("App:constructor");

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
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
    </Container>
  );
}

export default App;
