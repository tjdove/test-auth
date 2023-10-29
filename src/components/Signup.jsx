import { useRef, useState } from "react";
import { Card, Form, Button, CardBody, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthConext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed: Create account");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="new-password"
                required
              />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirm:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                autoComplete="new-password"
                required
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Sign Up:
            </Button>
          </Form>
        </CardBody>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      ;
    </>
  );
}
