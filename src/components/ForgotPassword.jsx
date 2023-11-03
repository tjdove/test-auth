import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthConext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Password Reset
        </h2>
        {error && ( //Replace Alert from BS
          <div className="font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100">
            {error}
          </div>
        )}
        {message && ( //Replace Alert from BS
          <div className="font-regular relative block w-full rounded-lg bg-green-500 p-4 text-base leading-5 text-white opacity-100">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
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

          {/* Button group */}
          <div className="flex items-center justify-between">
            <button
              disabled={loading}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Reset Password
            </button>
            <button>
              <Link
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 
                dark:focus:ring-red-800"
                to="/login"
              >
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account?<Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
