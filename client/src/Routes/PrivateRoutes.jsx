/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Store/AuthStore";

function PrivateRoutes({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
export default PrivateRoutes;
