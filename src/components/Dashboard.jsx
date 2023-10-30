import { useState } from "react";
import { useAuth } from "../contexts/AuthConext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Profile
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {error && (
            <div className="font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100">
              {error}
            </div>
          )}
          <strong>Email:</strong>
          {currentUser.email}
        </p>

        <Link
          to="/update-profile"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Profile
        </Link>
      </div>
      <div className="w-100 text-center mt-2">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  );
}
