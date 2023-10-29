import { useRef, useState } from "react";
import { Card, Form, Button, CardBody, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthConext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    //Are we changing the Email?
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    //Changing password?
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed: Update Account");
      })
      .finally(() => {
        setLoading(false);
      });

    try {
      setError("");
      setLoading(true);
      updateUserPassword();
      //updateUserPassword

      //await signup(emailRef.current.value, passwordRef.current.value);
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
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                autoComplete="username"
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="new-password"
                placeholder="Leave Blank to keep the same password"
              />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirm:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                autoComplete="new-password"
                placeholder="Leave Blank to keep the same password"
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Update:
            </Button>
          </Form>
        </CardBody>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
      ;
    </>
  );
}
