import { useAuth } from "context";
import { Navigate, useLocation, Outlet } from "react-router-dom";

function RestrictAuth() {
  const { authState } = useAuth();
  const location = useLocation();
  return authState.isLoggedIn ? (
    <Navigate to="/notes" from={{ state: location }} replace />
  ) : (
    <Outlet />
  );
}

export { RestrictAuth };
