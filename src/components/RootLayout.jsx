// import Breadcrumbs from "../components/Breadcrumbs";
import { NavLink, Outlet } from "react-router-dom";
export default function RootLayout() {
  return (
    <>
      <nav className="bg-white border border-red-700 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <p className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Aqua-Minder
            </span>
          </p>

          <div
            className="w-full md:block md:w-auto border border-yellow-500"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="about">About</NavLink>
              </li>
              <li>
                <NavLink to="newuser">New User</NavLink>
              </li>

              <li>
                <NavLink
                  to="help"
                  // className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Help
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <Breadcrumbs /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
