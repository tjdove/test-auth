import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthConext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
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
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed: Sign In");
    }
    setLoading(false);
  }
  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Log In
        </h2>
        {error && ( //Replace Alert from BS
          <div className="font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100">
            {error}
          </div>
        )}
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="drop-shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                ref={emailRef}
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Password:
              </label>
              <input
                className="drop-shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                ref={passwordRef}
                autoComplete="current-password"
                required
              />
            </div>
            {/* Button group */}
            <div className="flex items-center justify-between">
              <button
                disabled={loading}
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Sign In
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
        <div className="w-100 text-center">
          Need an account?
          <Link to="/signup"> Sign Up</Link>
        </div>
      </div>
      ;
    </>
  );
}
