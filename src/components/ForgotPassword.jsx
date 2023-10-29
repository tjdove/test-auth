import { useRef, useState } from "react";
import { Card, Form, Button, CardBody, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthConext";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      console.error(error);
      setError("Failed: Reset");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
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

            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
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
