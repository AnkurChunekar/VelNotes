import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export function RequiresAuth({ children }) {
  const { authState } = useAuth();
  const token = authState.token || localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
