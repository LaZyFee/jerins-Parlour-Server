/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Store/AuthStore";

function AdminRoutes({ children }) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/error" state={{ from: location }} replace />;
}

export default AdminRoutes;
