import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // ถ้ายังไม่ login → redirect ไปหน้า login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ถ้า login แล้ว → เข้าได้
  return children;
}

export default ProtectedRoute;