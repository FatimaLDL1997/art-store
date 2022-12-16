import React from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context/context";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, loginAsGuest } =
    React.useContext(StoreContext);
  const isUser = isAuthenticated && user;
  if (loginAsGuest) {
    console.log(loginAsGuest);
  } else {
    // <Link to='/' refresh='true' />;
    return children;
  }

  if (!isUser) {
    return <Navigate to='/login' />;
  }
  return children;
};
export default PrivateRoute;
