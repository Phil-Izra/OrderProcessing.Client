import { Navigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
export default function ProtectedRoute({ children }) {
  const { token } = useAuthContext();
  return token ? children : <Navigate to="/login" replace />;
}
