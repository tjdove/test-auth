import { useRef, useState } from "react";
import { Card, Form, Button, CardBody, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthConext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed: Sign In");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                autoComplete="username"
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Log in
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot passwords?</Link>
          </div>
        </CardBody>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?<Link to="/signup">Sign Up</Link>
      </div>
      ;
    </>
  );
}
