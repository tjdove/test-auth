import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthConext";
import RootLayout from "../RootLayout";

export const PrivateRoute = () => {
  const { currentUser } = useAuth(); // determine if authorized, from context or however you're doing it
  //console.log("TEST:" + JSON.stringify(currentUser));

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return currentUser ? (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ) : (
    <Navigate to="/login" />
  );
};
